<template>
  <div class="text-center bg-gray-100">
    <div class="flex items-center justify-start mx-2">
      <nuxt-link to="/my/orders" class="absolute flex-1 font-bold text-left">
        <ArrowLeftIcon class="mr-1 text-gray-600" />
      </nuxt-link>
      <h1 class="flex-1 p-2 text-xl font-semibold text-center bg-white">
        Order
      </h1>
    </div>
    <h1 class="text-center" v-if="!order">Order not found</h1>
    <div v-else class="flex flex-col pt-8 text-center">
      <div
        class="w-full py-5 text-sm tracking-widest text-center text-black bg-white"
      >
        <p class="font-semibold">Order {{ order.orderNo }}</p>
        <Span class="flex flex-wrap justify-center text-xs text-gray-600">
          Placed on {{ order.createdAt | date }}
          <li class="ml-2 list-disc">
            {{ order.amount.total | currency(settings.currency_symbol) }} for 1
            item
          </li>
        </Span>
      </div>
      <!-- <p
        v-if="order.payment.method == 'COD'"
        class="p-1 text-center text-white bg-green-500 rounded"
      >
        
      </p>-->
      <div class="flex justify-center" v-if="order.payment.method == 'COD'">
        <button
          class="px-8 py-2 my-3 font-semibold text-white bg-orange-500 rounded"
        >
          Please pay
          {{ order.amount.total | currency(settings.currency_symbol) }} to the
          delivery agent
        </button>
      </div>
      <div class="m-3 border rounded shadow">
        <div class="px-3 py-2 bg-gray-100">
          <div class="font-bold text-left">
            {{ order.address.firstName }} {{ order.address.lastName }}
          </div>
          <div class="flex">
            <img v-lazy="`img/contact-us.svg`" class="w-4 h-4 my-1 mr-1" />
            <div class="text-sm font-medium text-left text-gray-500">
              {{ order.address.address }}, {{ order.address.city }},
              {{ order.address.city }}, {{ order.address.state }} -
              {{ order.address.zip }}
            </div>
            <!-- <div
              class="px-4 py-1 mx-3 text-xs font-semibold text-center text-white bg-orange-600 rounded-full"
            >
              free Delivery
            </div>-->
          </div>
        </div>
        <div
          class="flex py-2 bg-white border-b"
          v-for="i in order.items"
          :key="i._id"
        >
          <img v-lazy="i.img" class="w-12 h-12 m-2" />
          <div class="flex flex-col p-2 text-left">
            <div class="font-bold">{{ i.name }}</div>
            <div class="flex justify-between">
              <nuxt-link
                :to="`/restaurant/${i.vendor_id}`"
                class="mr-2 text-sm text-gray-500"
                >{{ i.vendor_name }}</nuxt-link
              >
              <div class="text-sm font-semibold text-gray-800">
                {{ i.price | currency(settings.currency_symbol) }} * {{ i.qty }}
              </div>
            </div>
          </div>
        </div>
        <nuxt-link
          to="/search/"
          class="block p-2 text-sm font-semibold text-left text-red-600 bg-white border-b rounded"
          >Add more items +</nuxt-link
        >
      </div>
      <div class="p-3 text-base bg-white">
        <div class="price-breakup">
          <div>Subtotal</div>
          <div>
            {{ order.amount.subtotal | currency(settings.currency_symbol) }}
          </div>
        </div>
        <div class="price-breakup">
          <div>Tax & fees</div>
          <div>{{ order.amount.tax | currency(settings.currency_symbol) }}</div>
        </div>
        <div class="price-breakup">
          <div>Offer</div>
          <div>
            {{ order.amount.offer | currency(settings.currency_symbol) }}
          </div>
        </div>
        <div class="price-breakup">
          <div>Delivery</div>
          <div>
            {{ order.amount.shipping | currency(settings.currency_symbol) }}
          </div>
        </div>
        <hr />
        <div class="text-xl font-bold price-breakup">
          <div>Total</div>
          <div>
            {{ order.amount.total | currency(settings.currency_symbol) }}
          </div>
        </div>
      </div>
      <div
        class="p-4 mx-2 my-4 text-sm font-semibold text-gray-700 border border-green-500 rounded text-black-400"
      >
        <span class="text-xs text-semibold">PAYMENT MODE</span>
        <br />
        <div class="flex justify-between mt-1 text-xs">
          <div>{{ order.payment.method }}</div>
          <div>
            {{ order.amount.total | currency(settings.currency_symbol) }}
          </div>
        </div>
      </div>
      <div>
        <HereMap
          ref="map"
          lat="18.732447"
          lng="82.829516"
          width="100"
          height="300px"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { HereMap } from '~/../shared/components'
import { ArrowLeftIcon } from 'vue-feather-icons'
export default {
  async asyncData({ params, query, route, redirect, $axios, store }) {
    let order = null,
      err = null
    // if (store.getters["cart/getTotal"] <= 0) {
    //   redirect("/");
    // }
    try {
      order = await $axios.$get(`api/food-orders/my/${route.params.id}`)
      err = null
    } catch (e) {
      order = null
      if (e && e.response && e.response.data) {
        err = e.response.data
      } else if (e && e.response) {
        err = e.response
      } else {
        err = e
      }
      console.log('err...', `${err}`)
    }
    return { order }
  },
  computed: { ...mapGetters({ settings: 'settings' }) },
  mounted() {
    this.$refs.map.route('18.732447,82.829516', '18.708187,82.852198')
  },
  components: {
    HereMap,
    ArrowLeftIcon,
  },
}
</script>
