<template>
  <div>
    <pre><code class="language-js">
      const posts = await client.getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        'fields.slug': slug,
      })
</code></pre>
  </div>
</template>
<script>
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Result',
  setup () {
    const prismAll = () => {
      Prism.highlightAll()
    }
    prismAll()
  }
})
</script>
