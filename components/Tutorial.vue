<!-- Please remove this file from your project -->
<template>
  <div>
    <div v-if="isLoading">
      <loading />
    </div>
    <main class="container mx-auto">
      <h1 class="text-2xl  font-semibold my-5">
        i18nのロケールファイルを自動的に作るツール
      </h1>
      <p>i18nのロケールファイルを複数言語まとめて翻訳します。複数言語をGoogle翻訳で翻訳してコピペするのが面倒な人のためのツールです。</p>
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
        <checkbox :items="targetLanguages" @item-checked="targetLanguageChecked" />
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
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useTranslateApi } from '~/composables/useTranslateApi'
import SelectForm from '~/components/atoms/SelectForm.vue'
import Result from '~/components/atoms/Result.vue'
import VariableTextGroup from '~/components/molecules/VariableTextGroup.vue'
import { VariableText } from '~/types/variableText'
import Loading from '~/components/atoms/Loading.vue'
import { TargetLanguage } from '~/types/targetLangage'
import Checkbox from '~/components/atoms/Checkbox.vue'

export default defineComponent({
  components: {
    SelectForm,
    VariableTextGroup,
    Result,
    Loading,
    Checkbox
  },
  setup () {
    const { translate, convert, convertedResult, initConvert, initialize, targetLanguages } = useTranslateApi()

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
      { label: 'JavaScript', value: 'language-js' }
    ]
    const selectTargetFormat = (value: string) => {
      targetFormat.value = value
    }

    /**
     * 変数とテキスト名。変数が key で テキストが翻訳元の文字列となる。
     */
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

    const targetLanguageChecked = (index: number) => {
      targetLanguages.value[index].checked = !targetLanguages.value[index].checked
    }

    const onClickGenerate = async () => {
      initialize()
      setIsLoading(true)
      initConvert(variableTexts.value, sourceLanguage.value)
      targetLanguages.value.forEach((targetLanguage) => {
        if (targetLanguage.checked && sourceLanguage.value !== targetLanguage.name) {
          translate(variableTexts.value, sourceLanguage.value, targetLanguage.name)
        }
      })
      await new Promise(resolve => setTimeout(resolve, 6000))
      convert(sourceLanguage.value)
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
      isLoading,
      targetLanguages,
      targetLanguageChecked
    }
  }
})

</script>
