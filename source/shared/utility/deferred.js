// Custom promise that can be resolve, rejected, and cancelled outside its executor.
// May be called without an executor, upon which it will never resolve.

import define from './object/define.js';
import wait   from './time/wait.js';

export default class Deferred extends Promise {
	constructor(executor = () => {}) {
		//R Closures are used here instead of instance variables because instance variables don't exist before super is called. This is required because this super call is being intercepted to tap into the resolve/reject calls.
		const closure = {
			isPending: true,
			// If closure.isCanceled is true, instance.resolve() / instance.reject() are prevented from actually resolving/rejecting the promise.
			//R Cancel is useful specifically for deferred promises to ensure that they cannot be fulfilled/rejected in the future.
			isCanceled: false,
		};
		const interceptedExecutor = (resolve, reject) => {
			closure.resolve = (resolved) => {
				if (!closure.isCanceled) {
					closure.isPending = false;
					resolve(resolved);
				}
			};
			closure.reject = (rejected) => {
				if (!closure.isCanceled) {
					closure.isPending = false;
					reject(rejected);
				}
			};
			return executor(resolve, reject);
		};

		super(interceptedExecutor);

		// INSTANCE VARIABLES
		define.getter(this, {
			// Read-only access to closure.isPending and closure.isCanceled.
			get isPending()  { return closure.isPending  },
			get isCanceled() { return closure.isCanceled },
		});
		define.constant(this, {
			// Access to resolve/reject functions.
			resolve: closure.resolve,
			reject:  closure.reject,
			// Ability to prevent promise from settling.
			cancel() {
				closure.isCanceled = true;
				return this;
			},
			// Ability to set automatic rejection upon timeout.
			timeout(duration, onTimeout = () => new Error('Deferred promise timed out.')) {
				wait(duration).then(() => {
					// Don't timeout if promise has settled.
					if (closure.isPending) {
						this.reject(onTimeout());
					}
				});
				return this;
			},
		});
	}
}
