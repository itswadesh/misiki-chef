<template>
  <div>
    <div class="min-h-screen">
      <Heading title="Welcome to misiki" />
      <a href="https://bit.ly/2TM8RI4" target="_blank">Chef Details Form</a>
      <DashboardCard
        heading="Today's Orders"
        link="/orders"
        class="w-full"
        :query="require('~/../shared/gql/order/myTodaysSummary.gql')"
        model="myTodaysSummary"
      ></DashboardCard>
      <DashboardCard
        heading="Total Orders"
        link="/orders"
        class="w-full"
        :query="require('~/../shared/gql/order/mySummary.gql')"
        model="mySummary"
      ></DashboardCard>
      <ReviewSummary
        heading="Total Orders"
        link="/orders"
        class="w-full"
        :query="require('~/../shared/gql/order/mySummary.gql')"
        model="mySummary"
      ></ReviewSummary>
    </div>
    <StickyFooter />
  </div>
</template>

<script>
import { Heading, DashboardCard, ReviewSummary } from '~/../shared/components'
import StickyFooter from '~/components/StickyFooter'

export default {
  middleware: ['isAuth'],
  components: {
    Heading,
    StickyFooter,
    DashboardCard,
    ReviewSummary,
  },
  async asyncData() {
    let orders = [],
      status = 'Received',
      todayTotal = null,
      todaySummary = null
    try {
      orders = await $axios.$get('api/food-orders/pending')
      todayTotal = await $axios.$get('api/food-orders/my/today')
      todaySummary = await $axios.$get('api/food-orders/todays-summary')
    } catch (e) {}
    return { orders: orders.data, todayTotal, todaySummary }
  },
}
</script>
