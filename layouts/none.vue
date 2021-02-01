<template>
  <div class="antialiased min-h-screen">
    <!-- <Loading /> -->
    <!-- <ErrComponent /> -->
    <nuxt />
  </div>
</template>

<script>
import { Loading } from '~/../shared/components/ui'

export default {
  components: { Loading },
}
</script>
