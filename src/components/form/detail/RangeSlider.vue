<script setup lang="ts">
import { computed, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// Create a computed property for reactivity
const selectedElement = computed(() => store.getters.getSelectedElement)

watch(
  () => selectedElement.value.min,
  () => {
    if (selectedElement.value.min > selectedElement.value.value) {
      selectedElement.value.value = selectedElement.value.min
    }
  }
)
</script>

<template>
  <div class="detail-number">
    <div class="value-text">
      <label for="">مقدار</label>
      <input
        type="range"
        :step="selectedElement.step"
        :min="selectedElement.min"
        :max="selectedElement.max"
        :required="selectedElement.required"
        :value="selectedElement.value"
        v-model="selectedElement.value"
      />
    </div>
    <div class="min">
      <label for="">حداقل</label>
      <input v-model="selectedElement.min" type="number" />
    </div>
    <div class="max">
      <label for="">حداکثر</label>
      <input v-model="selectedElement.max" type="number" />
    </div>
    <div class="step">
      <label for="">گام</label>
      <input v-model="selectedElement.step" type="number" />
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
  .label-text,
  .value-text,
  .min,
  .max,
  .step {
    @apply flex flex-col text-right;
  }

  input {
    @apply border-2 outline-none p-1 px-2 rounded-md;
  }

  .required {
    @apply flex gap-x-1 flex-row items-center;
  }

  label {
    @apply text-sm mb-0.5 text-slate-500;
  }
}
</style>
