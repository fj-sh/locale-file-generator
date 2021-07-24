<!-- Please remove this file from your project -->
<template>
  <main class="container mx-auto">
    <div class="content-center">
      <select-form :default-item="sourceLanguage" :items="sourceLanguages" @select-item="selectSourceLangage">
        <template #label>
          Source Language
        </template>
      </select-form>

      <select-form :default-item="targetFormat" :items="targetFormats" @select-item="selectTargetFormat">
        <template #label>
          Target Format
        </template>
      </select-form>

      <key-text-group />
      <result />
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useTranslateApi } from '~/composables/useTranslateApi'
import SelectForm from '~/components/atoms/SelectForm.vue'
import Result from '~/components/atoms/Result.vue'
import KeyTextGroup from '~/components/molecules/KeyTextGroup.vue'

export default defineComponent({
  components: {
    SelectForm,
    KeyTextGroup,
    Result
  },
  setup () {
    const { loadApi } = useTranslateApi()

    const displayText = ref('')
    const sourceLanguage = ref('ja')
    const sourceLanguages = [
      { label: 'Japanese', value: 'ja' },
      { label: 'English', value: 'en' },
      { label: 'Korean', value: 'ko' },
      { label: 'Simplified Chinese', value: 'zh-CN' },
      { label: 'Traditional Chinese', value: 'zh-TW' }
    ]

    const selectSourceLangage = (value) => {
      sourceLanguage.value = value
    }

    const targetFormat = ref('language-js')
    const targetFormats = [
      { label: 'JavaScript', value: 'language-js' },
      { label: 'YAML', value: 'language-yaml' }
    ]

    const selectTargetFormat = (value) => {
      targetFormat.value = value
    }

    const translate = async () => {
      const result = await loadApi('こんにちは', 'ja', 'en')
      console.log('result', result)
      displayText.value = result
    }

    translate()

    const result = ref('')

    return {
      sourceLanguage,
      sourceLanguages,
      selectSourceLangage,
      targetFormat,
      targetFormats,
      selectTargetFormat,
      displayText,
      result
    }
  }
})

</script>
