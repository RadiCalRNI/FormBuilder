<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps<{
  id: number
}>()

const store = useStore()

const selectedElement = computed(() =>
  store.getters.getDroppedElements.find((element: any) => element.id === props.id)
)

const updateValue = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  store.commit('updateSelectedElement', { id: props.id, key: 'value', value })
}
</script>

<template>
  <div class="text-element">
    <label>{{ selectedElement?.label }}</label>
    <input type="color" :value="selectedElement.value" @input="updateValue" />
  </div>
</template>

<style scoped>
.text-element {
  input {
    @apply border border-slate-400 outline-none rounded-md px-1 box-border flex flex-col;
  }
  label {
    @apply text-sm mb-0.5 text-slate-500;
  }
}
</style>
