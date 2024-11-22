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
  <div class="checkbox-element flex items-center gap-x-2 flex-wrap">
    <!-- Display currently selected values for debug -->
    <div
      v-for="(option, i) in selectedElement.options"
      :key="i"
      class="flex gap-x-2 items-center"
    >
      <label>{{ option.label }}</label>
      <input
        type="checkbox"
        :checked="selectedElement.value.includes(option.value)"
        :value="option.value"
        v-model="selectedElement.value"
      />
<!--      @change="updateValue(option.value)"-->

    </div>
  </div>
</template>

<style scoped>
.checkbox-element {
  input {
    @apply border border-slate-400 outline-none rounded-md px-1 box-border flex flex-col;
  }
}
</style>
