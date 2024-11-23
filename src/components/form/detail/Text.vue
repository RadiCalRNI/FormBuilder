<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// Create a computed property for reactivity
const selectedElement = computed(() => store.getters.getSelectedElement)

</script>

<template>
  <div class="detail-text">
    <div class="label-text">
      <label for="">عنوان</label>
      <input v-model="selectedElement.label" type="text"  />
    </div>
    <div class="placeholder-text">
      <label for="">متن راهنما</label>
      <input v-model="selectedElement.placeholder" type="text" />
    </div>
    <div class="value-text">
      <label for="">مقدار</label>
      <input v-model="selectedElement.value" type="text" />
    </div>
    <div class="required">
      <label for="">اجباری</label>
      <input v-model="selectedElement.required" type="checkbox" />
    </div>
  </div>
</template>

<style scoped>
.detail-text {
  @apply space-y-3;

  .label-text,
  .placeholder-text,
  .value-text {
    @apply flex flex-col text-right;
  }

  input {
    @apply border-2 outline-none p-1 px-2 rounded-md text-sm text-slate-800/90;
  }

  .required {
    @apply flex gap-x-1 flex-row items-center;
  }

  label {
    @apply text-sm mb-0.5 text-slate-500;
  }
}
</style>
