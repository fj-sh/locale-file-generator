<template>
  <div>
    <text-field
      v-for="(item, index) in variableTexts"
      :key="index"
      :variable.sync="item.variable"
      :text.sync="item.text"
      :index="index"
      @variable-update="updateVariable"
      @text-update="updateText"
    />
    <button
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      @click="addTextField"
    >
      Add
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import TextField from '~/components/atoms/TextField.vue'
import { VariableText } from '~/types/variableText'
export default defineComponent({
  name: 'VariableTextGroup',
  components: {
    TextField
  },
  props: {
    variableTexts: {
      type: Array as PropType<VariableText[]>,
      required: true
    }
  },
  emits: ['update-variable', 'update-text', 'add-text-field'],
  setup (_props, { emit }) {
    const updateVariable = (index: number, value: string) => {
      emit('update-variable', index, value)
    }

    const updateText = (index: number, value: string) => {
      emit('update-text', index, value)
    }
    const addTextField = () => {
      emit('add-text-field')
    }

    return {
      updateVariable,
      updateText,
      addTextField
    }
  }
})
</script>
