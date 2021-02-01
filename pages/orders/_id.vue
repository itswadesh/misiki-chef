<template>
  <div>
    <Header />
    <center class="title">
      <strong>Order Details</strong>
    </center>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { Product, Header } from '~/shared/components'
export default {
  data() {
    return {
      loading: false,
    }
  },
  components: { Product, Header },
}
</script>
