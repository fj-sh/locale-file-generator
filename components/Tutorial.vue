<!-- Please remove this file from your project -->
<template>
  <main class="container mx-auto">
    <textarea v-model="displayText" />
    <div class="content-center">
      <select-language>
        <template #label>
          Source Language
        </template>
      </select-language>
      <select-format>
        <template #label>
          Format
        </template>
      </select-format>
      <text-field />
      <result />
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useTranslateApi } from '~/composables/useTranslateApi'
import SelectLanguage from '~/components/molecules/SelectLanguage.vue'
import SelectFormat from '~/components/molecules/SelectFormat.vue'
import Result from '~/components/atoms/Result.vue'
import TextField from '~/components/atoms/TextField.vue'

export default defineComponent({
  components: {
    SelectLanguage,
    SelectFormat,
    TextField,
    Result
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

    const result = ref('')

    return {
      source,
      displayText,
      result
    }
  }
})

</script>
