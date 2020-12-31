<script>
import AsyncDisplayList from '../async/AsyncDisplayList.vue';
import UserDisplay from './UserDisplay.vue';

import {
	User,
} from '../../../entities/index.js';


export default {
	name: 'user-display-list',
	extends: AsyncDisplayList,
	components:  {
		UserDisplay,
	},
	data() {
		return {
		// OVERWRITES
			Entity: User,
		};
	},
};
</script>


<template>
    <async-switch
		:state='state'
		:error='error'
		@refresh='refresh'
		:loading-component='$options.components.LoadingComponent'
		:error-component='$options.components.ErrorComponent'
		v-slot='slotProps'
	class='user-display-list'>
        <ul>
            <li
                v-for='user in content'
                :key='user.id'
                :display='user'
            >
				<user-display :p-content='user' v-bind='attrs'></user-display>
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
