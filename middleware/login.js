export default function ({ redirect }) {
  // If nuxt generate, pass this middleware
  if (process.browser) {
    if (localStorage.loggedIn) {
      return redirect('/home')
    }
  }
}
