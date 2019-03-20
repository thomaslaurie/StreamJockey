export default {
    methods: {
        reload() {
            //! must use kebab-case for event names 
            //L https://vuejs.org/v2/guide/components-custom-events.html#Event-Names
            this.$emit('reload');
        },
    },
};