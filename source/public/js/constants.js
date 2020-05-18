export const SERVER_URL = `http://localhost:3000`;
export const API_URL = `${SERVER_URL}/api`;
export const JSON_HEADER = Object.freeze({
	'Accept': 'application/json',
	'Content-Type': 'application/json',
});
export const URL_HEADER = Object.freeze({
	'Accept': 'application/json',
	'Content-Type': 'application/x-www-form-urlencoded',
});
export const GET_BODY = encodeURIComponent('body');