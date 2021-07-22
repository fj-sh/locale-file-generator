<template>
  <div>
    <country-flag country="jp" size="big" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CountryFlag from 'vue-country-flag'

export default defineComponent({
  components: {
    CountryFlag
  },
  setup () {

  }
})

</script>
