<script>
    import BaseDisplay from './BaseDisplay.vue';
    import BaseLoading from './BaseLoading.vue';
    import BaseError from './BaseError.vue';

    import sj from '../js/global-client.mjs';

    export default {
        //C loads a resource and switches to one of it's handler components based on the result, it hands them the display and/or error data from the result
        name: 'base-loader', //! this is optional (for templates the name is inferred), but providing this manually allows it's name to show up in debugging
        components: {
            //TODO make actual default components
            //TODO consider making a delay component (where no loading graphics are shown)
            DisplayComponent: BaseDisplay,
            LoadingComponent: BaseLoading,
            ErrorComponent: BaseError,
        },
        props: {
            query: [Object, Array],
        },
        data() {
            return {
                state: 'loading',
                delay: 500,
                timeout: Infinity,

                display: null,
                error: null, //R keep error separate from display because we don't want error data to overwrite existing display if there is a refresh error
            };
        },
        created() {
            this.getDisplay().then(this.handleSuccess, this.handleError);
        },
        methods: {
            async getDisplay() {
                return null;
            },
            handleSuccess(resolved) {
                //console.log('DISPLAY RESOLVED: ', resolved);
                this.display = resolved;
                this.state = 'display';
            },
            handleError(rejected) {
                console.error('ERROR REJECTED: ', rejected);
                this.error = rejected;
                this.state = 'error';
            },
        },
        template: sj.dynamicTemplate(),
    }
</script>


<style scoped lang='scss'>
</style>