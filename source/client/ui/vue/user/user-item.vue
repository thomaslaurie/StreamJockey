<script>
import {useRouter} from 'vue-router';

export default {
	name: 'user-item',
	props: {
		user: {
			type: Object,
			required: true,
		},
	},
	setup() {
		const router = useRouter();

		async function open(id) {
			//TODO Extract
			router.push(`/user/${id}`);
		}

		return {
			open,
		};
	},
};
</script>

<template>
	<p>{{user.id}}</p>
	<p>{{user.name}}</p>
	<button @click='open(user.id)'>Profile</button>
</template>

<style lang='scss'>
</style>
