<template>
  <div>
    <!-- <Banner /> -->
    <div class="container relative">
      <!-- <Categories /> -->
      <div
        v-if="!user.verified"
        class="px-8 py-8 text-xl text-center text-secondary"
      >
        Waiting for verification by admin
      </div>
      <div
        v-else
        class="flex flex-wrap"
        v-infinite-scroll="loadMore"
        :infinite-scroll-distance="3"
        :infinite-scroll-immediate-check="true"
      >
        <nuxt-link class="fixed top-0 right-0 z-10 mt-16 fab" to="/foods/new">
          <PlusIcon />
        </nuxt-link>
        <div class="w-full" v-for="p in data" :key="p._id">
          <ListCard :p="p" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PlusIcon } from 'vue-feather-icons'
import ListCard from '~/components/ListCard'
import {
  Heading,
  // Banner,
  // Product,
  // Categories
} from '~/shared/components'
// import { Loading } from '~/shared/components/ui'
import { query, infiniteScroll } from '~/shared/mixins'
import myProducts from '~/gql/product/myProducts.gql'
import { mapGetters } from 'vuex'

export default {
  middleware: 'isAuth',
  layout: 'search',
  mixins: [infiniteScroll],
  computed: {
    ...mapGetters({ user: 'auth/user' }),
  },
  data() {
    return {
      model: myProducts,
      attr: 'myProducts',
    }
  },
  mounted() {
    this.getData() // Creates server rendering issue unless placed here
  },
  components: {
    Heading,
    ListCard,
    PlusIcon,
    // Banner,
    // Categories,
    // Product,
    // Loading
  },
}
</script>
