import axios from "axios";


export const useTranslateApi = () => {
  const url = 'https://script.google.com/macros/s/AKfycbyyVH7mh40xCJnaJhNVI7lrCnRnXca343jv2uDZZnaL4pD7jMEOyQ16i_jXNf93beZ-/exec'


  const loadApi = async (text: string, source: string, target: string) => {
    const result = await axios.get(url, {
      params: {
        text: text,
        source: source,
        target: target,
      }
    }).then((response) => {
      response.data.text
      console.log("response.data", response.data.text)
      return response.data.text
    })
    console.log("loadApi return",result)
    return result
  }
  
  

  return { loadApi }
  
}

