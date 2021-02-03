import { resolve } from 'path'
import * as config from './shared/nuxtConfig'
let { HTTP_ENDPOINT, dev } = require(resolve(process.cwd(), './shared/config'))
const server = dev ? 'http://localhost:8887' : 'https://chef.misiki.in'
config.pwa = {
  manifest: {
    name: 'Misiki Chef',
    theme_color: '#85D715',
  },
}
config.ssr = false

config.apollo = {
  // watchLoading: '../shared/plugins/apollo-watch-loading-handler.js',
  // errorHandler: './plugins/apollo-error-handler.js',
  clientConfigs: {
    default: {
      httpEndpoint: server + '/graphql',
      wsEndpoint: HTTP_ENDPOINT.replace('http', 'ws') + '/graphql',
    },
  },
  defaultOptions: {
    $query: {
      loadingKey: 'loading',
      fetchPolicy: 'no-cache',
    },
  },
}
export default config
