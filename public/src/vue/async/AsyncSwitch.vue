<script>
    import reload from '../mixins/reload.mjs';

    import AsyncDelay from './AsyncDelay.vue';
    import AsyncLoading from './AsyncLoading.vue';
    import AsyncError from './AsyncError.vue';

    export default {
        //C used to switch markup depending on the state prop, wraps around Display markup (slot) and can be passed custom loading & error components. passes an error prop to the error component and propagates reload events from loading and error components to the parent display component

        name: 'async-switch',
        mixins: [reload],
        props: {
            state: String,
            error: [Object, Error], //TODO will warn if not Object or Error, any way to catch stray data types?
            DelayComponent: {
                type: Object,
                default() {
                    return AsyncDelay;
                },
            },
            LoadingComponent: {
                type: Object,
                default() {
                    return AsyncLoading;
                },
            },
            ErrorComponent: {
                type: Object,
                default() {
                    return AsyncError;
                },
            },
        },
    }
</script>


<template>
    <!-- //C v-if is used here because all parts can be destroyed and created at will because they (the slotted display markup & accessory loading & error components) don't process or store any information -->

    <div v-if='state === "display"'>
        <slot>
            <h2>No Slotted Display Content</h2>
            <!-- TODO put an error component here as default -->
        </slot>
    </div>
    <component v-else-if='state === "delay"'
        :is='DelayComponent'
    ></component>
    <component v-else-if='state === "loading"'
        :is='LoadingComponent'
        @reload='reload'
    ></component>
    <component v-else-if='state === "error"'
        :is='ErrorComponent'
        @reload='reload'
        :error='error'
    ></component>

    <!-- old 
        //L rather than v-if, v-show keeps components alive, but cannot use v-else  https://vuejs.org/v2/guide/conditional.html#v-show 

        <div>
            <slot v-show="state === 'display'">
                <default-display></default-display>
            </slot>

            <slot v-show="state === 'loading'"  name='loading'>
                <default-loading></default-loading>
            </slot>

            <slot v-show="state === 'error'"    name='error'>
                <default-error></default-error>
            </slot>
        </div> 
    -->
</template>




<style scoped lang='scss'>
</style>