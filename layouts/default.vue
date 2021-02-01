<template>
  <div style class="bg-gray-100 antialiased min-h-screen">
    <!-- <Header /> -->
    <!-- <Loading /> -->
    <!-- <ErrComponent /> -->
    <div class="mb-24">
      <nuxt />
    </div>
    <BackToTopDark />
  </div>
</template>
<script>
import { BackToTopDark, Loading } from '~/../shared/components/ui'
import { Error, Header } from '~/../shared/components'

export default {
  middleware: ['geo'],
  components: { Error, Header, BackToTopDark, Loading },
}
</script>
