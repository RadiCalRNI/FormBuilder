<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { handleDragStart } from '@/composables/dragDrop'
import type { IElementRangeSlider } from '@/interfaces/element'

const props = defineProps<{
  elements: IElementRangeSlider[]
}>()
</script>

<template>
  <div class="group-range-slider">
    <ul class="list-range-slider">
      <li
        v-for="(element, i) in props.elements"
        :key="i"
        class="input-element"
        draggable="true"
        @dragstart="handleDragStart($event, element)"
      >
        <div class="input-icon">
          <Icon :icon="element.icon" height="20" />
        </div>
        <div class="input-desc">
          <h5>{{ element.heading }}</h5>
          <p>{{ element.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.group-range-slider {
  .list-range-slider {
    .input-element {
      @apply flex items-center gap-x-2 p-3 cursor-pointer;
      &:hover {
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
      }

      .input-icon {
        @apply !h-8 w-8 bg-slate-200 flex justify-center items-center rounded-md;
      }

      .input-desc {
        h5 {
          @apply font-bold;
        }

        p {
          @apply text-xs;
        }
      }
    }
  }
}
</style>
