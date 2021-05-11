import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#0076BA',
                title: '#00A096',
                accent:'#009edc',
                button: '#636363',
                error: '#b71c1c',
                success:'#008000'
            },
        },
    },
})
;
