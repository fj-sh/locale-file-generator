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

      <variable-text-group
        :variable-texts="variableTexts"
        @update-variable="updateVariable"
        @update-text="updateText"
        @add-text-field="addTextField"
      />
      <result />
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useTranslateApi } from '~/composables/useTranslateApi'
import SelectForm from '~/components/atoms/SelectForm.vue'
import Result from '~/components/atoms/Result.vue'
import VariableTextGroup from '~/components/molecules/VariableTextGroup.vue'
import { VariableText } from '~/types/variableText'

export default defineComponent({
  components: {
    SelectForm,
    VariableTextGroup,
    Result
  },
  setup () {
    const { translate } = useTranslateApi()

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

    const variableTexts = ref<Array<VariableText>>([
      {
        variable: '',
        text: ''
      }
    ])

    const updateVariable = (index, value) => {
      if (variableTexts.value[index]) {
        variableTexts.value[index].variable = value
      }
    }

    const updateText = (index, value) => {
      if (variableTexts.value[index]) {
        variableTexts.value[index].text = value
      }
    }

    const addTextField = () => {
      variableTexts.value.push({
        variable: '',
        text: ''
      })
      // translate(variableTexts.value)
    }

    const result = ref('')

    return {
      sourceLanguage,
      sourceLanguages,
      selectSourceLangage,
      targetFormat,
      targetFormats,
      selectTargetFormat,
      variableTexts,
      updateVariable,
      updateText,
      addTextField,
      displayText,
      result
    }
  }
})

</script>
