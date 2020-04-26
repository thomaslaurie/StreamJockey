// Dynamically loads a script using a URL, as would be done by a <script> element.
//L Modified from: https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement#Dynamically_importing_scripts
//G Gotchas: https://www.danielcrabtree.com/blog/25/gotchas-with-dynamically-adding-script-tags-to-html

import {Deferred} from '../../../shared/utility/index.js';

export default async function (url) {
	const scriptElement = document.createElement('script');
	const promise = new Deferred();

	scriptElement.onerror = promise.reject;
	scriptElement.onload  = promise.resolve;
	
	scriptElement.src = url;

	// Add script to <head>
	document.head.appendChild(scriptElement);
	
	return await promise;
};
