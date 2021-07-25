<!-- Please remove this file from your project -->
<template>
  <div>
    <div v-if="isLoading">
      <loading />
    </div>
    <main class="container mx-auto">
      loading: {{ isLoading }}

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

        <div>
          <button
            class="w-1/2 my-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            @click="onClickGenerate"
          >
            Generate
          </button>
        </div>
        <result :result="convertedResult" />
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'
import { useTranslateApi } from '~/composables/useTranslateApi'
import SelectForm from '~/components/atoms/SelectForm.vue'
import Result from '~/components/atoms/Result.vue'
import VariableTextGroup from '~/components/molecules/VariableTextGroup.vue'
import { VariableText } from '~/types/variableText'
import Loading from '~/components/atoms/Loading.vue'

export default defineComponent({
  components: {
    SelectForm,
    VariableTextGroup,
    Result,
    Loading
  },
  setup () {
    const { translate, convert, convertedResult } = useTranslateApi()

    const displayText = ref('')
    const sourceLanguage = ref('ja')
    const sourceLanguages = [
      { label: 'Japanese', value: 'ja' },
      { label: 'English', value: 'en' },
      { label: 'Korean', value: 'ko' },
      { label: 'Simplified Chinese', value: 'zh-CN' },
      { label: 'Traditional Chinese', value: 'zh-TW' }
    ]

    const selectSourceLangage = (value: string) => {
      sourceLanguage.value = value
    }

    const targetFormat = ref('language-js')
    const targetFormats = [
      { label: 'JavaScript', value: 'language-js' },
      { label: 'YAML', value: 'language-yaml' }
    ]

    const selectTargetFormat = (value: string) => {
      targetFormat.value = value
    }

    const variableTexts = ref<Array<VariableText>>([
      {
        variable: '',
        text: ''
      }
    ])

    const updateVariable = (index: number, value: string) => {
      if (variableTexts.value[index]) {
        variableTexts.value[index].variable = value
      }
    }

    const updateText = (index: number, value: string) => {
      if (variableTexts.value[index]) {
        variableTexts.value[index].text = value
      }
    }

    const addTextField = () => {
      variableTexts.value.push({
        variable: '',
        text: ''
      })
    }

    const isLoading = ref<boolean>(false)
    const setIsLoading = (loading: boolean) => {
      isLoading.value = loading
    }

    const onClickGenerate = async () => {
      translate(variableTexts.value)

      setIsLoading(true)
      convert()
      await new Promise(resolve => setTimeout(resolve, 3000))
      setIsLoading(false)
    }

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
      onClickGenerate,
      convertedResult,
      isLoading
    }
  }
})

</script>
