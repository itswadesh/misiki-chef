<template>
  <div class="mx-2 text-center bg-gray-100 flex1">
    <div class="flex items-center justify-start mx-2">
      <nuxt-link to="/my" class="absolute flex-1 font-bold text-left">
        <ArrowLeftIcon class="mr-1 text-gray-600" />
      </nuxt-link>
      <h1 class="flex-1 p-2 text-xl font-semibold text-center bg-white">
        Orders
      </h1>
    </div>
    <nuxt-link :to="`/my/orders/${o._id}`" v-for="o in orders" :key="o._id">
      <div class="w-full my-4 bg-white rounded shadow hover:shadow-xl">
        <div class="p-3 bg-gray-100 rounded">
          <h1>Order # {{ o.orderNo }}</h1>
          <p class="text-gray-800">
            Date:
            <span class="text-xs">{{ o.createdAt | date }}</span>
          </p>
        </div>
        <hr />
        <div
          v-for="(i, ix) in o.items"
          :key="i._id"
          class="flex flex-wrap justify-between p-3"
          :class="{ 'border-t': ix != 0 }"
        >
          <div class="flex items-center">
            <div>
              <img
                v-lazy="i.img"
                class="w-12 h-12 mr-2 bg-blue-500 rounded-full"
                alt
              />
            </div>
            <div>
              <div class="text-sm font-semibold">{{ i.name }}</div>
              <div class="text-xs text-gray-500">
                {{ i.qty }} *
                {{ i.price | currency(settings.currency_symbol) }} =
                {{ (i.qty * i.price) | currency(settings.currency_symbol) }}
              </div>
            </div>
          </div>
          <!-- <div class="p-2 ml-3 shadow">
          <img
            v-lazy="i.img"
            class="w-12 h-12"
            alt="cart"
          />
          </div>-->
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ArrowLeftIcon } from 'vue-feather-icons'
export default {
  layout: 'account',
  components: { ArrowLeftIcon },
  async asyncData({ params, query, route, redirect, $axios, store }) {
    let orders = [],
      err = null
    if (store.getters['cart/getTotal'] <= 0) {
      redirect('/')
    }
    try {
      const o = await $axios.$get(`api/food-orders/my`)
      orders = o.data
      err = null
    } catch (e) {
      orders = []
      if (e && e.response && e.response.data) {
        err = e.response.data
      } else if (e && e.response) {
        err = e.response
      } else {
        err = e
      }
      console.log('err...', `${err}`)
    }
    return { orders }
  },
  computed: { ...mapGetters({ settings: 'settings' }) },
}
</script>
