<template>
  <div>
    <h1 class="text-center" v-if="!order">Order not found</h1>
    <div class="flex flex-wrap justify-between bg-gray-200 shadow" v-else>
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
      <div class="lg:w-16 xs:w-0"></div>
      <div class="p-2 mt-5 xs:w-full lg:w-2/4">
        <div class="flex flex-wrap w-full mt-5 mb-5 text-sm">
          <div class="w-1/2">
            <span class="text-gray-700">Shipment 1 of 1</span>
            <br />
            <span class="text-gray-600">Arrives by Sep 21</span>
          </div>
          <div class="w-1/2">
            <span class="text-gray-700">Total</span>
            <br />
            <span class="text-gray-600"
              >{{ order.amount.total | currency(settings.currency_symbol) }} for
              1 item</span
            >
          </div>
        </div>
        <p
          v-if="order.payment.method == 'COD'"
          class="p-1 text-center text-white bg-green-500 rounded"
        >
          Please pay
          {{ order.amount.total | currency(settings.currency_symbol) }} to the
          delivery agent
        </p>
        <div
          v-for="i in order.items"
          :key="i._id"
          class="flex justify-between p-5 py-1 py-8 mt-2 bg-white border-b border-gray-300 rounded"
        >
          <div>
            <img class="w-32 lg:rounded xs:rounded-b-none" v-lazy="i.img" alt />
          </div>
          <div class="right-0 lg:w-4/5 xs:9/12">
            <div class="pl-4 font-hairline">
              <p class="text-black">{{ i.name }}</p>
              <div class="flex">
                <p class="text-gray-500">
                  <span>Size:</span>
                  {{ i.size }}
                </p>
                <span
                  class="inline-block w-2 h-2 m-2 bg-gray-300 rounded-full"
                ></span>
              </div>
              <div class="relative">
                <span class="text-2xl font-bold text-black">
                  {{ i.price | currency(settings.currency_symbol) }}
                </span>
              </div>
              <div v-if="order.status == 'Cancelled'">
                <div class="flex rnd-mnt">
                  <div class="h-4">
                    <img
                      v-lazy="`/return.svg`"
                      class="w-6 p-2 mr-2 bg-blue-500 rounded-full"
                      alt
                    />
                  </div>
                  <div class="text-sm" style="margin-top: 2px;">
                    Cancelled on {{ order.date | date }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full px-3 mt-10 mb-8 lg:w-1/4 lg:pr-20">
        <div
          class="relative flex flex-wrap justify-between w-full pb-2 text-sm font-semibold tracking-widest"
        >
          SHIPPING ADDRESS
        </div>
        <div
          class="p-4 text-sm leading-loose text-gray-700 bg-white rounded shadow"
        >
          <div>{{ order.address.firstName }} {{ order.address.lastName }}</div>
          <div>{{ order.address.address }}</div>
          <div>{{ order.address.city }}</div>
          <div>{{ order.address.state }} {{ order.address.zip }}</div>
        </div>

        <p
          class="mt-4 text-sm font-normal font-semibold tracking-widest text-black"
        >
          PAYMENT SUMMERY
        </p>
        <div
          class="right-0 p-4 pb-3 mt-2 text-sm leading-loose bg-white rounded shadow"
        >
          <div class="text-gray-700 border-b border-gray-300">
            <div class="flex justify-between mt-1">
              <div>Total item price</div>
              <div>
                {{ order.amount.subtotal | currency(settings.currency_symbol) }}
              </div>
            </div>
            <div
              class="flex justify-between mt-1"
              v-if="order.amount.discount > 0"
            >
              <div>Item discount</div>
              <div>
                -{{
                  order.amount.discount | currency(settings.currency_symbol)
                }}
              </div>
            </div>
            <div class="flex justify-between mt-1">
              <div>Shipping fee</div>
              <div>
                {{ order.amount.shipping | currency(settings.currency_symbol) }}
              </div>
            </div>
            <div class="flex justify-between mt-2 font-bold">
              <div>Total</div>
              <div>
                {{ order.amount.total | currency(settings.currency_symbol) }}
              </div>
            </div>
          </div>
          <div class="my-2 text-sm font-semibold text-gray-700 text-black-400">
            <span class="text-xs text-semibold">PAYMENT MODE</span>
            <br />
            <div class="flex justify-between mt-1 text-xs">
              <div>Cash on delivery</div>
              <div>
                {{ order.amount.total | currency(settings.currency_symbol) }}
              </div>
            </div>
            <!-- <div class="flex justify-center">
              <button class="px-12 py-1 mt-2 ml-2 text-center bg-gray-300 rounded-full focus:outline-none">₹689 due</button>
            </div>-->
          </div>
        </div>
        <div
          class="flex-no-wrap justify-center p-2 mt-3 text-sm text-center text-gray-700 bg-white border-b border-gray-200 rounded shadow"
        >
          <div>
            <img v-lazy="`/help.png`" class="m-auto" alt />
          </div>
          <div>Need help with this order?</div>
          <br />
          <div>
            <nuxt-link to="/help" class="text-pink-500"
              >Visit our help center</nuxt-link
            >
          </div>
        </div>
      </div>
      <div class="w-8"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  async asyncData({ params, query, route, redirect, $axios, store }) {
    let order = null,
      err = null
    if (store.getters['cart/getTotal'] <= 0) {
      redirect('/')
    }
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
}
</script>

<style scoped>
.hr-line {
  border-bottom: 1px solid lightgray;
}
.fa-truck {
  transform: scaleX(-1);
}
.bb {
  border-bottom: 1px dashed lightgray;
}
.fa-truck,
.fa-undo,
.fa-shield {
  font-size: 2rem;
}
</style>
