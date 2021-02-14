<script>
import {useRouter} from 'vue-router';
//TODO Deleting a song that was playing will correctly delete it. However the UI wont show it (might have to do this with two songs). (Add 2 new tracks, play bottom one, delete both, notice that the first one wont delete).

export default {
	name: 'playlist-item',
	props: {
		playlist: {
			type: Object,
			required: true,
		},
	},
	setup() {
		const router = useRouter();

		async function open(id) {
			//TODO Extract
			router.push(`/playlist/${id}`);
		}

		return {
			open,
		};
	},
};
</script>

<template>
	<div class='playlist-item'>
		<div id='left'>
			<!-- <button id='play-button' @click='play()'>Play</button> -->

			<div id='content'>
				<p id='name'>{{playlist.name}}</p>
			</div>
		</div>
		<div id='right'>
			<button @click='open(playlist.id)'>Open</button>
		</div>
	</div>
</template>


<style lang='scss'>
	$playlist-height: 50px;

	.playlist-item {
		height: $playlist-height;
		background-color: $list-item-color;
		display: flex;
		#left, #right {
			display: inline-flex;
		}
		#left {
			height: 100%;
			justify-content: flex-start;
			flex-grow: 1;
		}
		#right {
			height: 100%;
			justify-content: flex-end;
		}
		#content {
			height: 100%;

			display: flex;
			flex-direction: column;
			justify-content: space-between;

			#name {
				font-size: 24px;
				padding: 0;
				margin: 0;
			}
		}

	}
</style>
