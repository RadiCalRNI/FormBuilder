<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const selectedElement = computed(() => store.getters.getSelectedElement)


const valueChange = (event: Event) => {
  if (!(event.target as HTMLInputElement).value) {
    selectedElement.value.value = '#'
  }
}
</script>

<template>
  <div class="detail-color">
    <div class="label-text">
      <label for="">عنوان</label>
      <input type="text" v-model="selectedElement.label" />
    </div>
    <div class="value-text">
      <label for="">مقدار</label>
      <input type="text" maxlength="7" v-model="selectedElement.value" @input="valueChange" />
    </div>
    <div class="required">
      <label for="">اجباری</label>
      <input v-model="selectedElement.required" type="checkbox" />
    </div>
  </div>
</template>

<style scoped>
.detail-color {
  @apply space-y-3;
  .label-text,
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
