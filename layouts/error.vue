<template>
  <div class="flex flex-col justify-center items-center text-lg antialiased">
    <!-- <Loading /> -->
    <Error />
    <h1 v-if="error.statusCode === 404">Not found</h1>
    <pre v-else>{{ error }}</pre>
    &nbsp;
    <nuxt-link to="/" class="primary text-2xl px-4 rounded"
      >Home page</nuxt-link
    >
  </div>
</template>

<script>
import { Error } from '~/shared/components'
import { Loading } from '~/shared/components/ui'

export default {
  props: ['error'],
  components: { Error, Loading },
  head() {
    return this.$nuxtI18nHead()
  },
}
</script>
