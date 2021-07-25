<template>
  <div class="code">
    <span>
      <pre><code>
      {{ result }}
    </code></pre>
    </span>
  </div>
</template>
<script>
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
  }
})
</script>
<style scoped>
.code {
  position: relative;
  margin: 2em 0;
  padding: 0.5em 1em;
  border: solid 3px black;
  border-radius: 8px;
}

</style>
