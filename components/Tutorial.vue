<!-- Please remove this file from your project -->
<template>
  <main class="container mx-auto">
    <textarea v-model="displayText" />
    <div class="content-center">
      <select-language>
        <template #label>
          Source Language:
        </template>
      </select-language>
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useTranslateApi } from '~/composables/useTranslateApi'
import SelectLanguage from '~/components/molecules/SelectLanguage.vue'

export default defineComponent({
  components: {
    SelectLanguage
  },
  setup () {
    const { loadApi } = useTranslateApi()

    const source = ref('')
    const displayText = ref('')

    const translate = async () => {
      const result = await loadApi('こんにちは', 'ja', 'en')
      console.log('result', result)
      displayText.value = result
    }

    translate()

    return {
      source,
      displayText
    }
  }
})

</script>
