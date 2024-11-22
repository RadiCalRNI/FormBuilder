<script lang="ts" setup>
import FormDetailText from './Text.vue'
import FormDetailColor from './Color.vue'
import FormDetailNumber from './Number.vue'
import FormDetailRadio from './Radio.vue'
import FormDetailCheckbox from './Checkbox.vue'
import FormDetailButton from './Button.vue'
import FormMultiselectSingle from './MultiselectSingle.vue'
import FormMultiselectMultiple from './MultiselectMultiple.vue'
import FormRangeSlider from './RangeSlider.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import type { IElementInput } from '@/interfaces/element'

const store = useStore()

// Create a computed property for reactivity
const selectedElement = computed(() => store.getters.getSelectedElement)

const getComponentByName = (element: IElementInput) => {
  switch (element.type) {
    case 'text':
      return FormDetailText
    case 'number':
      return FormDetailNumber
    case 'color':
      return FormDetailColor
    case 'checkbox':
      return FormDetailCheckbox
    case 'radio':
      return FormDetailRadio
    case 'button':
      return FormDetailButton
    case 'multiselectSingle':
      return FormMultiselectSingle
    case 'multiselectMultiple':
      return FormMultiselectMultiple
    case 'rangeSlider':
      return FormRangeSlider
    default:
      return null
  }
}
</script>

<template>
  <div v-if="selectedElement" class="detail-container">
    <div class="detail">
      <div class="header">
        <h1>{{ selectedElement?.heading }}</h1>
      </div>
      <div class="body">
        <component :is="getComponentByName(selectedElement)" />
      </div>
    </div>
  </div>
</template>


<style scoped>
.detail-container {
  @apply col-span-12 sm:col-span-6 md:col-span-3 bg-white p-3 h-full shadow-xl;

  .detail {
    @apply sticky top-0 left-0 pt-3;
  }

  .header {
    @apply mb-8;

    h1 {
      @apply text-right text-xl;
    }
  }

  .body {
    @apply text-left space-y-5;

    .label-text,
    .placeholder-text {
      @apply flex flex-col;
    }

    .required {
      @apply flex flex-row-reverse gap-x-2 items-center;
    }

    input {
      @apply border outline-none p-1 px-2 rounded-md;
    }

    .min-max-text {
      > div {
        @apply flex flex-col;
      }
    }
  }
}
</style>
