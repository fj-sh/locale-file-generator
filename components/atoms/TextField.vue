<template>
  <div class="flex flex-row -mx-3  md:mt-5 md:mb-5">
    <div class="flex-none px-3">
      <label class="text-gray-700" for="grid-key">
        Variable
      </label>
      <input
        id="grid-key"
        v-model="variable"
        class="w-80 border bg-white rounded px-3 py-2 form-select mt-1 block focus:bg-white"
        type="text"
        placeholder="Variable"
        @keyup="onVariableChange"
      >
    </div>
    <div class="flex-grow">
      <label class="text-gray-700" for="grid-text">
        Text
      </label>
      <input
        id="grid-text"
        v-model="text"
        class="w-4/5 mb-2 border bg-white rounded px-3 py-2 form-select mt-1 block focus:bg-white"
        type="text"
        placeholder="Text"
        @keyup="onTextChange"
      >
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TextField',
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  emits: ['variable-update', 'text-update'],
  setup (props, { emit }) {
    const variable = ref('')
    const onVariableChange = () => {
      emit('variable-update', props.index, variable.value)
    }

    const text = ref('')
    const onTextChange = () => {
      emit('text-update', props.index, text.value)
    }

    return {
      variable,
      text,
      onTextChange,
      onVariableChange
    }
  }
})
</script>
