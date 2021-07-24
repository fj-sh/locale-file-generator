<template>
  <div>
    <label class="block mt-4">
      <span class="text-gray-700"><slot name="label">Format:</slot></span>
      <select v-model="selectedItem" class="w-80 border bg-white rounded px-3 py-2 form-select mt-1 block" @change="selectItem">
        <option v-for="item in items" :key="item.value" :value="item.value" class="py-1">
          {{ item.label }}
        </option>
      </select>
    </label>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SelectForm',
  emits: [
    'select-item'
  ],
  props: {
    items: {
      type: PropType as Object,
      required: true
    },
    defaultItem: {
      type: String,
      required: true
    }
  },
  setup (props, { emit }) {
    const selectedItem = ref(props.defaultItem)
    const selectItem = (e: Event) => {
      emit('select-item', (e.target as HTMLInputElement).value)
    }
    return {
      selectItem,
      selectedItem
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
