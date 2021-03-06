import axios, { AxiosResponse } from 'axios'
import { ref } from '@nuxtjs/composition-api'
import { VariableText } from '~/types/variableText'
import { TranslatedItem } from '~/types/translatedItem'
import { TargetLanguage } from '~/types/targetLangage'

export const useTranslateApi = () => {
  const url = 'https://script.google.com/macros/s/AKfycbyyVH7mh40xCJnaJhNVI7lrCnRnXca343jv2uDZZnaL4pD7jMEOyQ16i_jXNf93beZ-/exec'

  const loadApi = async (text: string, source: string, target: string, variable: string) => {
    const translatedItem: TranslatedItem = await axios.get(url, {
      params: {
        text,
        source,
        target
      }
    }).then((response) => {
      return {
        variable,
        translatedText: response.data.text,
        target
      }
    })
    return translatedItem
  }

  const translatedItems = ref<Array<TranslatedItem>>([])

  const translate = (variableTexts: VariableText[], source: string, target: string) => {
    const promises: Array< Promise<TranslatedItem>> = []
    variableTexts.forEach((item, _index) => {
      if (source === target) return

      const promise = loadApi(item.text, source, target, item.variable)
      promises.push(promise)
    })
    Promise.all(promises).then((items) => {
      items.forEach((item) => {
        translatedItems.value.push(item)
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  const convertedResult = ref('export const messages = {\n')

  const initConvert = (variableTexts: VariableText[], sourceLanguage: string) => {
    convertedResult.value = 'export const messages = {\n'
    convertedResult.value += `\t${sourceLanguage}: {\n`
    variableTexts.forEach((variableText) => {
      convertedResult.value += `\t\t${variableText.variable}: "${variableText.text}",\n`
    })
    convertedResult.value += '\t},\n'
  }

  const targetLanguages = ref<Array<TargetLanguage>>([
    {
      name: 'ja',
      checked: true
    },
    {
      name: 'en',
      checked: true
    },
    {
      name: 'zh-CN', // 中国語（簡体）
      checked: true
    },
    {
      name: 'zh-TW', // 中国語（繁体）
      checked: true
    },
    {
      name: 'ko',
      checked: true
    },
    {
      name: 'es',
      checked: false
    },
    {
      name: 'de',
      checked: false
    }
  ])

  const convert = (sourceLanguage: string) => {
    targetLanguages.value.forEach((targetLanguage) => {
      if (!targetLanguage.checked) return
      if (sourceLanguage !== targetLanguage.name) {
        if (targetLanguage.name.includes('-')) {
          convertedResult.value += `\t'${targetLanguage.name}': {\n`
        } else {
          convertedResult.value += `\t${targetLanguage.name}: {\n`
        }
      }
      translatedItems.value.forEach((translatedItem, _index) => {
        if (sourceLanguage !== targetLanguage.name && targetLanguage.name === translatedItem.target) {
          convertedResult.value += `\t\t${translatedItem.variable}: "${translatedItem.translatedText}",\n`
        }
      })
      if (sourceLanguage !== targetLanguage.name) {
        convertedResult.value += '\t},\n'
      }
    })
    convertedResult.value += '\n}'
    console.log('convertedResult:\n', convertedResult.value)
  }

  const initialize = () => {
    convertedResult.value = ''
    translatedItems.value = []
  }

  return { loadApi, translate, convert, convertedResult, initConvert, initialize, targetLanguages }
}
