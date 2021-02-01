<template>
  <div>
    <!-- <div class="flex justify-between px-2 py-4 bg-white">
      <input
        type="text"
        class="w-full text-xl border rounded-full"
        name="search"
      />
      <img
        v-lazy="`img/banners.svg`"
        class="w-8 h-8 ml-2 bg-gray-300 rounded-full"
      />
    </div>
    <div class="flex justify-between">
      <h1 class="px-2 font-bold">Popular of the week</h1>
      <h2 class="px-2 text-sm font-medium">Show all (>)</h2>
    </div>-->
    <div class="relative flex px-1 py-2 m-2 bg-white rounded shadow">
      <nuxt-link :to="`/foods/${p.id}`" class="p-2">
        <img v-lazy="p.img" class="object-cover w-32 h-20 rounded" />
      </nuxt-link>
      <div class="w-full my-2" v-if="p.vendor">
        <nuxt-link v-if="p.vendor" :to="`/search/${p.vendor.info.restaurant}`">
          <img
            v-lazy="`/${p.vendor.avatar}`"
            class="absolute top-0 right-0 object-cover w-8 h-8 mt-2 mr-2 rounded-full"
          />
        </nuxt-link>
        <nuxt-link :to="`/foods/${p.id}`" class="font-bold tracking-wide">
          {{ p.name }}
        </nuxt-link>
        <div class="flex justify-between">
          <div class="text-sm tracking-widest">
            <span v-if="p.stock > 0" class="font-bold text-red-500">
              <ArrowRightCircleIcon /> <span v-if="p.stock < 6">Only</span>
              {{ p.stock }} left
            </span>
          </div>
          <div class="text-xl font-black text-gray-700">
            {{ p.price | currency(settings.currency_symbol) }}
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <Ratingcircle :rating="p.ratings" class="m-review" />
            <!-- <fa icon="star h-3 w-3 my-2" /> -->
            <!-- <span class="mx-1 text-sm font-medium text-black">4.6</!-->
            <!-- <div class="text-sm font-medium text-gray-500">(rating/review)</div> -->
          </div>
          <div
            v-if="p.stock > 0"
            class="px-3 text-xs text-white bg-green-500 rounded-full"
          >
            Active
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowRightCircleIcon } from 'vue-feather-icons'
import { mapGetters } from 'vuex'
import { Ratingcircle } from '~/shared/components/ui'
export default {
  props: ['p'],
  methods: {},
  computed: { ...mapGetters({ settings: 'settings' }) },
  components: { Ratingcircle, ArrowRightCircleIcon },
}
</script>

<style></style>
