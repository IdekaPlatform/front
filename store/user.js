import Cookies from 'js-cookie'

export const state = () => ({
  token: null,
  user: null,
  locales: ['en', 'fr'],
  locale: 'fr',
  navigationData: {},
  screen: {
    width: 0,
    height: 0
  }
})

export const mutations = {
  screenDimensions (state, dimensions) {
    state.screen.width = dimensions.width
    state.screen.height = dimensions.height
  },

  setToken (state, token) {
    state.token = token
  },

  setUser (state, user) {
    state.user = user
  },

  setLocale (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },

  setNavigationData (state, data) {
    state.navigationData = data
  }
}

export const actions = {
  async storeToken ({ commit }, token) {
    if (process.client) {
      Cookies.set('security_token', token)
    }
    commit('setToken', token)
    commit('api/addHeader', { name: 'Authorization', value: `Bearer ${token}` }, { root: true })
  },

  async logout ({ commit }) {
    Cookies.remove('security_token')
    commit('setToken', null)
    commit('setUser', null)
  }
}

export const getters = {
  screen: state => state.screen
}
