//TODO //L Consider: https://www.npmjs.com/package/safe-stable-stringify
//TODO //L Consider: https://www.npmjs.com/package/flatted <--- preserves circular JSON

//TODO //? Does this account for JSON.stringify() throwing on BigInt?

import fclone from 'fclone';

export default function safeStringify(value) {
	return JSON.stringify(fclone(value));
}
