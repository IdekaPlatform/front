export const state = () => ({
  sidebar: false,
  pageTitle: 'Ideka',
  breadcrumbs: {}
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },

  breadcrumbs (state, breadcrumbs) {
    state.breadcrumbs = breadcrumbs;
  }
}

export const getters = {
  breadcrumbs: state => state.breadcrumbs
}
