<script>
	import AsyncDisplayList from '../async/AsyncDisplayList.vue';
	import UserDisplay from './UserDisplay.vue';

    export default {
        name: 'user-display-list',
		extends: AsyncDisplayList,
		components:  {
			UserDisplay,
		},
        methods: {
            async getData() {
				return await this.sj.User.get(this.query).then(this.sj.content);
            },
		},
    }
</script>


<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'
	class='user-display-list'>
        <ul>
            <li
                v-for='user in data' 
                :key='user.id' 
                :display='user'
            >
				<user-display :p-data='user' v-bind='attrs' v-on='listeners'></user-display>
            </li>
        </ul>
    </async-switch>
</template>


<style lang='scss'>
	.user-display-list {
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