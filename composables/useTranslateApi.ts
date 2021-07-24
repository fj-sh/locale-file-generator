import axios from 'axios'
import { VariableText } from '~/types/variableText'

export const useTranslateApi = () => {
  const url = 'https://script.google.com/macros/s/AKfycbyyVH7mh40xCJnaJhNVI7lrCnRnXca343jv2uDZZnaL4pD7jMEOyQ16i_jXNf93beZ-/exec'

  const loadApi = (text: string, source: string, target: string) => {
    return axios.get(url, {
      params: {
        text,
        source,
        target
      }
    }).then((response) => {
      return response.data.text
    })
  }

  const translate = async (variableTexts: VariableText[]) => {
    const translatedTexts = await variableTexts.map((item, _index) => {
      console.log('item:', item)
      return loadApi(item.text, 'ja', 'en')
    })
    console.log('translate', translatedTexts)
  }

  return { loadApi, translate }
}
