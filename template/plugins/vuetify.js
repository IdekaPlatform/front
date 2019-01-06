import Vue from 'vue'
{{#alacarte}}
import Vuetify, {
  VApp, // required
  VNavigationDrawer,
  VFooter,
  VToolbar
} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VToolbar
  },
  directives: {
    Ripple
  }{{#theme}},
  theme: {
    primary: '#9c27b0',
    accent: '#ce93d8',
    secondary: '#424242',
    info: '#0D47A1',
    warning: '#ffb300',
    error: '#B71C1C',
    success: '#2E7D32'
  }{{/theme}}
})
{{else}}
import Vuetify from 'vuetify'

Vue.use(Vuetify{{#theme}}, { theme: {
  primary: '#9c27b0',
  accent: '#ce93d8',
  secondary: '#424242',
  info: '#0D47A1',
  warning: '#ffb300',
  error: '#B71C1C',
  success: '#2E7D32'
}}{{/theme}})
{{/alacarte}}
