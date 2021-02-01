<template>
  <div>
    <div class="mt-24 text-center margin-auto width-1/2">
      <img
        v-lazy="`/thankyou.jpg`"
        class="object-cover w-1/2 h-40 m-auto lg:w-1/5"
        alt
      />
      <p class="py-3 text-lg font-bold">Thank You</p>
      <p class="py-3 text-sm text-gray-500">
        We have received your request and will get back to you in 24-48 hours
      </p>
      <button class="px-2 py-1 mt-2 text-white bg-pink-500">
        CONTINUE SHOPPING
      </button>
    </div>
  </div>
</template>

<script>
import { Checkbox } from '~/../shared/components/ui'
export default {
  components: { Checkbox },
}
</script>
