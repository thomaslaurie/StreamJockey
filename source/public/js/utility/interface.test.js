//TODO Test functions with [value] and [object, key] parameters.

import test from './test.js';
import { 
	Interface, 
	SymbolInterface, 
	exists, 
	ALL, 
	ANY,
} from './interface.js';

export function testInterface() {
	const symbolInterface = new SymbolInterface({
		foo: (o, k) => o[k] === 'foo',
	});

	return test([
		['complete', 
			(new Interface({
				jump: exists,
				swim: exists,
				fly:  exists,
			})).isImplementedBy({
				jump: 'jump',
				swim: 'swim',
				fly:  'fly',
			})
		],
		['incomplete', 
			!(new Interface({
				jump: exists,
				swim: exists,
				fly:  exists,
			})).isImplementedBy({
				jump: 'jump',
				swim: 'swim',
			})
		],

		['exists succeeds',      
			(new Interface({
				foo: exists,
			})).isImplementedBy({
				foo: undefined,
			})
		],
		['exists fails',        
			!(new Interface({
				foo: exists,
			})).isImplementedBy({})
		],

		['validator succeeds', 
			(new Interface({
				foo: (o, k) => o[k] === 'foo',
			})).isImplementedBy({
				foo: 'foo',
			})
		],
		['validator fails',   
			!(new Interface({
				foo: (o, k) => o[k] === 'foo',
			})).isImplementedBy({
				foo: 'bar',
			})
		],

		['full undefined succeeds', 
			(new Interface({
				foo: (o, k) => o[k] === undefined,
			})).isImplementedBy({})
		],
		['full undefined fails', 
			!(new Interface({
				foo: (o, k) => o[k] === undefined,
			})).isImplementedBy({
				foo: 'foo',
			})
		],

		['partial undefined succeeds',
			(new Interface({
				foo: (o, k) => o[k] === undefined,
				bar: (o, k) => o[k] === 'bar',
			})).isImplementedBy({
				bar: 'bar',
			})
		],
		['partial undefined fails',
			!(new Interface({
				foo: (o, k) => o[k] === undefined,
				bar: (o, k) => o[k] === 'bar',
			})).isImplementedBy({
				foo: 'foo',
				bar: 'bar',
			})
		],

		['full undeclared succeeds', 
			(new Interface({
				foo: (o, k) => !(k in o),
			})).isImplementedBy({})
		],
		['full undeclared fails', 
			!(new Interface({
				foo: (o, k) => !(k in o),
			})).isImplementedBy({
				foo: undefined,
			})
		],
		
		['partial undeclared succeeds',
			(new Interface({
				foo: (o, k) => !(k in o),
				bar: (o, k) => o[k] === 'bar',
			})).isImplementedBy({
				bar: 'bar',
			})
		],
		['partial undeclared fails',
			!(new Interface({
				foo: (o, k) => !(k in o),
				bar: (o, k) => o[k] === 'bar',
			})).isImplementedBy({
				foo: undefined,
				bar: 'bar',
			})
		],

		['all succeeds',
			(new Interface({
				foo: (o, k) => o[k] === 'foo',
				bar: (o, k) => o[k] === 'bar',
			})).isImplementedBy({
				foo: 'bar',
				bar: 'foo',
			}, ALL)
		],
		['all fails',
			!(new Interface({
				foo: (o, k) => o[k] === 'foo',
				bar: (o, k) => o[k] === 'bar',
			})).isImplementedBy({
				foo: 'bar',
			}, ALL)
		],

		['any succeeds',
			(new Interface({
				foo: (o, k) => o[k] === 'foo',
				bar: (o, k) => o[k] === 'bar',
			})).isImplementedBy({
				foo: 'bar',
			}, ANY)
		],
		['any fails',
			!(new Interface({
				foo: (o, k) => o[k] === 'foo',
				bar: (o, k) => o[k] === 'bar',
			})).isImplementedBy({
				baz: 'baz',
			}, ANY)
		],

		['empty',
			(new Interface({
			})).isImplementedBy({
			})
		],

		['SymbolInterface by value',
			symbolInterface.isImplementedBy({
				[symbolInterface.foo]: 'foo',
			})
		],
		['SymbolInterface by key fails',
			!symbolInterface.isImplementedBy({
				foo: 'foo',
			})
		],
	], 'Interface');
};

testInterface();