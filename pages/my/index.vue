<template>
  <div>
    <AccountMenu class="md:hidden" />
  </div>
</template>

<script>
import AccountMenu from '~/components/AccountMenu'
import { Button } from '~/shared/components/ui'
export default {
  components: { AccountMenu, Button },
  middleware: ['isAuth'],
  layout: 'account',
}
</script>
