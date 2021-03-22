//TODO any validation needed here?
//TODO consider separating insertion checks into Conditions so multiple parameters are checked
//TODO add targets and cssClasses to each violation case too

import {CustomError} from '../../shared/errors/index.js';
import {define} from '../../shared/utility/index.ts';

export default class PostgresError extends CustomError {
	constructor({
		postgresError: {
			message,
			code,
			constraint,
		} = {},
		...rest
	} = {}) {
		super(rest);

		this.message = message;

		// Class 23 — Integrity Constraint Violation
		if (code === '23505') { // unique_violation
			// Users
			if (constraint === 'users_name_key') {
				this.userMessage = 'this user name is already taken';
			} else if (constraint === 'users_email_key') {
				this.userMessage = 'this email is already in use';
			// Playlists
			} else if (constraint === 'playlists_userId_name_key') {
				this.userMessage = 'you already have a playlist with this name';
			// Tracks
			} else if (constraint === 'tracks_position_key') {
				this.userMessage = 'a track already exists at this position';
			}
		} else if (code === '23503') { // foreign_key_violation
			// Playlists
			if (constraint === 'playlists_userId_fkey') {
				this.userMessage = 'cannot add a playlist for an unknown user';
			// Tracks
			} else if (constraint === 'tracks_playlistId_fkey') {
				this.userMessage = 'cannot add a track for an unknown playlist';
			}
		}

		define.constant(this, {code});
	}
}
