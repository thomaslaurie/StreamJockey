/* Spotify JS-SDK - v1.7.1-d2b664d */
!(function (e) {
	function t(r) {
		if (n[r]) return n[r].exports;
		const s = (n[r] = {i: r, l: !1, exports: {}});
		return e[r].call(s.exports, s, s.exports, t), (s.l = !0), s.exports;
	}
	var n = {};
	(t.m = e),
	(t.c = n),
	(t.d = function (e, n, r) {
		t.o(e, n)
        || Object.defineProperty(e, n, {
        	configurable: !1,
        	enumerable: !0,
        	get: r,
        });
	}),
	(t.n = function (e) {
		const n
        = e && e.__esModule
        	? function () {
        		return e.default;
        	}
        	: function () {
        		return e;
        	};
		return t.d(n, 'a', n), n;
	}),
	(t.o = function (e, t) {
		return Object.prototype.hasOwnProperty.call(e, t);
	}),
	(t.p = ''),
	t((t.s = 2));
})([
	function (e, t, n) {
		var r = {
			SPOTIFY_MESSAGE: 'SP_MESSAGE',
			ACCOUNT_ERROR: 'ACCOUNT_ERROR',
			AUTH_ERROR: 'AUTH_ERROR',
			CONNECT: 'CONNECT',
			CONNECTED: 'CONNECTED',
			CURRENT_STATE: 'CURRENT_STATE',
			DISCONNECT: 'DISCONNECT',
			EVENT: 'EVENT',
			GET_CURRENT_STATE: 'GET_CURRENT_STATE',
			GET_TOKEN: 'GET_TOKEN',
			GET_VOLUME: 'GET_VOLUME',
			INIT: 'INIT',
			LOADED: 'LOADED',
			NEXT_TRACK: 'NEXT_TRACK',
			PAUSE: 'PAUSE',
			PLAYBACK_ERROR: 'PLAYBACK_ERROR',
			PLAYER_INIT_ERROR: 'PLAYER_INIT_ERROR',
			PLAYER_READY: 'PLAYER_READY',
			PLAYER_NOT_READY: 'PLAYER_NOT_READY',
			PLAYER_STATE_CHANGED: 'PLAYER_STATE_CHANGED',
			PREV_TRACK: 'PREV_TRACK',
			RESUME: 'RESUME',
			SEEK: 'SEEK',
			SET_NAME: 'SET_NAME',
			SET_VOLUME: 'SET_VOLUME',
			TOGGLE_PLAY: 'TOGGLE_PLAY',
			TOKEN: 'TOKEN',
			VOLUME: 'VOLUME',
			accountError(e) {
				return this._createEventMessage(r.ACCOUNT_ERROR, {message: e});
			},
			authError(e) {
				return this._createEventMessage(r.AUTH_ERROR, e);
			},
			playbackError(e) {
				return this._createEventMessage(r.PLAYBACK_ERROR, e);
			},
			playerReady(e) {
				return this._createEventMessage(r.PLAYER_READY, e);
			},
			playerNotReady(e) {
				return this._createEventMessage(r.PLAYER_NOT_READY, e);
			},
			connect() {
				return this._createMessage(r.CONNECT);
			},
			connected(e, t) {
				return this._createMessage(r.CONNECTED, {connected: e, ref: t});
			},
			disconnect() {
				return this._createMessage(r.DISCONNECT);
			},
			init(e) {
				return this._createMessage(r.INIT, e);
			},
			playerInitError(e) {
				return this._createEventMessage(r.PLAYER_INIT_ERROR, e);
			},
			getToken() {
				return this._createMessage(r.GET_TOKEN);
			},
			token(e, t) {
				return this._createMessage(r.TOKEN, {token: e, ref: t});
			},
			pause() {
				return this._createMessage(r.PAUSE);
			},
			resume() {
				return this._createMessage(r.RESUME);
			},
			togglePlay() {
				return this._createMessage(r.TOGGLE_PLAY);
			},
			seek(e) {
				return this._createMessage(r.SEEK, e);
			},
			nextTrack(e) {
				return this._createMessage(r.NEXT_TRACK, e);
			},
			previousTrack(e) {
				return this._createMessage(r.PREV_TRACK, e);
			},
			getCurrentState() {
				return this._createMessage(r.GET_CURRENT_STATE);
			},
			currentState(e, t) {
				return this._createMessage(r.CURRENT_STATE, {state: e, ref: t});
			},
			playerStateChanged(e) {
				return this._createEventMessage(r.PLAYER_STATE_CHANGED, e);
			},
			getVolume() {
				return this._createMessage(r.GET_VOLUME);
			},
			volume(e, t) {
				return this._createMessage(r.VOLUME, {volume: e, ref: t});
			},
			setVolume(e) {
				return this._createMessage(r.SET_VOLUME, e);
			},
			setName(e) {
				return this._createMessage(r.SET_NAME, e);
			},
			embeddedLoaded() {
				return this._createMessage(r.LOADED);
			},
			_createEventMessage(e, t) {
				return this._createMessage(r.EVENT, {name: e, eventData: t});
			},
			_createMessage(e, t) {
				return {
					type: r.SPOTIFY_MESSAGE,
					body: {topic: e, data: t ? JSON.parse(JSON.stringify(t)) : null},
				};
			},
		};
		e.exports = r;
	},
	function (e, t) {
		let n;
		n = (function () {
			return this;
		})();
		try {
			n = n || Function('return this')() || (0, eval)('this');
		} catch (e) {
			typeof window === 'object' && (n = window);
		}
		e.exports = n;
	},
	function (e, t, n) {
		function r() {
			const e = n(3);
			if (!document.body) throw new Error("Document doesn't have a body");
			if (
				((window.Spotify = {Player: e.setupPlayerEnv(window)}),
				window.onSpotifyWebPlaybackSDKReady)
			) window.onSpotifyWebPlaybackSDKReady();
			else {
				if (!window.onSpotifyPlayerAPIReady) throw new Error('onSpotifyWebPlaybackSDKReady is not defined');
				window.onSpotifyPlayerAPIReady();
			}
		}
		document.readyState === 'complete'
			? r()
			: window.addEventListener('load', r);
	},
	function (e, t, n) {
		const r = n(4);
		const s = n(5);
		const o = n(0);
		const i = n(6);
		const a = function (e, t) {
			let n;
			const a = 'https://sdk.scdn.co/embedded/index.html';
			const u = s.defer();
			const c = new r();
			const _
        = t
        || function (t) {
        	const n = e.document.createElement('iframe');
        	return (
        		(n.src = t),
        		n.setAttribute('alt', 'Audio Playback Container'),
        		n.setAttribute('tabIndex', '-1'),
        		n.style.setProperty('position', 'absolute', 'important'),
        		n.style.setProperty('left', '-1px', 'important'),
        		n.style.setProperty('width', '0', 'important'),
        		n.style.setProperty('height', '0', 'important'),
        		n.style.setProperty('border', 'none', 'important'),
        		n.style.setProperty('outline', 'none', 'important'),
        		(n.allow = 'encrypted-media; autoplay'),
        		e.document.body.appendChild(n),
        		n.contentWindow
        	);
        };
			var h = function (t) {
				t === o.LOADED && (c.stopListening(e, h), u.resolve());
			};
			c.listen(e, h), (n = _(a));
			const f = function (t) {
				(this._options = this._sanitizeOptions(t)),
				(this._handleMessages = this._handleMessages.bind(this)),
				(this._messageHandlers = {}),
				(this._eventListeners = {}),
				this._setupMessageHandlers(),
				(this._connectionRequests = {}),
				(this._getCurrentStateRequests = {}),
				(this._getVolumeRequests = {}),
				(this.isLoaded = u.promise.then(() => {
					c.listen(e, this._handleMessages),
					this._sendMessage(o.init(this._options));
				}));
			};
			return (
				(f.prototype._sanitizeOptions = function (t) {
					const n = (e && e.location && e.location.hostname) || '';
					return {
						name: t.name || n,
						id: i.get(),
						getOAuthToken: t.getOAuthToken || t.getOauthToken,
						volume: t.volume || 1,
					};
				}),
				(f.prototype._setupMessageHandlers = function () {
					(this._messageHandlers[o.GET_TOKEN] = this._onGetToken.bind(this)),
					(this._messageHandlers[o.EVENT] = this._onEvent.bind(this)),
					(this._messageHandlers[o.CONNECTED] = this._onConnected.bind(this)),
					(this._messageHandlers[o.CURRENT_STATE] = this._onCurrentState.bind(
						this,
					)),
					(this._messageHandlers[o.VOLUME] = this._onVolume.bind(this));
				}),
				(f.prototype.connect = function () {
					return this.isLoaded.then(() => {
						const e = this._sendMessage(o.connect());
						return (
							(this._connectionRequests[e] = s.defer()),
							this._connectionRequests[e].promise
						);
					});
				}),
				(f.prototype.on = function (e, t) {
					if (!e) throw new TypeError('Argument `eventName` is required.');
					if (typeof t !== 'function') throw new TypeError('Argument `listener` must be a function.');
					return (
						(this._eventListeners[e] = this._eventListeners[e] || []),
						this._eventListeners[e].indexOf(t) === -1
              && (this._eventListeners[e].push(t), !0)
					);
				}),
				(f.prototype.addListener = function (e, t) {
					return this.on(e, t);
				}),
				(f.prototype.removeListener = function (e, t) {
					if (!e) throw new TypeError('Argument `eventName` is required.');
					if (arguments.length === 1) return (this._eventListeners[e] = []), !0;
					if (typeof t !== 'function') throw new TypeError('Argument `listener` must be a function.');
					const n = this._eventListeners[e];
					return (
						!(!n || !n.length)
            && ((this._eventListeners[e] = n.filter((e) => {
            	return e !== t;
            })),
            !0)
					);
				}),
				(f.prototype.getCurrentState = function () {
					return this.isLoaded.then(() => {
						const e = this._sendMessage(o.getCurrentState());
						return (
							(this._getCurrentStateRequests[e] = s.defer()),
							this._getCurrentStateRequests[e].promise
						);
					});
				}),
				(f.prototype.getVolume = function () {
					return this.isLoaded.then(() => {
						const e = this._sendMessage(o.getVolume());
						return (
							(this._getVolumeRequests[e] = s.defer()),
							this._getVolumeRequests[e].promise
						);
					});
				}),
				(f.prototype.setName = function (e) {
					return this._sendMessageWhenLoaded(o.setName(e));
				}),
				(f.prototype.setVolume = function (e) {
					return this._sendMessageWhenLoaded(o.setVolume(e));
				}),
				(f.prototype.pause = function () {
					return this._sendMessageWhenLoaded(o.pause());
				}),
				(f.prototype.resume = function () {
					return this._sendMessageWhenLoaded(o.resume());
				}),
				(f.prototype.togglePlay = function () {
					return this._sendMessageWhenLoaded(o.togglePlay());
				}),
				(f.prototype.seek = function (e) {
					return this._sendMessageWhenLoaded(o.seek(e));
				}),
				(f.prototype.previousTrack = function (e) {
					return this._sendMessageWhenLoaded(o.previousTrack(e));
				}),
				(f.prototype.nextTrack = function (e) {
					return this._sendMessageWhenLoaded(o.nextTrack(e));
				}),
				(f.prototype.disconnect = function () {
					return this._sendMessageWhenLoaded(o.disconnect());
				}),
				(f.prototype._getListeners = (function () {
					const e = {};
					return (
						(e[o.ACCOUNT_ERROR] = 'account_error'),
						(e[o.AUTH_ERROR] = 'authentication_error'),
						(e[o.PLAYBACK_ERROR] = 'playback_error'),
						(e[o.PLAYER_INIT_ERROR] = 'initialization_error'),
						(e[o.PLAYER_READY] = 'ready'),
						(e[o.PLAYER_NOT_READY] = 'not_ready'),
						(e[o.PLAYER_STATE_CHANGED] = 'player_state_changed'),
						function (t) {
							return this._eventListeners[e[t]] || [];
						}
					);
				})()),
				(f.prototype._onEvent = function (e) {
					this._getListeners(e.name).forEach((t) => {
						t(e.eventData);
					});
				}),
				(f.prototype._onGetToken = function (e, t) {
					const n = this._options.getOAuthToken;
					if (typeof n !== 'function') {
						const r = 'getOAuthToken is not a function';
						if (this._getListeners(o.PLAYER_INIT_ERROR).length) {
							return void this._onEvent({
								name: o.PLAYER_INIT_ERROR,
								eventData: {message: r},
							});
						}
						throw new Error(r);
					}
					new s(n).then((e) => {
						this._sendMessage(o.token(e, t));
					});
				}),
				(f.prototype._onConnected = function (e) {
					e.ref in this._connectionRequests
            && (this._connectionRequests[e.ref].resolve(e.connected),
            delete this._connectionRequests[e.ref]);
				}),
				(f.prototype._onCurrentState = function (e) {
					e.ref in this._getCurrentStateRequests
            && (this._getCurrentStateRequests[e.ref].resolve(e.state),
            delete this._getCurrentStateRequests[e.ref]);
				}),
				(f.prototype._onVolume = function (e) {
					e.ref in this._getVolumeRequests
            && (this._getVolumeRequests[e.ref].resolve(e.volume),
            delete this._getVolumeRequests[e.ref]);
				}),
				(f.prototype._handleMessages = function (e, t, n) {
					e in this._messageHandlers && this._messageHandlers[e](t, n);
				}),
				(f.prototype._sendMessage = function (e) {
					return c.send(n, e, a);
				}),
				(f.prototype._sendMessageWhenLoaded = function (e) {
					return this.isLoaded.then(this._sendMessage.bind(this, e));
				}),
				f
			);
		};
		e.exports.setupPlayerEnv = a;
	},
	function (e, t, n) {
		const r = n(0);
		const s = function () {
			(this._onMessageCallback = function () {}),
			(this._receiveMessage = this._receiveMessage.bind(this)),
			(this._messageId = 0);
		};
		(s.prototype.listen = function (e, t) {
			(this._onMessageCallback = t),
			e.addEventListener('message', this._receiveMessage);
		}),
		(s.prototype.stopListening = function (e) {
			e.removeEventListener('message', this._receiveMessage);
		}),
		(s.prototype.send = function (e, t, n) {
			return e.postMessage(this._addMessageId(t), n || '*'), t.seq;
		}),
		(s.prototype._addMessageId = function (e) {
			return (e.seq = this._messageId++), e;
		}),
		(s.prototype._receiveMessage = function (e) {
			const t = e.data;
			t.type === r.SPOTIFY_MESSAGE
          && t.body
          && t.body.topic
          && this._onMessageCallback(t.body.topic, t.body.data, t.seq);
		}),
		(e.exports = s);
	},
	function (e, t, n) {
		(function (t) {
			const n = t.Promise;
			if (!n) throw new Error('Fatal: no Promise implementation available.');
			let r;
			(r = Object.defineProperty
				? function (e, t, n) {
					return e[t]
						? e
						: (Object.defineProperty(e, t, {
							value: n,
							configurable: !0,
							writable: !0,
						}),
						e);
				}
				: function (e, t, n) {
					return e[t] ? e : ((e[t] = n), e);
				}),
			r(n, 'defer', () => {
				const e = {};
				return (
					(e.promise = new n((t, n) => {
						(e.resolve = t), (e.reject = n);
					})),
					e
				);
			}),
			r(n.prototype, 'spread', function (e, t) {
				return this.then((e) => {
					return n.all(e);
				}).then(function (t) {
					return t.length === 1 ? e(t[0]) : e.apply(this, t);
				}, t);
			}),
			(e.exports = n);
		}).call(t, n(1));
	},
	function (e, t, n) {
		(function (t) {
			function r() {
				const e = new t.Uint8Array(16);
				return (
					t.crypto.getRandomValues(e), i.toHex(e.join(''), 40).slice(0, 40)
				);
			}
			function s() {
				for (var e = new Array(27), t = e.length; t--;) e[t] = Math.floor(8 * Math.random());
				return i.toHex(e.join(''), 40);
			}
			function o(e, n) {
				if (e && typeof e === 'string') return e;
				if (n) return u();
				let r = t.localStorage.getItem(c);
				return r || ((r = u()), t.localStorage.setItem(c, r)), r;
			}
			var i = n(7);
			const a
        = typeof t.Uint8Array === 'function'
        && void 0 !== t.crypto
        && typeof t.crypto.getRandomValues === 'function';
			var u = a ? r : s;
			var c = '_spharmony_device_id';
			e.exports = {
				get: o,
				generate: u,
				generateWithCrypto: r,
				generateWithRandom: s,
			};
		}).call(t, n(1));
	},
	function (e, t, n) {
		function r(e, t, n) {
			for (var r = 0, s = 0; s < e.length; ++s) {
				const o = e[s] * t + r;
				(e[s] = o % n), (r = ~~(o / n));
			}
			for (; r;) e.push(r % n), (r = ~~(r / n));
		}
		function s(e, t, n, r) {
			let s;
			let o;
			let i = 0;
			for (o = 0; o < t.length; ++o) (s = ~~e[o] + t[o] * n + i), (e[o] = s % r), (i = ~~(s / r));
			for (; i;) (s = ~~e[o] + i), (e[o] = s % r), (i = ~~(s / r)), ++o;
		}
		function o(e, t, n) {
			for (var o = [0], i = [1], a = 0; a < e.length; ++a) s(o, i, e[a], n), r(i, t, n);
			return o;
		}
		function i(e, t) {
			for (var n = [], r = 0; r < e.length; ++r) n.push(t[e[r]]);
			return n.reverse();
		}
		function a(e, t) {
			for (; e.length < t;) e.push(0);
			return e;
		}
		const u = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const c = {};
		const _ = {};
		!(function () {
			let e;
			let t;
			for (e = 0, t = u.length; e < t; ++e) _[u[e]] = e;
			for (e = 0; e < 16; ++e) c['0123456789abcdef'[e]] = e;
			for (e = 0; e < 16; ++e) c['0123456789ABCDEF'[e]] = e;
		})(),
		(e.exports = {
			fromBytes(e, t) {
				return i(a(o(e.slice(0).reverse(), 256, 62), t), u).join('');
			},
			toBytes(e, t) {
				return a(o(i(e, _), 62, 256), t).reverse();
			},
			toHex(e, t) {
				return i(a(o(i(e, _), 62, 16), t), u).join('');
			},
			fromHex(e, t) {
				return i(a(o(i(e, c), 16, 62), t), u).join('');
			},
		});
	},
]);
