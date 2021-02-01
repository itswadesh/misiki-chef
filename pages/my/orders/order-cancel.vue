<template>
  <div style="background: #f5f5f5;">
    <!-- mobile -->
    <div
      class="flex justify-between block w-full text-xs font-semibold border-b-2 border-gray-300 lg:hidden"
    >
      <div
        @click="step = 1"
        class="flex-1 py-4 text-center bg-white"
        :class="{ 'text-pink-500 border-b border-pink-500': step == 1 }"
      >
        Select
      </div>
      <div
        @click="step = 2"
        class="flex-1 py-4 bg-white"
        :class="{ 'text-pink-500 border-b border-pink-500': step == 2 }"
      >
        <div class="flex justify-between">
          <div>
            <ChevronRightIcon class="text-gray-500" aria-hidden="true" />
          </div>
          <div class="text-gray-500">Reason</div>
          <div>
            <ChevronRightIcon class="text-gray-500" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div
        class="flex-1 py-4 text-center text-gray-500 bg-white"
        :class="{ 'text-pink-500 border-b border-pink-500': step == 3 }"
      >
        Confirm
      </div>
    </div>
    <!-- mobile ends -->
    <!-- desktop starts -->
    <div class="flex w-full m-auto lg:w-4/5 lg:border lg:border-gray-300">
      <!-- select div starts -->
      <div class="flex-1" :class="{ 'mask hidden lg:block': step !== 1 }">
        <div
          @click="step = 1"
          class="hidden py-4 text-center bg-white lg:block"
          :class="{ 'text-pink-500 border-b border-pink-500': step == 1 }"
        >
          Select
        </div>
        <div class="w-full">
          <div
            class="px-6 py-4 text-sm font-semibold text-gray-700 bg-white border-b border-gray-300"
          >
            Select items for cancellation
          </div>
          <div class="flex justify-between p-5 py-4 bg-white rounded">
            <div>
              <Checkbox></Checkbox>
            </div>
            <div>
              <img
                class="w-16 lg:rounded xs:rounded-b-none"
                v-lazy="`/cart-product.jpg`"
                alt
              />
            </div>
            <div class="lg:w-4/5 xs:9/12">
              <div class="pl-4 text-sm font-hairline text-gray-500">
                <div class="text-gray-700">Stylish Green Floral Print</div>
                <div class="flex">
                  <div>
                    <span>Size:</span>
                    3-4 years
                  </div>
                </div>
                <div class="flex justify-between mt-2 text-xs">
                  <div>
                    <div>
                      <div class="font-semibold text-gray-700">Cancel Qty</div>
                      <select
                        class="w-full text-left border border-gray-400 rounded focus:outline-none"
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                      </select>
                    </div>
                  </div>
                  <div class="font-semibold text-gray-700">
                    Refund
                    <br />
                    <div class="font-hairline text-green-500">₹0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="fixed bottom-0 w-full bg-white lg:relative">
            <div
              class="flex justify-between px-2 py-4 text-xs font-semibold text-black bg-white shadow"
            >
              <div>1 item selected</div>
              <div>₹0</div>
            </div>
            <div>
              <button
                @click="step = 2"
                class="w-full px-6 py-2 mr-2 text-sm font-bold text-white rounded primary"
              >
                Proceed to reason
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- select div ends -->
      <!-- reason div starts -->
      <div
        class="flex-1 text-center bg-white lg:block"
        :class="{ 'mask hidden lg:block': step !== 2 }"
      >
        <div class="bg-white">
          <div class="hidden lg:block">
            <div
              class="flex justify-between py-4"
              :class="{ 'text-pink-500 border-b border-pink-500': step == 2 }"
            >
              <div>
                <ChevronRightIcon aria-hidden="true" />
              </div>
              <div class>Reason</div>
              <div>
                <ChevronRightIcon aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
        <div class="border-r border-gray-300">
          <div
            class="px-10 py-3 text-sm text-left text-gray-600 border-b border-gray-300"
          >
            Why are you cancelling these items?
          </div>
          <div class="text-left">
            <ul class="pl-4 text-xs text-gray-600">
              <li><Radio />Need to change delivery address</li>
              <li><Radio />Need to change size</li>
              <li><Radio />Promo code not applied</li>
              <li><Radio />Ordered by mistake</li>
              <li><Radio />Shipment is delayed</li>
              <li><Radio />Waiting time is too long</li>
              <li><Radio />others</li>
              <li><Radio />Found cheaper alternative somewhere</li>
              <li class="li-last"><Radio />Price too high</li>
            </ul>
          </div>
          <div class="fixed bottom-0 z-50 w-full bg-white lg:relative">
            <button
              @click="step = 3"
              class="w-full px-6 py-2 mr-2 text-sm font-bold text-white rounded primary"
            >
              Proceed to refund
            </button>
          </div>
        </div>
      </div>
      <!-- reason div ends -->
      <!-- confirm div starts -->
      <div
        class="flex-1 bg-white"
        :class="{ 'mask hidden lg:block': step !== 3 }"
      >
        <div
          class="hidden py-4 text-center bg-white lg:block"
          :class="{ 'text-pink-500 border-b border-pink-500': step == 3 }"
        >
          Confirm
        </div>
        <div>
          <div class="px-6 py-3 text-sm text-gray-600 border-b border-gray-300">
            You are cancelling 1 item
          </div>
          <div
            class="px-6 py-3 mt-2 text-xs text-gray-600 border-b border-gray-300"
          >
            <div class="font-semibold">No refund applicable</div>
            <div>
              Cash on delivery was the payment method chosen from this order
            </div>
          </div>
          <div class="fixed bottom-0 w-full bg-white lg:relative">
            <button
              @click="cancelOrder"
              class="w-full px-6 py-2 mr-2 text-sm font-bold text-white rounded primary"
            >
              Confirm Cancellation
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- confirm div ends -->
  </div>
</template>

<script>
import { Checkbox, Radio } from '~/../shared/components/ui'
import { ChevronRightIcon } from 'vue-feather-icons'
export default {
  components: { Checkbox, Radio, ChevronRightIcon },
  data() {
    return {
      step: 1,
    }
  },
  methods: {
    cancelOrder() {},
  },
}
</script>

<style scoped>
ul li {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid lightgrey;
}
.li-last {
  margin-top: 0.8rem;
  margin-bottom: 0rem;
  padding-bottom: 0.4rem;
  border-bottom: 0px solid lightgrey;
}
</style>
