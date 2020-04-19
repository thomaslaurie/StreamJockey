import {
	dynamicClass,
	define, //TODO check if some properties can be made constant
} from './utility/index.js';
import Source from './source.client.js';

//TODO finish me

export const Command = dynamicClass.create('Command', {
	intercept(accessory) {
		if (accessory.options.source typeof Source) {
			throw new Error() //---------- went to rewrite sj.Error
		}

			//G must be given a source
			if (!sj.isType(accessory.options.source, sj.Source)) throw new sj.Error({
				origin: 'sj.Command.beforeInitialize()',
				message: 'no source is active to receive this command',
				reason: `sj.Command instance.source must be an sj.Source: ${accessory.options.source}`,
				content: accessory.options.source,
			});
	},
});


sj.Command = sj.Base.makeClass('Command', sj.Base, {
	constructorParts: parent => ({
		beforeInitialize(accessory) {
			//G must be given a source
			if (!sj.isType(accessory.options.source, sj.Source)) throw new sj.Error({
				origin: 'sj.Command.beforeInitialize()',
				message: 'no source is active to receive this command',
				reason: `sj.Command instance.source must be an sj.Source: ${accessory.options.source}`,
				content: accessory.options.source,
			});
		},
		defaults: {
			source: undefined,
		},
		afterInitialize(accessory) {
			this.collapsedCommands = []; //C an array used to store any collapsed or annihilated commands so that they may be resolved when this command either resolves or is annihilated
			this.fullResolve = function (success) {
				//C resolve collapsed commands
				this.collapsedCommands.forEach(collapsedCommand => {
					collapsedCommand.resolve(new sj.Success({
						origin: 'resolvePlus()',
						reason: 'command was collapsed',
					}));
				});
				//C resolve self
				this.resolve(success);
			};
			this.fullReject = function (error) {
				//C//! RESOLVE collapsed commands
				this.collapsedCommands.forEach(a => {
					a.resolve(new sj.Success({
						origin: 'resolvePlus()',
						reason: 'command was collapsed',
					}));
				});
				//C reject self
				this.reject(error);
			};

			this.resolve = function () {
				throw new sj.Error({
					origin: 'sj.Command.resolve()',
					reason: 'command.resolve called but it has not been given a resolve function',
				});
			};
			this.resolve = function () {
				throw new sj.Error({
					origin: 'sj.Command.reject()',
					reason: 'command.reject called but it has not been given a reject function',
				});
			};
		},
	}),
	prototypeProperties: parent => ({
		identicalCondition(otherCommand) {
			//C otherCommand must be an sj.Command, and have the same playback-state properties
			return sj.isType(otherCommand, sj.Command)
			&& otherCommand.source === this.source;
		}, 
		collapseCondition(otherCommand) {
			//C collapse if identical
			return this.identicalCondition(otherCommand);
		},
		annihilateCondition: otherCommand => false,
		async trigger(context) {
			//C load the player if not loaded
			if (context.state[this.source.name].player === null) await context.dispatch(`${this.source.name}/loadPlayer`);
		},
	}),
});
sj.Start = sj.Base.makeClass('Start', sj.Command, {
	constructorParts: parent => ({
		beforeInitialize(accessory) {
			//G must be given a track
			if (!sj.isType(accessory.options.track, sj.Track)) throw new sj.Error({
				origin: 'sj.Start.beforeInitialize()',
				reason: 'sj.Start instance.track must be an sj.Track',
				content: accessory.options.track,
			});
		},
		defaults: {
			track: undefined,
			isPlaying: true,
			progress: 0,
		},
	}),
	prototypeProperties: parent => ({
		identicalCondition(otherCommand) {
			return parent.prototype.identicalCondition.call(this, otherCommand) 
			&& sj.isType(otherCommand.track, sj.Track) //C catch non-sj.Tracks
			&& otherCommand.track.sourceId === this.track.sourceId //! compare tracks by their sourceId not by their reference
			&& otherCommand.isPlaying === this.isPlaying
			&& otherCommand.progress === this.progress;
		},
		collapseCondition(otherCommand) {
			//C collapses parent condition, any sj.Starts, sj.Resumes, sj.Pauses, or sj.Seeks
			return parent.prototype.collapseCondition.call(this, otherCommand)
			|| otherCommand.constructor === sj.Start
			|| otherCommand.constructor === sj.Resume 
			|| otherCommand.constructor === sj.Pause 
			|| otherCommand.constructor === sj.Seek;
		},
		async trigger(context) {
			await parent.prototype.trigger.call(this, context);

			//C pause all
			await asyncMap(sj.Source.instances, async source => {
				if (context.state[source.name].player !== null) await context.dispatch(`${source.name}/pause`);
			});

			//C change startingTrackSubscription to subscription of the new track
			context.commit('setStartingTrackSubscription', await context.dispatch('resubscribe', {
				subscription: context.state.startingTrackSubscription,

				Entity: sj.Track,
				query: {id: this.track.id},
				options: {}, //TODO //?
			}, {root: true})); //L https://vuex.vuejs.org/guide/modules.html#accessing-global-assets-in-namespaced-modules

			//C start target
			await context.dispatch(`${this.source.name}/start`, this.track);

			//C transfer subscription from starting to current
			context.commit('setCurrentTrackSubscription', context.state.startingTrackSubscription);
			context.commit('setStartingTrackSubscription', null);

			//C change source
			context.commit('setSource', this.source);
		},
	}),
});
sj.Toggle = sj.Base.makeClass('Toggle', sj.Command, {
	//? pause command might not have a desired progress?
	constructorParts: parent => ({
		beforeInitialize({options}) {
			//G isPlaying must be manually set to true or false
			if (options.isPlaying !== true && options.isPlaying !== false) throw new sj.Error({
				origin: 'sj.Toggle',
				reason: `Toggle isPlaying must be true or false: ${options.isPlaying}`,
				content: options.isPlaying,
			});
		},
		defaults: {
			isPlaying: undefined,
		},
	}),
	prototypeProperties: parent => ({
		identicalCondition(otherCommand) {
			return parent.prototype.identicalCondition.call(this, otherCommand)
			&& otherCommand.isPlaying === this.isPlaying;
		},
		//! sj.Toggle doesn't have a unique collapseCondition because the otherCommand is either identical (and collapses by default) or is opposite and annihilates
		annihilateCondition(otherCommand) {
			return parent.prototype.annihilateCondition.call(this, otherCommand)
			|| ( 
				//C same source, inverse isPlaying, both are sj.Toggle (ie. don't annihilate pauses with starts)
				parent.prototype.identicalCondition.call(this, otherCommand)
				&& otherCommand.isPlaying === !this.isPlaying
				&& otherCommand.constructor === this.constructor
			);
		},
		async trigger(context) {
			await parent.prototype.trigger.call(this, context);

			await asyncMap(sj.Source.instances, async source => {
				if (this.isPlaying && source === this.source) {
					//C resume target if resuming
					await context.dispatch(`${source.name}/resume`);
				} else {
					//C pause all or rest
					if (context.state[source.name].player !== null) await context.dispatch(`${source.name}/pause`);
				}
			});
		},
	}),
});
sj.Seek = sj.Base.makeClass('Seek', sj.Command, {
	constructorParts: parent => ({
		beforeInitialize({options}) {
			//G progress must be manually set between 0 and 1\
			if (options.progress < 0 || 1 < options.progress) throw new sj.Error({
				origin: 'sj.Seek.trigger()',
				reason: `seek progress is not a number between 0 and 1: ${options.progress}`,
				content: options.progress,
			});
		},
		defaults: {
			progress: undefined,
		},
	}),
	prototypeProperties: parent => ({
		identicalCondition(otherCommand) {
			return parent.prototype.identicalCondition.call(this, otherCommand)
			&& otherCommand.progress === this.progress;
		},
		collapseCondition(otherCommand) {
			return parent.prototype.collapseCondition.call(this, otherCommand)
			|| otherCommand.constructor === sj.Seek;
		},
		async trigger(context) {			
			await parent.prototype.trigger.call(this, context);

			await context.dispatch(`${this.source.name}/seek`, this.progress);
		},
	}),
});
sj.Volume = sj.Base.makeClass('Volume', sj.Command, {
	constructorParts: parent => ({
		beforeInitialize({options}) {
			//G volume must be manually set between 0 and 1
			if (options.volume < 0 || 1 < options.volume) throw new sj.Error({
				origin: 'sj.Volume.trigger()',
				reason: `volume is not a number between 0 and 1: ${options.volume}`,
				content: options.volume,
			});
		},
		defaults: {
			volume: undefined,
		},
	}),
	prototypeProperties: parent => ({
		identicalCondition(otherCommand) {
			return parent.prototype.identicalCondition.call(this, otherCommand)
			&& otherCommand.volume === this.volume;
		},
		collapseCondition(otherCommand) {
			return parent.prototype.collapseCondition.call(this, otherCommand)
			|| otherCommand.constructor === sj.Volume;
		},
		async trigger(context) {
			await parent.prototype.trigger.call(this, context);

			//C adjust volume on all sources
			await asyncMap(sj.Source.instances, async source => {
				if (context.state[source.name].player !== null) await context.dispatch(`${source.name}/volume`, this.volume);
			});
		},
	}),
});