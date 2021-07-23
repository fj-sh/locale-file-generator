<template>
  <div class="mb-6">
    <textarea class="w-full h-24 px-2 pt-2 border-b-2 border-blue-800 bg-blue-900 text-white" placeholder="Result" :value="value" @change="changeValue" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TextArea',
  props: {
    result: {
      type: String,
      required: true
    }
  },
  setup (_props, { emit }) {
    const changeValue = (e: Event) => {
      if (e.target) {
        emit('update:result', (e.target as HTMLInputElement).value)
      }
    }

    return {
      changeValue
    }
  }

})
</script>
