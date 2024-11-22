<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// Create a computed property for reactivity
const selectedElement = computed(() => store.getters.getSelectedElement)
</script>

<template>
  <div class="detail-number">
    <div class="label-text">
      <label for="">عنوان</label>
      <input v-model="selectedElement.label" type="text" />
    </div>
    <div class="placeholder-text">
      <label for="">متن راهنما</label>
      <input v-model="selectedElement.placeholder" type="text" />
    </div>
    <div class="value-text">
      <label for="">مقدار</label>
      <input v-model="selectedElement.value" type="number" />
    </div>
    <div class="min">
      <label for="">حداقل</label>
      <input v-model="selectedElement.min" type="number" />
    </div>
    <div class="max">
      <label for="">حداکثر</label>
      <input v-model="selectedElement.max" type="number" />
    </div>
    <div class="required">
      <label for="">اجباری</label>
      <input v-model="selectedElement.required" type="checkbox" />
    </div>
  </div>
</template>

<style scoped>
.detail-number {
  @apply space-y-3;
  .placeholder-text,
  .label-text,
  .value-text,
  .min,
  .max {
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
