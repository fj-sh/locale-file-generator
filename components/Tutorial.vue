<!-- Please remove this file from your project -->
<template>
  <div>
    <textarea v-model="displayText"></textarea>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useTranslateApi } from '~/composables/useTranslateApi'

export default defineComponent({
  setup() {
    const { loadApi } = useTranslateApi()

    const displayText = ref('')

    const translate = async () => {
      const result = await loadApi("こんにちは", "ja", "en")
      console.log("result", result)
      displayText.value = result

    }

    translate()

    return {
      displayText
    }
  }
})

</script>
