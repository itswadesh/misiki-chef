<template>
  <div
    class="mt-2 shadow-lg w-full bg-gray-100 border-t overflow-x-auto fixed bottom-0 z-10 text-gray-600"
  >
    <div class="flex justify-around items-center">
      <nuxt-link to="/search" class="category-item" active-class="text-primary">
        <SearchIcon />
        <span class="text-xs">Dishes</span>
      </nuxt-link>
      <nuxt-link to="/my" class="category-item" active-class="text-primary">
        <UserIcon />
        <span class="text-xs">Account</span>
      </nuxt-link>
      <nuxt-link to="/orders" class="category-item" active-class="text-primary">
        <TagIcon />
        <span class="text-xs">Orders</span>
      </nuxt-link>
      <nuxt-link
        to="/reviews"
        class="category-item"
        active-class="text-primary"
      >
        <ShoppingCartIcon />
        <span class="text-xs">Reviews</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import {
  SearchIcon,
  UserIcon,
  TagIcon,
  ShoppingCartIcon,
} from 'vue-feather-icons'
export default {
  components: {
    SearchIcon,
    UserIcon,
    TagIcon,
    ShoppingCartIcon,
  },
}
</script>

<style></style>
