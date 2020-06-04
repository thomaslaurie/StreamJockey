import serverRequest from '../public/js/server-request';
import {
	User,
} from './entities/index.js';

// CREATE
export async function login(user) {
	return await serverRequest('POST', 'session', new User(user));
	//TODO Reconnect socket subscriptions to update subscriber info.
};

// READ
export async function get() {
	return await serverRequest('GET', 'session');
};

// UPDATE
//?

// DELETE
export async function logout() {
	return await serverRequest('DELETE', 'session');
	//TODO Reconnect socket subscriptions to update subscriber info.
};
