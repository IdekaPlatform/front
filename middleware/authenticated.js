export default function ({ isServer, store, req, redirect }) {
// If nuxt generate, pass this middleware
  window.onNuxtReady(() => {
    if (!localStorage.loggedIn) {
      return redirect('/')
    }
  })
}
