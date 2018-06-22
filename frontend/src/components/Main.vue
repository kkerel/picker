<template>
  <div>

    <div id="main_section">
      <ui-header/>
      <ui-aside/>
      <router-view/>
      <ui-footer/>
    </div>

  </div>
</template>

<script>

import Header from '@/components/layout/Header'
import Aside from '@/components/layout/Aside'
import Footer from '@/components/layout/Footer'

export default {
  name: 'Main',
  components: {
    'ui-header': Header,
    'ui-aside': Aside,
    'ui-footer': Footer
  },
  created () {
    // console.log('created Main', this.$router.currentRoute.path)
    // this.$router.push({ name: 'Account' })
  }
}
</script>

<style lang="scss">

</style>
