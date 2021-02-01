<template>
  <div class="bg-gray-100 antialiased min-h-screen">
    <!-- <Loading /> -->
    <Search />
    <div class="mt-16 mb-12">
      <nuxt />
    </div>
    <StickyFooter />
    <BackToTopDark />
  </div>
</template>
<script>
import { BackToTopDark, Loading } from '~/../shared/components/ui'
import { Error, Search } from '~/../shared/components'
import StickyFooter from '~/components/StickyFooter'

export default {
  middleware: ['geo'],
  components: { Error, Search, StickyFooter, BackToTopDark, Loading },
}
</script>
