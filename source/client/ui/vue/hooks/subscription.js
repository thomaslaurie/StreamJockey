// Takes optionally reactive subscription arguments to create a computed subscription getter.
// Creates an asyncData object for the getter and pipes its data ref through the getLiveData function and the transformData function.

//G //! Subscription will only reactively-refresh if the query argument is ref.

//R Cannot useAsyncData for getLiveData because the hook cannot react to changes of getLiveData.

//TODO //? What happens if query is empty?

import {computed, onUnmounted, readonly, ref, toRefs, unref, watch, watchEffect} from 'vue';
import {useStore} from 'vuex';
import {rules} from '../../../../shared/utility/index.ts';
import useAsyncData from './async-data.js';

export default function useSubscription({
	entity,
	query,
	transform = data => data,
} = {}) {
	rules.func.validate(transform);

	const store = useStore();

	//R Cannot reference subscription.data in computed to unsubscribe because it will cause an infinite loop.
	//R //? Tried setting subscription to markRaw however it still triggers reactivity somehow.
	const getSubscription = computed(() => {
		return () => store.dispatch('subscribe', {
			Entity: unref(entity),
			query: unref(query),
		});
	});
	const subscription = useAsyncData(getSubscription);

	// Unsubscribe from the old subscription upon update.
	watch(() => subscription.data, (value, oldValue) => {
		store.dispatch('unsubscribe', {subscription: oldValue});
	});
	// Unsubscribe from the current subscription upon unmount.
	onUnmounted(() => {
		//TODO Test that this doesn't mess anything up.
		store.dispatch('unsubscribe', {subscription: subscription.data});
	});

	const data = ref(transform()); // Transform initial value too.
	watchEffect(() => {
		if (subscription.isFulfilled) {
			data.value = transform(store.getters.getLiveData(subscription.data));
		}
	});

	return readonly({
		...toRefs(subscription),
		data,
	});
}
