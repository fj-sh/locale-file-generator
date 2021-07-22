<template>
  <div>
    <span class="text-gray-700"><slot name="label">Source Language:</slot></span>
    <select v-model="selected" class=" w-80 border bg-white rounded px-3 py-2" @change="selectSource">
      <option v-for="item in items" :key="item.value" :value="item.value" class="py-1">
        {{ item.label }}
      </option>
    </select>
    {{ selected }}
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SelectLanguage',
  emits: [
    'select-language'
  ],
  setup (_props, { emit }) {
    const selected = ref('ja')
    const items = [
      { label: 'Japanese', value: 'ja' },
      { label: 'English', value: 'en' },
      { label: 'Korean', value: 'ko' },
      { label: 'Simplified Chinese', value: 'zh-CN' },
      { label: 'Traditional Chinese', value: 'zh-TW' }
    ]
    const selectSource = (e) => {
      console.log(e.target.value)
      emit('select-language', e.target.value)
    }
    return {
      selected,
      items,
      selectSource
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
