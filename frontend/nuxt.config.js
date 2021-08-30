export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Contact Form',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'COVID Contact Tracing form',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Powered by E-Society',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['ant-design-vue/dist/antd.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/antd-ui', '@/plugins/axios'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['cookie-universal-nuxt', { alias: 'cookies' }],
  ],

  //axios
  axios: {
    baseURL: process.env.BASEURL || "https://testform.e-society.ie/api/"||"https://localhost/api/" || 'https://form.e-society.ie/api/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  middleware: ['auth', 'adminAuth', 'vendorAuth','schoolAuth'],
}
