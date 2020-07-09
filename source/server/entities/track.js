// INTERNAL
import {
	stableSort,
	asyncMap,
	any,
	rules,
} from '../../shared/utility/index.js';
import database, {pgp} from '../db.js';
import { 
	ErrorList, 
	Err,
} from '../../shared/legacy-classes/error.js';
import {
	Success,
	SuccessList,
} from '../../shared/legacy-classes/success.js';
import Source from '../../shared/source.js';
import {
	Track,
} from '../../shared/entities/index.js';
import propagate from '../../shared/propagate.js';
import parsePostgresError from '../parse-postgres-error.js';
import isEmpty from '../legacy/is-empty.js';
import {
	MultipleErrors,
} from '../../shared/errors/index.js';

Track.augmentClass({
	prototypeProperties(parent) {
		this.order = async function (db = database) {
			return await this.constructor.order(db, any(this));
		};
	},
	staticProperties(parent) {
		// CRUD
		this.addBefore = 
		this.getBefore = 
		this.editBefore = 
		this.removeBefore = async function (t, entities) {
			let newEntities = entities.slice();
			newEntities.forEach(entity => {
				//TODO Possible issue here where the condition following && could evaluate first. Not sure what the precedense is.
				entity.source = rules.object.test(entity.source) && rules.string.test(entity.source.name)
				? entity.source.name
				: undefined;
			});
			return newEntities;
		};
	
		this.addPrepare = async function (t, track) {
			//C set id of tracks to be added as a temporary symbol, so that Track.order() is able to identify tracks
			let newTrack = {...track, id: Symbol()};
			if (!rules.integer.test(newTrack.position)) {
				let existingTracks = await Track.get({playlistId: newTrack.playlistId}, t).then((result) => result.content);
				newTrack.position = existingTracks.length;
			}
			return newTrack;
		};
		this.removePrepare = async function (t, track) {
			//C set position of tracks to be removed as null, so that Track.order() recognizes them as tracks to remove
			return {...track, position: null};
		};
	
		this.queryOrder = 'ORDER BY "playlistId" ASC, "position" ASC';
	
		this.addAccommodate = 
		this.editAccommodate =
		this.removeAccommodate = async function (t, tracks) {
			//L pg-promise transactions https://github.com/vitaly-t/pg-promise#transactions
			//L deferrable constraints  https://www.postgresql.org/docs/9.1/static/sql-set-constraints.html
			//L https://stackoverflow.com/questions/2679854/postgresql-disabling-constraints
			await t.none(`SET CONSTRAINTS "sj"."tracks_playlistId_position_key" DEFERRED`).catch(rejected => {
				throw parsePostgresError(rejected, new Err({
					log: false,
					origin: 'Track.move()',
					message: 'could not order tracks, database error',
					target: 'notify',
					cssClass: 'notifyError',
				}));
			});
			return await this.order(t, tracks).then((result) => result.content).catch(propagate);
		};
	
		this.addAfter =
		this.getAfter =
		this.editAfter = 
		this.deleteAfter = async function (t, entities) {
			let newEntities = entities.slice();

			newEntities.forEach(entity => {
				entity.source = Source.instances.find(source => source.name === entity.source);
			});
			
			return newEntities;
		};

		// UTIL
		this.order = async function (db, tracks) {
			//C takes a list of input tracks for an INSERT, UPDATE, or DELETE query
			//! properties should be validated at this point
			//! tracks to be added must have a Symbol() id, this will be removed
			//! tracks to be deleted must have a null position, this will be removed
	
			//C modifies the input track's positions, if needed
			//C returns a list of influenced tracks with modified positions, if needed
	
			//C out-of-bounds positions will be repositioned at the start or end of the playlist
			//C duplicate positions will be repositioned in order of input order
			//C in the case of repositioned tracks that still overlap with other input tracks, all will be repositioned in order of input position
			
	
			//C filter out tracks
			let inputTracks = tracks.filter(track => 
				//C without an id (including symbol)
				(!isEmpty(track.id) || typeof track.id === 'symbol') 
				//C and without a position (including null) or playlistId
				&& (!isEmpty(track.position) || track.position === null || !isEmpty(track.playlistId))); 
			//C filter out duplicate tracks (by id, keeping last), by filtering for tracks where every track after does not have the same id
			inputTracks = inputTracks.filter((track, index, self) => self.slice(index+1).every(trackAfter => track.id !== trackAfter.id));
	
			//C return early if none are moving
			if (inputTracks.length === 0) {
				return new SuccessList({
					origin: 'Track.order()',
					message: 'track positions did not need to be set',
				});
			}
	
			//console.log('inputTracks.length:', inputTracks.length, '\n ---');
	
			return await db.tx(async t => {
				const playlists = [];
				const influencedTracks = [];
				const inputIndex = Symbol();
	
				//C retrieve track's playlist, group each track by playlist & moveType
				await asyncMap(inputTracks, async (track, index) => {
					const storePlaylist = function (playlistId, existingTracks) {
						if (!rules.integer.test(playlistId)) throw new Err({
							origin: 'Track.order()',
							reason: `playlistId is not an integer: ${playlistId}`,
						});
						if (!rules.array.test(existingTracks)) throw new Err({
							origin: 'Track.order()',
							reason: `existingTracks is not an array: ${existingTracks}`,
						});
	
						//C stores playlist in playlists if not already stored
						let existingPlaylist = playlists.find(playlist => playlist.id === playlistId);
						if (!existingPlaylist) {
							playlists.push({
								id: playlistId,
		
								original: existingTracks,
		
								//C move actions, these have priority positioning
								inputsToMove: [],
								inputsToAdd: [], 
								inputsToRemove: [],
							});
	
							existingPlaylist = playlists[playlists.length-1];
						}
						return existingPlaylist;
					};
	
					//C temporarily store inputIndex on track, this is required as the input order is lost when tracks are grouped by playlist
					track[inputIndex] = index;
	
					//C determine move action
					const action =
					typeof track.id === 'symbol' 	? 'Add' 	:
					track.position === null 		? 'Remove' 	: 'Move';
	
	
					//C get current playlist by playlistId if action === 'add', else by track.id using a sub-query
					//L sub-query = vs IN: https://stackoverflow.com/questions/13741582/differences-between-equal-sign-and-in-with-subquery
					const currentQuery = action === 'Add' 
					? pgp.as.format(`
						SELECT "id", "position", "playlistId"
						FROM "sj"."tracks" 
						WHERE "playlistId" = $1
					`, track.playlistId)
					: pgp.as.format(`
						SELECT "id", "position", "playlistId"
						FROM "sj"."tracks" 
						WHERE "playlistId" = (
							SELECT "playlistId"
							FROM "sj"."tracks"
							WHERE "id" = $1
						)
					`, track.id);
					const currentPlaylist = await t.any('$1:raw', currentQuery).catch(rejected => {
						throw parsePostgresError(rejected, new Err({
							log: false,
							origin: 'Track.order()',
							message: 'could not move tracks',
						}));
					});
	
	
					//C store
					const currentPlaylistStored = storePlaylist(action === 'Add' ? track.playlistId : currentPlaylist[0].playlistId, currentPlaylist); //! track.playlistId might not be currentPlaylistId
					//C strip playlistId from playlist, this is done so that only modified properties will remain on the track objects
					currentPlaylistStored.original.forEach(t => {
						delete t.playlistId;
					});
	
					
					if (!rules.integer.test(track.playlistId) || track.playlistId === currentPlaylistStored.id) { 
						//C if not switching playlists
						//C group by action
						currentPlaylistStored['inputsTo'+action].push(track);
					} else { 
						//C if switching playlists
						//C this should catch tracks with playlistIds but no position
						const anotherPlaylist = await t.any(`
							SELECT "id", "position", "playlistId"
							FROM "sj"."tracks" 
							WHERE "playlistId" = $1
						`, track.playlistId).catch(rejected => {
							throw parsePostgresError(rejected, new Err({
								log: false,
								origin: 'Track.order()',
								message: 'could not move tracks',
							}));
						});
	
						const anotherPlaylistStored = storePlaylist(track.playlistId, anotherPlaylist);
						anotherPlaylistStored.original.forEach(t => {
							delete t.playlistId;
						});
	
						//C track is removed from its current playlist, and added to another playlist
						currentPlaylistStored.inputsToRemove.push(track);
						anotherPlaylistStored.inputsToAdd.push(track);
					}
	
					return new Success({
						origin: 'Track.order()',
						message: "retrieved track's playlist",
					});
				}).catch((rejected) => {
					throw new MultipleErrors({
						userMessage: `could not retrieve some track's playlist`,
						errors: rejected,
					})
				});
	
				//console.log('playlists.length:', playlists.length, '\n ---');
	
				//C calculate new track positions required to accommodate input tracks' positions
				playlists.forEach(playlist => {
					//C populate others with tracks in original that are not in inputsTo Add, Remove, or Move
					//! inputsToRemove can be ignored from this point on, these tracks aren't included in others and wont be added to the final ordered list
					playlist.others = playlist.original.filter(originalTrack => 
						!playlist.inputsToAdd.some(addingTrack => addingTrack.id === originalTrack.id) &&
						!playlist.inputsToRemove.some(trackToRemove => trackToRemove.id === originalTrack.id) &&
						!playlist.inputsToMove.some(movingTrack => movingTrack.id === originalTrack.id)
					);
	
					//console.log('playlist.others.length:', playlist.others.length);
	
					//C combine both adding and moving, 
					playlist.inputsToPosition = [...playlist.inputsToAdd, ...playlist.inputsToMove];
					//C give tracks with no position an Infinite position so they get added to the bottom of the playlist
					playlist.inputsToPosition.forEach(trackToPosition => {
						if (!rules.number.test(trackToPosition.position)) {
							trackToPosition.position === Infinity;
						}
					});
	
	
					//C sort
					stableSort(playlist.others, (a, b) => a.position - b.position);
					//C stable sort by inputIndex then position to resolve clashes by position then inputIndex
					stableSort(playlist.inputsToPosition, (a, b) => a[inputIndex] - b[inputIndex]);
					stableSort(playlist.inputsToPosition, (a, b) => a.position - b.position);
	
					//console.log('playlist.inputsToAdd.length:', playlist.inputsToAdd.length);
					//console.log('playlist.inputsToRemove.length:', playlist.inputsToRemove.length);
					//console.log('playlist.inputsToMove.length:', playlist.inputsToMove.length, '\n ---');
					//console.log('playlist.inputsToPosition.length:', playlist.inputsToPosition.length, '\n ---');
					
	
					//C inputIndex is no longer needed, remove it from anything it was added to
					playlist.inputsToPosition.forEach(trackToPosition => {
						delete trackToPosition[inputIndex];
					});
					playlist.inputsToRemove.forEach(trackToRemove => {
						delete trackToRemove[inputIndex];
					});
	
	
					//C populate merged by filling others tracks around combined tracks
					playlist.merged = [];
					//! these are copies that will be emptied below
					playlist.inputsToPositionCopy = [...playlist.inputsToPosition];
					playlist.othersCopy = [...playlist.others];
					let i = 0;
					while (playlist.othersCopy.length > 0) {
						if (playlist.inputsToPositionCopy.length > 0 && playlist.inputsToPositionCopy[0].position <= i) {
							//C if the next adding or moving track's position is at (or before, in the case of a duplicated position) the current index, transfer it to the merged list
							//C this will properly handle negative and duplicate positions
							//G shift removes the first item of an array and returns that item
							playlist.merged.push(playlist.inputsToPositionCopy.shift());
						} else {
							//C else - transfer the next others track
							playlist.merged.push(playlist.othersCopy.shift());
						}
						i++;
					}
	
					//C push rest of combined tracks
					//R this method was chosen over including combined.length > 0 in the while condition to prevent needless loops caused by ridiculously high positions, this was also chosen over original.length because adding + moving tracks could be greater the playlist length
					//L .push() and spread: https://stackoverflow.com/questions/1374126/how-to-extend-an-existing-javascript-array-with-another-array-without-creating
					playlist.merged.push(...playlist.inputsToPositionCopy);
					playlist.inputsToPositionCopy.length = 0; //! remove combined tracks for consistent behavior
	
	
					//C populate playlist.influenced with all non-input tracks that have moved
					playlist.influenced = playlist.merged.filter((mergedTrack, index) => {
						let inOthers = playlist.others.find(otherTrack => otherTrack.id === mergedTrack.id);
						let influenced = inOthers && index !== inOthers.position;
	
						//C assign new positions (inputTracks too)
						mergedTrack.position = index;
						
						return influenced;
					});
	
					//console.log('playlist.merged.length:', playlist.merged.length);
					//console.log('playlist.merged:\n', playlist.merged, '\n ---');
	
					//console.log('playlist.influenced.length:', playlist.influenced.length);
					//console.log('playlist.influenced:\n', playlist.influenced, '\n ---');
	
					influencedTracks.push(...playlist.influenced);
				});
	
				//C remove temporary symbol id from add tracks and null position from delete tracks
				inputTracks.forEach(inputTrack => {
					if (typeof inputTrack.id === 'symbol') {
						delete inputTrack.id;
					}
					if (inputTrack.position === null) {
						delete inputTrack.position;
					}
				});
	
				return new SuccessList({
					origin: 'Track.order()',
					message: 'influenced tracks calculated',
					content: influencedTracks,
				});
			});
	
			/* Thought Process
	
				if any tracks have position set,
					do the move function
					order
				after deleting tracks
					order
		
				idea: get the tracklist, then do the moving and ordering outside, at the same time - then update all at once
				the fetched array won't have holes in it, just the position numbers (which is good?)
		
				//R initial idea wrong: 
				tracks must be in order of their positions for the move to be applied properly (ie tracks with positions: 3, 4, 5 will all be inserted inbetween tracks 2 and 3) - updating in the order 5, 4, 3 would result in later tracks pushing the already placed tracks down (so their positions end up being 7, 5, 3)
				it needs to go in decending order because of the nature of how the move function works - affecting only tracks below it
		
		
				//R wrong, because this done simultaneously (not in sequence) it will separate adjacent inserted positions (0i, 1i) will insert into a full list (o) as (0i, 0o, 1i, 1o), doing this in sequence would require reordering (updating of new positions) the tracks after each insert (might be resource intensive)
				get input
					stable sort by position
				get tracks
					stable sort by position
					prepend item with position -Infinity
					append item with position Infinity
		
				for each input (in reverse order, so that inputs with same positions do not get their order reversed)
					find where position is greater than i.position and less than or equal to i+1.position
					splice(i+1, 0, input)
				
		
				final idea: 
					get the existing list, remove tracks to be inserted
					sort each list
					for the length of the combined lists, for integers 0 to length
						if there is a track in the input list at (or less than) the index - push the next one
						else push the next track in the existing list
					if there are any remaining tracks in the input list (for example a big hole that makes the last few tracks larger than the sum of both lists), push them in order to the end of the list
					lastly do a order to remove duplicates and holes
		
					this essentially 'fills' the existing tracks around the set positions of the input tracks
	
	
					for Track.order()
						there is a recursive loop hazard in here (basically if Track.get() is the function that calls sj.Track.order() - sj.Track.order() itself needs to call sj.Track.get(), therefore a loop), however if everything BUT sj.Track.get() calls sj.Track.order(), then sj.Track.order() can safely call sj.Track.get(), no, the same thing happens with sj.Track.edit() - so just include manual queries, no have it so: sj.Track.get() doesn't use either moveTracks() or orderTracks(), these two methods are then free to use sj.Track.get(), and then have each use their own manual update queries - basically add, edit, remove can use these and sj.Track.get() but not each other - this is written down in that paper chart
	
	
					//R moveTracks() cannot be done before INSERT (as in editTracks()) because the tracks don't exist yet, and the input tracks do not have their own id properties yet. the result tracks of the INSERT operation cannot be used for moveTracks() as they only have their current positions, so the result ids and input positions need to be combined for use in moveTracks(), but we don't want to position tracks don't have a custom position (1 to reduce cost, 2 to maintain the behavior of being added to the end of the list (if say n later tracks are positioned ahead of m former tracks, those m former tracks will end up being n positions from the end - not at the very end). so:
	
					//C for tracks with a custom position, give the input tracks their result ids and the result tracks their custom positions
					//! requires the INSERT command to be executed one at at a time for each input track
					//R there is no way to pair input tracks with their output rows based on data because tracks have no unique properties (aside from the automatically assigned id), but because the INSERT statements are executed one at a time, the returned array is guaranteed to be in the same order as the input array, therefore we can use this to pair tracks
			*/
		};
	},	
});

export default Track;
