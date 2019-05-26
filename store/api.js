import config from '~/config'

export const state = () => ({
  url: config.apiUrl,
  port: config.apiPort,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const mutations = {
  logout: state => {

  },

  addHeader: (state, payload) => {
    state.headers[payload.name] = payload.value;
  }
}

export const getters = {
  headers: state => state.headers,

  url: state => (process.server || state.port === null) ? state.url : `${state.url}:${state.port}`,

  urlWithPort: state => (state.port !== null) ? `${state.url}:${state.port}` : state.url
}
