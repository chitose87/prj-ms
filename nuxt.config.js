require('dotenv').config();

export default {
  mode: 'spa',
  // mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Spreadsheet PM UI',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    script: [
      {src: 'https://apis.google.com/js/api.js'},
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.6/gsap.min.js'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      // {
      //   rel: 'stylesheet',
      //   href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
      //   integrity: "sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN",
      //   crossorigin: "anonymous"
      // }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/app.scss'
    // '~/assets/style/common.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: "~/plugins/index.ts", ssr: false},
    {src: "~/plugins/gapi.ts", ssr: false}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'bootstrap-vue/nuxt',
    // {css: false},
    '@nuxtjs/style-resources',
    // '@nuxtjs/pwa',
  ],
  // _override.scssで既に読み込んでいるのでここはfalseにする
  bootstrapVue: {
    bootstrapCSS: false, // or `css`
    bootstrapVueCSS: false // or `bvCSS`
    ,icons: true
  },
  styleResources: {
    scss: [
      '~/assets/scss/_variables.scss',
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
    babel: {
      plugins: [
        ["@babel/plugin-proposal-decorators", {legacy: true}],
        ["@babel/plugin-proposal-class-properties", {loose: true}]
      ]
    }
  },
  // generate: {
  //   dir: "public"
  // },
  env: process.env
}
