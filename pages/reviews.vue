<template>
  <div>
    <Heading title="Reviews" />

    <StickyFooter />
  </div>
</template>

<script>
const StickyFooter = () => import('~/components/StickyFooter')
import { Heading } from '~/shared/components'
import reviews from '~/gql/product/reviews.gql'

export default {
  components: { StickyFooter, Heading },
  // data() {
  //   return {
  //     reviews: null
  //   }
  // },
  // async mounted() {
  //   try {
  //     this.reviews = (
  //       await this.$apollo.query({
  //         query: reviews,
  //       })
  //     ).data.reviews
  //   } catch (e) {
  //     this.$store.commit('setErr', e)
  //   } finally {
  //     this.$store.commit('busy', false)
  //   }
  // }
}
</script>

<style></style>
