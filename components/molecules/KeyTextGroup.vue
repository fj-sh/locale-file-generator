<template>
  <div>
    <text-field
      v-for="(item, index) in keyTexts"
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
import { defineComponent, ref } from '@nuxtjs/composition-api'
import TextField from '~/components/atoms/TextField.vue'
import { VariableText } from '~/types/variableText'
export default defineComponent({
  name: 'KeyTextGroup',
  components: {
    TextField
  },
  setup (_props) {
    const keyTexts = ref<Array<VariableText>>([
      {
        variable: '',
        text: ''
      }
    ])

    const updateVariable = (index, value) => {
      if (keyTexts.value[index]) {
        keyTexts.value[index].variable = value
      }
    }

    const updateText = (index, value) => {
      if (keyTexts.value[index]) {
        keyTexts.value[index].text = value
      }
    }
    const addTextField = () => {
      keyTexts.value.push({
        variable: '',
        text: ''
      })
    }

    return {
      keyTexts: keyTexts.value,
      updateVariable,
      updateText,
      addTextField
    }
  }
})
</script>
