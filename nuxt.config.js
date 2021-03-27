import { resolve } from 'path'
import { I18N } from './config/lang'
import { firebaseConfig } from './config/firebase'
const config = require(resolve(process.cwd(), './shared/nuxtConfig'))
import {
  HTTP_ENDPOINT,
  ONESIGNAL_APP_ID,
  WWW_URL,
  head,
  dev,
  tailwindcss,
  PORT,
} from './shared/config/index'
// delete config.fontawesome
delete config.buildModules
config.plugins.push({ src: '~/shared/plugins/map.js', ssr: false })
config.plugins.push({ src: '~/shared/plugins/timer.js', ssr: false })
config.plugins.push({ src: '~/shared/plugins/slick.js', ssr: false })
// config.plugins.push({ src: '~/shared/plugins/drift.js', ssr: false })
// config.plugins.push(
//   { src: '~/shared/plugins/vue-simple-photoswipe.js', ssr: false },
// )
config.server = {
  host: '0.0.0.0',
  port: PORT,
}
config.buildModules = [
  '@nuxtjs/apollo',
  '@nuxtjs/robots',
  // '@nuxtjs/onesignal',
  '@nuxtjs/pwa',
  '@nuxtjs/tailwindcss',
  'vue-social-sharing/nuxt',
  '@nuxtjs/toast',
  ['nuxt-i18n', I18N],
  ['@nuxtjs/firebase', firebaseConfig],
]
config.modules = [
  '@nuxtjs/proxy',
  'cookie-universal-nuxt',
  '@nuxtjs/google-analytics',
]
config.pageTransition = 'slide-bottom'
config.toast = {
  singleton: true,
}
config.pwa = {
  manifest: {
    name: 'Misiki Chef',
    theme_color: '#85D715',
  },
}

config.apollo = {
  clientConfigs: {
    default: {
      httpEndpoint: `${WWW_URL}/graphql`,
      browserHttpEndpoint: '/graphql',
      // wsEndpoint: server.replace('http', 'ws') + '/graphql',
    },
  },
  defaultOptions: {
    $query: {
      loadingKey: 'loading',
      fetchPolicy: 'cache-and-network',
    },
  },
}

// config.apollo.clientConfigs.default.httpEndpoint = server
// config.oneSignal = {
//   init: {
//     appId: ONESIGNAL_APP_ID,
//     allowLocalhostAsSecureOrigin: true,
//     welcomeNotification: {
//       disable: true,
//     },
//   },
// }
export default config
