import {
	dynamicClass,
	define,
} from './utility/index.js';

export default dynamicClass.create('Subscription', {
	//? should this inherit from sj.Success since it will be returned from a function
	instance: ({
		liveQuery,
		onUpdate = () => {},
		onAdd    = () => {},
		onEdit   = () => {},
		onRemove = () => {},
	}) => ({
		liveQuery,
		onUpdate,
		onAdd,
		onEdit,
		onRemove,
	}),
});