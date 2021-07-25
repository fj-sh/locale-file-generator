<template>
  <div>
    <pre><code class="language-js">
      {{ result }}
</code></pre>
  </div>
</template>
<script>
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Result',
  props: {
    result: {
      type: String,
      required: true
    }
  },
  setup () {
    const prismAll = () => {
      Prism.highlightAll()
    }
    prismAll()
  }
})
</script>
