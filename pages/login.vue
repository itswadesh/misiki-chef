<template>
  <div>
    <Login />
  </div>
</template>

<script>
import { location } from '~/../shared/mixins'
import { Login } from '~/../shared/components'
export default {
  layout: 'none',
  mixins: [location],
  components: { Login },
  head() {
    return {
      title: 'Login to Misiki',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Login to Misiki',
        },
        {
          hid: 'og:description',
          name: 'Description',
          property: 'og:description',
          content: 'Login to Misiki',
        },

        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: 'Checkout with the products in your cart',
        },
        // Twitter
        {
          name: 'twitter:title',
          content: 'Checkout with the products in your cart',
        },
        {
          name: 'twitter:description',
          content: 'Login to Misiki',
        },
      ],
    }
  },
}
</script>
