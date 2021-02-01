<template>
  <div>
    <Header class="noprint" />
    <div class="heading noprint">Today's Orders</div>
    <div class="flex items-center">
      <button
        @click="printOut()"
        class="top-0 flex items-center justify-center noprint fab"
      >
        <PrinterIcon />
      </button>
      <button
        @click="refresh()"
        class="flex items-center justify-center noprint fab top-10"
      >
        <RefreshCwIcon />
      </button>
      <nuxt-link to="/orders/old">Old Orders</nuxt-link>
    </div>
    <div v-if="data">
      <div
        class="flex items-center justify-between p-2 text-gray-600 bg-yellow-200 noprint"
        v-if="myTodaysSummary"
      >
        <h2>{{ myTodaysSummary.count }}</h2>
        <div class="font-bold text-red-500">
          {{ myTodaysSummary.amount | currency(settings.currency_symbol) }}
        </div>
        <div>{{ myTodaysSummary.createdAt | date }}</div>
      </div>
      <ul class="flex flex-wrap">
        <li
          class="w-full p-4 rounded shadow-2xl lg:w-1/4 xl:w-1/5"
          v-for="(o, ix) in data"
          :key="ix"
        >
          {{ o._id.orderNo }}
          <h1 class="text-xl font-black text-red-500">
            QrNo: {{ o._id.address.address }}
          </h1>
          <p class="font-bold">
            {{ o._id.address.firstName }} {{ o._id.address.lastName }} ({{
              o._id.user.phone
            }})
          </p>
          <ul v-if="o.items">
            <ol class="flex flex-col" v-for="(i, ix) in o.items" :key="i._id">
              <div class="flex items-center justify-between">
                <div
                  class="flex items-center justify-center w-8 h-8 mr-2 font-bold text-center align-middle bg-gray-300 rounded-full shadow-xl"
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
              <select
                v-model="i.status"
                class="px-4"
                @change="save(o._id.id, i.pid, i.status)"
              >
                <option v-for="(s, ix) in orderStatuses" :key="ix">{{
                  s.status
                }}</option>
              </select>
            </ol>
          </ul>
          <!-- <h3 v-if="o.vendor" class="tracking-wide text-right">{{ o.vendor.restaurant }}</h3> -->
          <div class="text-xs text-right text-cyan-500">
            {{ o._id.createdAt | date }}
          </div>
        </li>
      </ul>
    </div>
    <StickyFooter />
    <!-- <nuxt-link to="/my/food/customers/old/" class="noprint">Old Customers</nuxt-link> -->
  </div>
</template>
<script>
import { PrinterIcon, RefreshCwIcon } from 'vue-feather-icons'
import { mapGetters } from 'vuex'
import { Header } from '~/../shared/components'
const StickyFooter = () => import('~/components/StickyFooter')
import myCustomers from '~/../shared/gql/order/myCustomers.gql'
import myTodaysSummary from '~/../shared/gql/order/myTodaysSummary.gql'
import updateOrder from '~/../shared/gql/order/updateOrder.gql'
import orderStatuses from '~/../shared/gql/settings/orderStatuses.gql'
import { infiniteScroll } from '~/../shared/mixins'

export default {
  middleware: 'isAuth',
  mixins: [infiniteScroll],
  data() {
    return {
      orderStatuses: [],
      myTodaysSummary: null,
      model: myCustomers,
      attr: 'myCustomers',
    }
  },
  async created() {
    this.orderStatuses = (
      await this.$apollo.query({ query: orderStatuses })
    ).data.orderStatuses
    this.refresh()
  },
  components: { Header, StickyFooter, PrinterIcon, RefreshCwIcon },
  computed: { ...mapGetters({ settings: 'settings' }) },
  methods: {
    async refresh() {
      this.getData()
      try {
        this.$store.commit('clearErr')
        this.myTodaysSummary = (
          await this.$apollo.query({
            query: myTodaysSummary,
            fetchPolicy: 'no-cache',
          })
        ).data.myTodaysSummary
      } catch (e) {
      } finally {
        this.$store.commit('busy', false)
      }
    },
    printOut() {
      if (process.client) {
        window.print()
      }
    },
    async save(id, pid, status) {
      try {
        this.$store.commit('clearErr')
        await this.$apollo.mutate({
          mutation: updateOrder,
          variables: { id, pid, status },
        })
        this.refresh()
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
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
