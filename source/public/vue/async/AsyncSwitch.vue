<script>
    import emitRefresh from '../mixins/emitRefresh.mjs';

    import AsyncDelay from './AsyncDelay.vue';
    import AsyncLoading from './AsyncLoading.vue';
    import AsyncError from './AsyncError.vue';

    export default {
        //C used to switch markup depending on the state prop, wraps around Display markup (slot) and can be passed custom loading & error components. passes an error prop to the error component and propagates reload events from loading and error components to the parent display component

        name: 'async-switch',
        mixins: [emitRefresh],
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
	
	/* //R Thought Process
		//R
		// I don't want a wrapper component that switches display, loading, and error states in addition to the display component; because the async display getter function has to be defined inside the wrapper, that means that for every async component i need to write a new extended wrapper and display component, in addition to possible custom loading and error components.
		// I want to simply write the single async component extending from the BaseLoader and optional loading and error components extending from BaseLoading and BaseError, this can't happen because vue's dynamic components can only switch components and not templates (they cant switch the component itself for another).
		// I also dont want to have to pass every custom property down from the loader to the display component
		// Therefore a custom switch for templates is needed: vue's v-if directive works for this, however this would have to be repeated for every extended component.
		// So I made a template builder function that allows the writing of the main display template, and then optional loading or error components all in one component.



		//TODO the problem now is that to be able to use this method in the components extending from base-loading, ill need to import the sj module to be able to call it, (what if the base imports then provides a method to render?)

		//L this is what i need: https://stackoverflow.com/questions/50800945/vue-wrap-another-component-passing-props-and-events
		//L https://vuejs.org/v2/api/#vm-attrs, //! defined props aren't included in $attrs, but because they are 'known' they can just as easily be passed down
		//L https://vuejs.org/v2/api/#vm-listeners
		//L https://vuejs.org/v2/api/#inheritAttrs //! inheritAttrs = false will prevent non-prop attributes from being applied to the root element of the template (incase some other desired functionality is desired, like modifying them in the wrapper before they are re-attached), I dont think this is needed for this wrapper
		//! all these don't affect the class and style attributes
		//! v-bind= and v-on= (these don't have arguments) are used specifically for the $attr, and $listeners case - "When used without an argument, can be used to bind an object containing attribute name-value pairs."
		//L they're called 'transparent components', this might have some advanced info TODO: https://zendev.com/2018/05/31/transparent-wrapper-components-in-vue.html
		// as far as I understand that article, it details pulling props & listeners out of the list of ones passed to child components if there actually are some specific props needed for the wrapper component (and not needed in the child components) - 'semi-transparency'


		//TODO while this does solve passing stuff to child, it still requires making both the loader and the child
		// // i think the solution is to write a generic loader component, then have the display component have the data loading function, then use events up to the parent to communicate switching (which will also let the error, and loading components to communicate a retry)

		//L communication: https://alligator.io/vuejs/component-communication/
		//L best way to manage state//?: https://vuejs.org/v2/api/#model


		// display updates display value and switches to display comp
		// loading switches to loading comp
		// error updates error value and switches to error comp

		//TODO issue: if the display component loads the data, it needs to be initially loaded

		//TODO other issue: even if this all works, either different loaders will have to be created for each display component (re-introducing the two component issue) or there will have to be some slot system where the base-loader is referenced each time with the specific display, loader, and error components slotted in - which is also very verbose
		// // the only reason this sj.dynamicTemplate() function was created was to avoid having to repeat template markup (the v-if directives, or dynamic component stuff) for each descendant of the base-loader

		//? what is the issue with having a component that manages it's own display state? right... it was the repeated markup needed


		// I want to: easily write an async component that loads its own data and displays other components when its loading or errored, and I want to write the display markup in itself without having to repeat wrapper markup 
		// - but I cant avoid wrapper markup with out a dynamic template function (no) or a wrapper component (maybe)
		// - but then I have to figure out a way to use a wrapper component without making specific wrapper components, this requires the verbose markup (maybe)
		// like:
		// <loader>
		// 	<display component>
		// </loader>

		// display component can be the one to specify custom loader/error components because they will always be coupled to it
		// these display components will (probably) always have to be coupled to the loader wrapper, but it saves having to write a custom loader for each one (and might actually allow a static version of the display component), actually no, is it better to write the wrapper template in the display components or every time when they are used?

		// >>> so far the best idea seems to be use a wrapper that has slots, where custom display, loading, and error components can be passed into the slots
		//! using slots also completely avoids the property passing issue because the slot components are rendered in the parent's context


		// now, fall back is to use dynamic components and events - though this requires two components per,

		// other idea is to have the child in a slot emit a parent's event and listen to parent's event

		// ^ this is what i did, and it was all and great until i got to the pages where I used the loaders without their display components - all wrapped up in to one component (they load their own data) this actually was really good but required no wrappers (or multiple layers if using wrappers) and the ability to nest this dynamic data, I feel like ive come full circle and the sj.dynamicTemplate() is the best option again

		// however, I think there is another way - the main reason I used sj.dynamicTemplate() was to avoid repeating markup in the display template (if a component was to manage its own display state, each would have to repeat a conditional wrapper), what if the async-switch component was this conditional wrapper and the main display markup is filled into the default slot? (it minimizes this markup into one element, which is good because there needs to be a single root element anyways), the main hurdle is passing the custom components to it and switching to them

		sj.dynamicTemplate = function (display, loading, error) {
			//C use declared components if custom template is not defined, //! BaseLoader has(must) have defaults declared 
			if (!sj.isType(display, 'string'))	display = `<display-component :display='display'></display-component>`;
			if (!sj.isType(loading, 'string'))	loading = `<loading-component></loading-component>`;
			if (!sj.isType(error, 'string'))	error = `<error-component :error='error'></error-component>`;

			//C insert
			return `
				<div v-if='state === "display"'>
					${display}
				</div><div v-else-if='state === "loading"'>
					${loading}
				</div><div v-else-if='state === "error"'>
					${error}
				</div>
			`;
		}
	*/
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
        @refresh='emitRefresh'
    ></component>
    <component v-else-if='state === "error"'
        :is='ErrorComponent'
        @refresh='emitRefresh'
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
