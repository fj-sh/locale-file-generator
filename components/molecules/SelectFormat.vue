<template>
  <div>
    <label class="block mt-4">
      <span class="text-gray-700"><slot name="label">Format:</slot></span>
      <select v-model="selected" class="w-80 border bg-white rounded px-3 py-2 form-select mt-1 block" @change="selectFormat">
        <option v-for="item in items" :key="item.value" :value="item.value" class="py-1">
          {{ item.label }}
        </option>
      </select>
    </label>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SelectFormat',
  emits: [
    'select-format'
  ],
  setup (_props, { emit }) {
    const selected = ref('language-js')
    const items = [
      { label: 'JavaScript', value: 'language-js' },
      { label: 'YAML', value: 'language-yaml' }
    ]
    const selectFormat = (e: Event) => {
      console.log((e.target as HTMLInputElement).value)
      emit('select-format', (e.target as HTMLInputElement).value)
    }
    return {
      selected,
      items,
      selectFormat
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
