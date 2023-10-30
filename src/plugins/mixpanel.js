import mixpanel from 'mixpanel-browser'

export default {
    install() {
        mixpanel.init('19205d9adba2a7c43c7ff7bdede4df75', {
            debug: false,
            persistence: 'localStorage'
        })
    },
};
