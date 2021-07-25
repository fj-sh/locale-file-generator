<template>
  <div class="block">
    <span class="text-gray-700">Target Languages</span>
    <div v-for="(item, index) in items" :key="item.name" class="mt-2">
      <div>
        <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox" :checked="item.checked" @click="onChecked(index)">
          <span class="ml-2">{{ item.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { TargetLanguage } from '~/types/targetLangage'
export default defineComponent({
  name: 'Checkbox',
  props: {
    items: {
      type: Array as PropType<TargetLanguage[]>,
      required: true
    }
  },
  emits: ['item-checked'],
  setup (_props, { emit }) {
    const onChecked = (index: number) => {
      emit('item-checked', index)
    }

    return {
      onChecked
    }
  }
})
</script>
