export const state = () => ({
  sidebar: false,
  pageTitle: 'Ideka',
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },

  setPageTitle (state, title) {
    state.pageTitle = title
  }
}

export const getters = {
  pageTitle: state => state.pageTitle
}
