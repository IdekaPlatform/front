import path from 'path';

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Ideka',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Ideka is a community platform helping projects and people to evolve' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:url', name: 'og:url', content: process.env.WEBSITE_URL },
      { hid: 'og:title', name: 'og:title', content: 'Ideka' },
      { hid: 'og:site_name', name: 'og:site_name', content: 'Ideka' },
      { hid: 'og:locale', name: 'og:locale', content: 'fr' },
      { hid: 'og:image', name: 'og:image', content: `${process.env.WEBSITE_URL}/images/logo/circle_logo_500.png` },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'Ideka' },
      { hid: 'twitter:description', name: 'twitter:description', content: 'Ideka is a community platform helping projects and people to evolve' },
      { hid: 'twitter:image', name: 'twitter:image', content: `${process.env.WEBSITE_URL}/images/logo/circle_logo_500.png` },
      { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: 'Logo' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/images/logo/circle_logo_64.png' },
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato|Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css' }
    ]
  },

  router: {
    middleware: ['auth']
  },

  plugins: [
    '~/plugins/api.js',
    { src: '~/plugins/ckeditor.js', ssr: false },
    '~/plugins/i18n.js',
    '~/plugins/icons.js',
    '~/plugins/lib.js'
  ],

  devModules: [
    '@nuxtjs/vuetify'
  ],
  
  vuetify: {
    /* module options */
    theme: {
      themes: {
        light: {
          bossanova: '#5B315E',
          lavender: '#B487B8',
          amethyst: '#B14FC5',
          cold: '#CFC4C5'
        }
      }
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    extend (config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }

      config.resolve.modules.push(path.resolve(__dirname, 'assets'));
    }
  }
}
