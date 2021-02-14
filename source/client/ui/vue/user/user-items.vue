<script>
import UserItem from './user-item.vue';

export default {
	name: 'user-items',
	props: {
		users: {
			type: Array,
			required: true,
		},
	},
	components:  {
		UserItem,
	},
};
</script>

<template>
	<ul class='user-items'>
		<li
			v-for='user in users'
			:key='user.id'
			:display='user'
		>
			<user-item :user='user' v-bind='$attrs'></user-item>
		</li>
	</ul>
</template>

<style lang='scss'>
	.user-items {
		$margin: 5px;
		ul {
			padding: 0;
			margin: $margin 0 $margin 0;
		}
		li {
			padding: 0;
			margin: $margin 0 $margin 0;
		}
	}
</style>
