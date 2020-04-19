import {
	dynamicClass,
	define,
} from '../public/js/utility/index.js';
import Subscription from '../public/js/subscription.base.js';

export default dynamicClass.augment(Subscription, {
	instance: ({user = null}) => ({user}),
});