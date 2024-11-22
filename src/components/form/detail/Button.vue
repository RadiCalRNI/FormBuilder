<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// Create a computed property for reactivity
const selectedElement = computed(() => store.getters.getSelectedElement)
</script>

<template>
  <div class="detail-button">
    <div class="label-text">
      <label for="">عنوان</label>
      <input v-model="selectedElement.label" type="text" />
    </div>
  </div>
</template>

<style scoped>
.detail-button {
  .label-text {
    @apply flex flex-col text-right;
  }
  input {
    @apply border-2 outline-none p-1 px-2 rounded-md;
  }
  label {
    @apply text-sm mb-0.5 text-slate-500;
  }
}
</style>
