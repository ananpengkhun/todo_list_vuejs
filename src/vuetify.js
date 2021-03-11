import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#0095a8',
        secondary: '#26c6da',
        accent: '#6ff9ff',
        error: '#b71c1c',
      },
    },
  },
})

export default vuetify