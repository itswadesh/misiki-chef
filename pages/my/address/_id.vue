<template>
  <div>
    <Heading title="Add Address" />
    <AddressEdit :id="$route.params.id" />
  </div>
</template>
<script>
import { AddressEdit, Heading } from '~/../shared/components'

export default {
  components: { AddressEdit, Heading },
}
</script>
