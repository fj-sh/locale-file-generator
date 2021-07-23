<template>
  <div class="flex flex-row -mx-3 mb-6 md:mt-5 md:mb-5">
    <div class="flex-none px-3 mb-6">
      <label class="text-gray-700" for="grid-key">
        Key
      </label>
      <input id="grid-key" class="w-80 border bg-white rounded px-3 py-2 form-select mt-1 block focus:bg-white" type="text" placeholder="Key">
    </div>
    <div class="flex-grow">
      <label class="text-gray-700" for="grid-text">
        Text
      </label>
      <input id="grid-text" class="w-4/5 mb-2 border bg-white rounded px-3 py-2 form-select mt-1 block focus:bg-white" type="text" placeholder="Text">
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TextField',
  setup () {

  }
})
</script>
