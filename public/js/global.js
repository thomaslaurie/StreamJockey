(function(sj){
    sj.test = function(){
         return 'Hi, I am a function from global.js';
	};
	
	//   ██████╗██╗      █████╗ ███████╗███████╗
	//  ██╔════╝██║     ██╔══██╗██╔════╝██╔════╝
	//  ██║     ██║     ███████║███████╗███████╗
	//  ██║     ██║     ██╔══██║╚════██║╚════██║
	//  ╚██████╗███████╗██║  ██║███████║███████║
	//   ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝
	
	// TODO auto name can be included in: console.trace();

	// TODO consider default values for '' and null, specifically ids (what are the semantics?)

	sj.Object = class {
		constructor(options) {
			this.objectType = 'sj.Object';

			sj.Object.init(this, options, {
				// debug
				log: false,

				// info
				code: 200,
				type: 'Ok',
				origin: '',

				// content
				message: '',
				reason: '',
				content: {},

				// DOM
				target: '',
				cssClass: '',
			});

			this.onCreate();
		}

		static init(obj, options, defaults) {
			// all classes should overwrite a truthful isParent property and should only have one when directly assigned through options through super(sj.Object.tellParent(options));
			obj.isParent = typeof options.isParent !== 'undefined' ? options.isParent : false;
			options.isParent = false;

			// deep assign, !!! breaks circular references (though these should never need to be passed)
			Object.keys(defaults).forEach(key => { // enumerable properties (from Object.keys): https://hashnode.com/post/what-are-enumerable-properties-in-javascript-ciljnbtqa000exx53n5nbkykx
				// short circuit evaluation for undefined object or property
				obj[key] = typeof options !== 'undefined' && typeof options[key] !== 'undefined' ? options[key] : defaults[key];
			});
		}
		static tellParent(options) {
			options.isParent = true;
			return options;
		}
	
		announce() {
			// include 'log: true' in options if object should be announced on creation, call obj.announce if wanted at a later time, this essentially replaces need for console.log in functions (still one line) - but with additional capability to get information from an anonymous class (return new sj.Object()), doing it the other way (boolean for not announcing on create) creates more problems and still requires writing lines and patches ---> its just better to do a positive action
			var string = this.origin + '\n' + this.objectType + '\n' + this.message;
			if (isError(this)) {
				console.error(string);
			} else {
				console.log(string);
			}	
		}
		onCreate() {
			if (this.log === true && this.isParent === false) {
				this.announce();
			}
		}
	}

	sj.Success = class extends sj.Object {
		constructor(options) {
			super(sj.Object.tellParent(options));

			this.objectType = 'sj.Success';

			sj.Object.init(this, options, {});

			this.onCreate();
		}
	}
	sj.Error = class extends sj.Object {
		constructor(options) {
			super(sj.Object.tellParent(options));

			this.objectType = 'sj.Error';

			sj.Object.init(this, options, {
				code: 400,
				type: 'Bad Request',
			});

			this.onCreate();
		}
	}
	sj.ErrorList = class extends sj.Object {
		constructor(options) {
			super(sj.Object.tellParent(options));

			this.objectType = 'sj.ErrorList';

			sj.Object.init(this, options, {
				code: 400,
				type: 'Bad Request',
				reason: 'One or more errors thrown',
				content: [],
			});

			this.onCreate();
		}
	}

	sj.Track = class extends sj.Object {
		constructor(object) {
			super(sj.Object.tellParent(options));

			this.objectType = 'sj.Track';

			sj.Object.init(this, options, {
				// new properties
				playlistId: null,
				position: null,
				source: sj.noSource,
				id: '', // TODO assumes ids are unique, even across all sources
				artists: [],
				name: '',
				duration: 0,
				link: '',
			});

			this.onCreate();
		}
	}
	sj.Playlist = class extends sj.Object {
		constructor(options) {
			super(sj.Object.tellParent(options));

			this.objectType = 'sj.Playlist';

			sj.Object.init(this, options, {
				content: [],

				// new properties
				id: null,
				userId: null,
				name: '',
				visibility: '',
				description: '',
				color: '',
				image: '',
			});

			this.onCreate();
		}
	}

	sj.Source = class extends sj.Object {
		constructor(options) {
			super(sj.Object.tellParent(options));

			this.objectType = 'sj.Source',

			sj.Object.init(this, options, {
				// new properties
				name: '', // !!! don't use this unless the source string is needed, always use the sj.Source object reference
				idPrefix: '',
				playback: new sj.Playback(), // !!! cyclical reference - has sj.Playback object which has sj.Track object which has this sj.Source object
				realSource: true,

				// empty throw functions
				loadApi: async function () {
					throw new sj.Error({
						log: true,
						origin: 'loadApi()',
						message: 'api could not be loaded',
						reason: 'no source',
					});
				},
				loadPlayer: async function () {
					throw new sj.Error({
						log: true,
						origin: 'loadPlayer()',
						message: 'player could not be loaded',
						reason: 'no source',
					});
				},

				search: async function () {
					throw new sj.Error({
						log: true,
						origin: 'search()',
						message: 'unable to search',
						reason: 'no source',
					});
				},
				getTracks: async function () {
					throw new sj.Error({
						log: true,
						origin: 'getTracks()',
						message: 'unable to get tracks',
						reason: 'no source',
					});
				},

				checkPlayback: async function () {
					throw new sj.Error({
						log: true,
						origin: 'apiStart()',
						message: 'could not check playback',
						reason: 'no source',
					});
				},

				apiStart: async function () {
					throw new sj.Error({
						log: true,
						origin: 'apiStart()',
						message: 'track could not be started',
						reason: 'no source',
					});
				},
				apiResume: async function () {
					throw new sj.Error({
						log: true,
						origin: 'apiResume()',
						message: 'track could not be resumed',
						reason: 'no source',
					});
				},
				apiPause: async function () {
					throw new sj.Error({
						log: true,
						origin: 'apiPause()',
						message: 'track could not be paused',
						reason: 'no source',
					});
				},
				apiSeek: async function () {
					throw new sj.Error({
						log: true,
						origin: 'apiSeek()',
						message: 'track could not be seeked',
						reason: 'no source',
					});
				},
				apiVolume: async function () {
					throw new sj.Error({
						log: true,
						origin: 'apiVolume()',
						message: 'volume could not be changed',
						reason: 'no source',
					});
				},
			});

			this.onCreate();
		}

		async start() {
			return this.apiStart(track).then(resolved => {
				this.playback.playing = true;
				this.playback.track = track;
				this.playback.progress = 0;
				this.playback.timeStamp = Date.now();
	
				return resolved;
			}).catch(rejected => {
				throw propagateError(rejected);
			});
		}
		async resume() {
			if (!this.playback.playing) { 
				return this.apiResume().then(resolved => {
					this.playback.playing = true;
					return resolved;
				}).catch(rejected => {
					throw rejected;
				});
			} else {
				return new sj.Success({
					log: true,
					origin: this.name + '.resume()',
					message: 'track already playing',
				});
			}
		}
		async pause() {
			if (this.playback.playing) {
				return this.apiPause().then(resolved => {
					this.playback.playing = false;
					return resolved;
				}).catch(rejected => {
					throw propagateError(rejected);
				});
			} else {
				return new sj.Success({
					log: true,
					origin: this.name + '.pause()',
					message: 'track already paused',
				});
			}	
		}
		async seek() {
			return this.apiSeek(ms).then(resolved => {
				this.playback.progress = ms;
				this.playback.timeStamp = Date.now();
				return resolved;
			}).catch(rejected => {
				throw propagateError(rejected);
			});
		}
		async volume() {
			return this.apiVolume(volume).then(resolved => {
				this.playback.volume = volume;
				return resolved;
			}).catch(rejected => {
				throw propagateError(rejected);
			});
		}

		onCreate() {
			super.onCreate();
			
			// extend with: add to source list
			if (this.realSource) {
				sj.sourceList.push(this);
			}
		}
	}
	sj.Playback = class extends sj.Object {
		constructor(options) {
			super(sj.Object.tellParent(options));

			this.objectType = 'sj.Playback';

			sj.Object.init(this, options, {
				// new properties
				track: sj.noTrack,
				playing: false,
				progress: 0,
				timeStamp: Date.now(),
				volume: 0,
			});

			this.onCreate();
		}
	}

	// TODO consider if all actions should actually be in main.js instead
	sj.Action = class extends sj.Object {
		constructor(options) {
			super(sj.Object.tellParent(options));

			this.objectType = 'sj.Action';
			source = desiredPlayback.track.source;

			sj.Object.init(this, options, {
				// new properties
				state: null,
			});

			this.onCreate();
		}

		// comparisons
		isSimilarAction(item) {
			return this.objectType === item.objectType;
		}
		isIdenticalAction(item) {
			return this.isSimilarAction(item) && this.state === item.state;
		}
		isParentAction(item) {
			return false; // TODO ??? can this be merged in some way with isParent?
		}

		removeOld(queue) {
			// backwards deletion loop
			for (var i = queue.length - 1; i > -1; i--) {
				if (this.isSimilarAction(queue[i]) || this.isParentAction(queue[i])) {
					queue.splice(i, 1);
				}
			}
		}

		async trigger() {
			return new Promise(resolve => {
				resolve(new sj.Success({
					log: true,
					origin: 'sj.Action.trigger',
				}));
			});
		}
	}
	sj.Start = class extends sj.Action {
		constructor(options) {
			super(sj.Object.tellParent(options));

			this.objectType = 'sj.Start';
			state = sj.desiredPlayback.track;

			sj.Object.init(this, options, {});

			this.onCreate();
		}

		isParentAction() {
			return item.objectType === 'sj.Toggle' || item.objectType === 'sj.Seek';
		}

		async trigger() {
			return Promise.all(sourceList.map(source => {
				// pause all
				return source.pause().then(resolveBoth);
			})).then(resolved => {
				// filter errors
				return filterList(resolved, 'sj.Success', new sj.Success({
					origin: 'sj.Start.trigger()',
					message: 'changed track',
				}), new sj.ErrorList({
					origin: 'sj.Start.trigger()',
					message: 'failed to change track',
				}));
			}).then(resolved => {
				// start
				return this.source.start(this.state);
			}).then(resolved => {
				return resolved;
			}, rejected => {
				throw propagateError(rejected);
			});
		}
	}
	sj.Toggle = class extends sj.Action {
		constructor(options) {
			super(sj.Object.tellParent(options));

			this.objectType = 'sj.Toggle';
			this.state = desiredPlayback.playing;

			sj.Object.init(this, options, {});

			this.onCreate();
		}

		async trigger() {
			if (this.state) {
				return Promise.all(sourceList.map(source => {
					if (source === this.source) {
						// resume desired source
						return source.resume().then(resolveBoth);
					} else {
						// pause all other sources
						return source.pause().then(resolveBoth);
					}
				})).then(resolved => {
					return filterList(resolved, 'sj.Success', new sj.Success({
						origin: 'sj.Toggle.trigger()',
						message: 'playing updated',
					}), new sj.ErrorList({
						origin: 'sj.Toggle.trigger()',
						message: 'playing failed to update',
					}));
				}).then(resolved => {
					return resolved;
				}, rejected => {
					throw propagateError(rejected);
				});
			} else {
				return Promise.all(sourceList.map(source => {
					// pause all sources
					return source.pause().then(resolveBoth);
				})).then(resolved => {
					return filterList(resolved, 'sj.Success', new sj.Success({
						origin: 'updatePlaybackPlaying()',
						message: 'playing updated',
					}), new sj.ErrorList({
						origin: 'updatePlaybackPlaying()',
						message: 'playing failed to update',
					}));
				}).then(resolved => {
					return resolved;
				}, rejected => {
					throw propagateError(rejected);
				});
			}
		}
	}
	sj.Seek = class extends sj.Action {
		constructor(options) {
			super(sj.Object.tellParent(options));

			this.objectType = 'sj.Seek';
			this.state = desiredPlayback.progress;

			sj.Object.init(this, options, {});

			this.onCreate();
		}

		async trigger() {
			return this.source.seek(this.state).then(resolved => {
				return new sj.Success({
					log: true,
					origin: 'sj.Seek.trigger()',
					message: 'playback progress changed',
				});
			}).catch(rejected => {
				throw propagateError(rejected);
			});
		}
	}
	sj.Volume = class extends sj.Action {
		constructor(options) {
			super(sj.Object.tellParent(options));

			this.objectType = 'sj.Volume';
			this.state = desiredPlayback.volume;

			sj.Object.init(this, options, {});

			this.onCreate();
		}

		async trigger() {
			// TODO
		}
	}

	sj.User = class extends sj.Object {
		constructor(options) {
			super(sj.Options.tellParent(options));

			this.objectType = 'sj.User';

			sj.Object.init(this, options, {
				// new properties
				id: null,
				name: '',
				email: '',
			});

			this.onCreate();
		}
	}

	// object related variables
	sj.objectList = [ // list of all valid objects
		// TODO must be a better way
		'sj.Object',
		'sj.Success',
		'sj.Error',
		'sj.ErrorList',
		'sj.Track',
		'sj.Playlist',
		'sj.User',
		'sj.Source',
		'sj.Playback',
		'sj.Action',
		'sj.Start',
		'sj.Toggle',
		'sj.Seek',
		'sj.Volume',
	];

	sj.sourceList = [];
	sj.spotify = new sj.Source({
		name: 'spotify',
	});
	sj.youtube = new sj.Source({
		name: 'youtube',
		idPrefix: 'https://www.youtube.com/watch?v=',
	});

	// null objects
	sj.noTrack = new sj.Track();
	sj.noSource = new sj.Source({realSource: false});
	sj.noTrack.source = noSource; // cyclical reference
	sj.noAction = new sj.Action();


}(typeof exports !== 'undefined' ? exports : this.sj = {}));

/* 
	Self executing anonymous function which assigns the enclosing 'global' object to be exported
	if 'exports' exists, use it, otherwise use 'this.sj.' (window.sj.) (which is set to an empty object container)

	also - this creates a closure, so anything not attached to 'c' is private

	https://stackoverflow.com/questions/3225251/how-can-i-share-code-between-node-js-and-the-browser

	!!! requires that the 'exports' name is not used in client-side js, and that when required in server-side js, the var name 'should' be the same as this.'name' in the conditional argument (in order to have the same namespace as the client code

	TODO should this be integrated in a namespace-ing fashion? (sj..Success(), sj..typeOf()), how does that then influence other non-global.js functions in index.js and such?

	TODO consider broswerify: https://github.com/browserify/browserify
	, watchify, webpack, rollup
*/
  

