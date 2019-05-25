import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookF, faTwitter, faMastodon, faLinkedin, faInstagram, faDiscord, faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFacebookF, faTwitter, faMastodon, faLinkedin, faInstagram, faDiscord, faGithub, faGitlab)

Vue.component('font-awesome-icon', FontAwesomeIcon)
