<template>
  <div>
    <Heading title="Instructions" />

    <StickyFooter />
  </div>
</template>

<script>
const StickyFooter = () => import('~/components/StickyFooter')
import { Heading } from '~/shared/components'

export default {
  components: { StickyFooter, Heading },
}
</script>

<style></style>
