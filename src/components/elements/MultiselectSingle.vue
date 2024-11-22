<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps<{
  id: number
}>()

const store = useStore()

const selectedElement = computed(() =>
  store.getters.getDroppedElements.find((element: any) => element.id === props.id)
)
</script>

<template>
  <div class="text-element">
    <label>{{ selectedElement.label }}</label>
    <select v-model="selectedElement.value" name="cars">
      <option v-for="(option, i) in selectedElement.options" :key="i" :value="option">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.text-element {
  select {
    @apply border outline-none border-slate-400 px-2 py-1 rounded-md;
  }
  label {
    @apply text-sm mb-0.5 text-slate-500;
  }
  @apply flex flex-col;
}
</style>
