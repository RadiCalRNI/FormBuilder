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
  <div class="text-element flex items-center gap-x-2 flex-wrap">
    <div v-for="(option, i) in selectedElement.options" :key="i" class="flex gap-x-1 items-center">
      <label>{{ option?.label }}</label>
      <input type="radio" v-model="selectedElement.value" :value="option.value" />
    </div>
  </div>
</template>

<style scoped>
.text-element {
  input {
    @apply border border-slate-400 outline-none rounded-md px-1 box-border flex flex-col;
  }
}
</style>
