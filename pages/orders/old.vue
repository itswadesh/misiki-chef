<template>
  <div>
    <Header class="noprint" />
    <div class="heading noprint">Old Orders</div>
    <div class="flex">
      <nuxt-link
        to="/orders"
        class="top-0 flex items-center justify-center noprint fab"
      >
        <ArrowLeftIcon />
      </nuxt-link>
      <button
        @click="refresh()"
        class="flex items-center justify-center noprint fab top-10"
      >
        <RefreshCwIcon />
      </button>
    </div>
    <div v-if="data">
      <!-- <div
        class="flex items-center justify-between p-2 text-gray-600 bg-yellow-200 noprint"
        v-if="myTodaysSummary"
      >
        <h2>{{ myTodaysSummary.count }}</h2>
        <div class="font-bold text-red-500">
          {{ myTodaysSummary.amount | currency(settings.currency_symbol) }}
        </div>
        <div>{{ myTodaysSummary.createdAt | date }}</div>
      </div> -->
      <ul class="flex flex-wrap">
        <li
          class="w-full p-4 rounded shadow-2xl lg:w-1/4 xl:w-1/5"
          v-for="(o, ix) in data"
          :key="ix"
        >
          {{ o.orderNo }}
          <h1 class="text-xl font-black text-red-500">
            QrNo: {{ o.address.address }}
          </h1>
          <p class="font-bold">
            {{ o.address.firstName }} {{ o.address.lastName }} ({{
              o.user.phone
            }})
          </p>
          <ul v-if="o.items">
            <ol class="flex flex-col" v-for="(i, ix) in o.items" :key="i.id">
              <div class="flex items-center justify-between">
                <div
                  class="
                    flex
                    items-center
                    justify-center
                    w-8
                    h-8
                    mr-2
                    font-bold
                    text-center
                    align-middle
                    bg-gray-300
                    rounded-full
                    shadow-xl
                  "
                >
                  {{ ix + 1 }}
                </div>
                <div class>
                  <div>{{ i.time }}</div>
                  <div class="text-2xl">{{ i.name }}</div>
                  <div>
                    {{ i.price | currency(settings.currency_symbol) }} *
                    {{ i.qty }} =
                    <span class="text-3xl font-bold">
                      {{
                        (i.price * i.qty) | currency(settings.currency_symbol)
                      }}
                    </span>
                  </div>
                </div>
              </div>
              <select v-model="i.status" class="px-4" disabled>
                <option v-for="(s, ix) in orderStatuses" :key="ix">
                  {{ s.status }}
                </option>
              </select>
            </ol>
          </ul>
          <!-- <h3 v-if="o.vendor" class="tracking-wide text-right">{{ o.vendor.store }}</h3> -->
          <div class="text-xs text-right text-cyan-500">
            {{ o.createdAt | date }}
          </div>
        </li>
      </ul>
    </div>
    <StickyFooter />
    <!-- <nuxt-link to="/my/food/customers/old/" class="noprint">Old Customers</nuxt-link> -->
  </div>
</template>
<script>
import { PrinterIcon, RefreshCwIcon, ArrowLeftIcon } from 'vue-feather-icons'
import { mapGetters } from 'vuex'
import { Header } from '~/shared/components'
const StickyFooter = () => import('~/components/StickyFooter')
import myCustomers from '~/gql/order/myCustomers.gql'
import orders from '~/gql/order/orders.gql'
import updateOrder from '~/gql/order/updateOrder.gql'
import orderStatuses from '~/gql/settings/orderStatuses.gql'
import { infiniteScroll } from '~/shared/mixins'

export default {
  middleware: 'isAuth',
  mixins: [infiniteScroll],
  data() {
    return {
      orderStatuses: [],
      model: orders,
      attr: 'orders',
    }
  },
  async created() {
    this.refresh()
  },
  components: {
    Header,
    StickyFooter,
    PrinterIcon,
    RefreshCwIcon,
    ArrowLeftIcon,
  },
  computed: { ...mapGetters({ settings: 'settings' }) },
  methods: {
    async refresh() {
      this.getData()
    },
    go(url) {
      this.$router.push(url)
    },
  },
}
</script>

<style scoped>
.heading {
  text-align: center;
  color: #fff;
  background: linear-gradient(87deg, #fb6340 0, #da1c5f 100%) !important;
  box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.175) !important;
  margin-bottom: 0.5rem;
  padding: 1rem 0;
  font-size: 2rem;
}
p {
  margin-bottom: 0.8rem !important;
}
.g {
  color: green;
}
.r {
  color: red;
}
.big {
  font-weight: 700;
  font-size: 2rem;
}
h1 {
  margin: 0px 0px 10px 0px;
}
ul > li {
  list-style: none;
  margin: 10px;
  padding: 10px;
  /* border-bottom: 1px solid grey; */
}
.card {
  padding: 1rem;
  margin: 1rem;
  -webkit-box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
  box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
  border-radius: 0.5rem;
  width: 330px;
}
.p-left {
  padding-left: 0px;
}
.font {
  padding-left: 1rem;
}
.seller {
  font-size: 1.4rem;
}
.customer {
  padding: 1rem;
  font-size: 1.2rem;
  color: blue;
  font-weight: 500;
}
.font {
  font-size: 0.7rem;
  padding-left: 0.5rem !important;
  font-weight: 900;
}
</style>
