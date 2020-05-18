//TODO//L Consider: https://www.npmjs.com/package/safe-stable-stringify
//TODO//L Consider: https://www.npmjs.com/package/flatted <--- preserves circular JSON

import fclone from 'fclone';

export default function (value) {
	return JSON.stringify(fclone(value));
};