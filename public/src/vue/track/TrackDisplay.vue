<script>
	import AsyncDisplay from '../async/AsyncDisplay.vue';
	
    export default {
        name: 'track-display',
        extends: AsyncDisplay,
        methods: {
            async getData() {
				let list = await this.sj.getTrack(this.query).then(this.sj.returnContent);
				let temp = this.sj.one(list);
				console.log('TRACK DATA: ', temp);
				return temp;
            },
            async play() {
            },
        },
    }
</script>

<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
		<div id='container'>
			<button id='play-button' @click='play()'>Play</button>

			<div id='content'>
				<p id='artists'>{{data.artists.join(', ')}}</p>
				<p id='name'>{{data.name}}</p>
			</div>
		</div>
		<!-- <button @click='open(data.id)'>Info</button> -->
    </async-switch>
</template>

<style scoped lang='scss'>
	$height: 50px;
	#container {
		display: flex;
		height: $height;
		justify-content: space-between;
	}
	#play-button {
		width: $height;
		height: 100%;
	}
	#content {
		width: auto;
		height: 100%;

		display: flex;
    	flex-direction: column;
    	justify-content: space-between;
	}
	#artists {
		font-size: 18px;
	}
	#name {
		font-size: 24px;
	}
</style>