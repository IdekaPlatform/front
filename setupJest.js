const Vue = require('vue');
const Vuetify = require('vuetify');
//setupJest.js or similar file
global.fetch = require('jest-fetch-mock');

Vue.use(Vuetify);

process.env.API_URL = 'http://ideka_api';
process.env.TESTING = true;