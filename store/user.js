import Cookies from 'js-cookie'

export const state = () => ({
  token: null,
  refreshToken: null,
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

  setRefreshToken (state, token) {
    state.refreshToken = token
  },

  setUser (state, user) {
    if (user !== null) {
      user.organizations = []
      user.projects = []
    }
    state.user = user
  },

  setOrganizations (state, organizations) {
    state.user.organizations = organizations
  },

  addOrganization (state, organization) {
    state.user.organizations.push(organization)
  },

  setProjects (state, projects) {
    state.user.projects = projects
  },

  addProject (state, project) {
    state.user.projects.push(project);
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
  async storeToken ({ commit }, payload) {
    if (process.client) {
      Cookies.set('security_token', payload.token)
      Cookies.set('security_refresh_token', payload.refresh_token)
    }
    commit('setToken', payload.token)
    commit('setRefreshToken', payload.refresh_token)
    commit('api/addHeader', { name: 'Authorization', value: `Bearer ${payload.token}` }, { root: true })
  },

  async logout ({ commit }) {
    Cookies.remove('security_token')
    Cookies.remove('security_refresh_token')
    commit('setToken', null)
    commit('setRefreshToken', null)
    commit('setUser', null)
  }
}

export const getters = {
  screen: state => state.screen,

  user: state => state.user
}
