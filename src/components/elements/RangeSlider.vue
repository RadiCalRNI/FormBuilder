<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'

const props = defineProps<{ id: number }>()
const store = useStore()

const selectedElement = computed(
  () => store.getters.getDroppedElements.find((element: any) => element.id === props.id) || {}
)

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
  <div class="text-element">
    <label>{{ selectedElement?.label }}</label>
    <input
      class="common-range"
      type="range"
      :step="selectedElement?.step || 1"
      :min="selectedElement?.min || 0"
      :max="selectedElement?.max || 100"
      :value="selectedElement?.value"
      :required="selectedElement?.required || false"
      :disabled="true"
    />
  </div>
</template>

<style scoped>
.text-element {
  @apply flex flex-col;
}
</style>
