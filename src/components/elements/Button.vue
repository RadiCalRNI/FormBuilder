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
</script>

<template>
  <div class="text-element">
    <button>{{ selectedElement.label }}</button>
  </div>
</template>

<style scoped>
button {
  @apply border py-1 px-4 rounded-md border-slate-400 transition-colors duration-100 cursor-pointer;
  &:hover {
    @apply bg-slate-100;
  }
}
</style>
