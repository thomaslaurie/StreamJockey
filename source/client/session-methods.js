import serverRequest from './server-request.js';
import {
	User,
} from './entities/index.js';

// CREATE
export async function login(user) {
	return serverRequest('POST', 'session', new User(user));
	//TODO Reconnect socket subscriptions to update subscriber info.
}

// READ
export async function get() {
	return serverRequest('GET', 'session');
}

// UPDATE
//?

// DELETE
export async function logout() {
	return serverRequest('DELETE', 'session');
	//TODO Reconnect socket subscriptions to update subscriber info.
}
