<template>
  <div class="h-full text-center">
    <img class="w-full h-84 object-cover" v-lazy="'/onboarding.png'" alt />
    <h1 class="text-2xl font-bold mt-6 mx-6 leading-tight">
      Order from cloud kitchens near you
    </h1>
    <div class="text-gray-600">Ready to see top chefs to order?</div>
    <nuxt-link
      to="/change-location"
      class="inline-block mt-4 py-3 px-6 primary uppercase rounded shadow-lg"
      >SETUP YOUR LOCATION</nuxt-link
    >
  </div>
</template>

<script>
export default {
  layout: 'none',
}
</script>

<style>
.h-50 {
  height: 50%;
}
</style>
