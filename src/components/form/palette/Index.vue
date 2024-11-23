<script lang="ts" setup>
import FormPaletteSearch from './Search.vue'
import FormPaletteGroupInputs from './group/Inputs.vue'
import FormPaletteGroupRangeSlider from './group/RangeSilder.vue'
import FormPaletteGroupSelections from './group/Selections.vue'
import { computed, ref } from 'vue'
import type {
  IElementInput,
  IElementRangeSlider,
  IElements,
  IElementSelection,
} from '@/interfaces/element'

//#region VARIABLES
const search = ref<string>('')
//#endregion
const elements = ref<IElements>({
  inputs: [
    {
      id: 0,
      icon: 'material-symbols:format-color-text',
      heading: 'متن کوتاه',
      description: 'ورودی یک خطی',
      label: 'ورودی متن',
      placeholder: 'متن مورد نظر خود را وارد کنید',
      required: false,
      type: 'text',
      value: '',
    },
    {
      id: 0,
      icon: 'material-symbols:colors-sharp',
      heading: 'رنگ',
      description: 'انتخاب رنگ',
      label: 'ورودی رنگ',
      required: false,
      type: 'color',
      value: '#ff0000',
    },
    {
      id: 0,
      icon: 'material-symbols:format-color-text',
      heading: 'عدد',
      description: 'فیلد ورودی که فقط اعداد را می‌پذیرد',
      label: 'ورودی عدد',
      placeholder: '10',
      required: false,
      value: 10,
      min: 10,
      max: 30,
      type: 'number',
    },
    {
      id: 0,
      icon: 'material-symbols:radio-button-checked',
      heading: 'دکمه انتخاب',
      description: 'پذیرفتن یک گزینه',
      type: 'radio',
      required: false,
      value: true,
      options: [
        {
          id: 1,
          label: 'React',
          value: true,
        },
        {
          id: 2,
          label: 'Vue',
          value: false,
        },
      ],
    },
    {
      id: 0,
      icon: 'radix-icons:checkbox',
      heading: 'چک‌باکس',
      description: 'زمانی که نیاز به تایید چیزی باشد',
      type: 'checkbox',
      value: [],
      required: false,
      options: [
        {
          id: 1,
          label: 'Vue3',
          value: true,
        },
        {
          id: 2,
          label: 'Nuxt3',
          value: false,
        },
      ],
    },
    {
      id: 0,
      icon: 'ic:twotone-radio-button-checked',
      heading: 'دکمه',
      description: 'دکمه ساده',
      label: 'دکمه',
      type: 'button',
    },
  ],
  selections: [
    {
      id: 0,
      icon: 'material-symbols:format-list-bulleted',
      heading: 'انتخاب تکی',
      description: 'پذیرفتن یک گزینه',
      type: 'multiselectSingle',
      label: 'انتخاب تکی',
      value: {
        id: 1,
        label: 'Vue',
        value: 'vue',
      },
      options: [
        {
          id: 1,
          label: 'Vue',
          value: 'vue',
        },
        {
          id: 2,
          label: 'React',
          value: 'react',
        },
        {
          id: 3,
          label: 'Angular',
          value: 'angular',
        },
      ],
    },
    {
      id: 0,
      icon: 'material-symbols:format-list-bulleted',
      heading: 'انتخاب چندگانه',
      description: 'پذیرفتن چند گزینه',
      type: 'multiselectMultiple',
      label: 'انتخاب چندگانه',
      value: [
        {
          id: 1,
          label: 'Vue',
          value: 'vue',
        },
      ],
      options: [
        {
          id: 1,
          label: 'Vue',
          value: 'vue',
        },
        {
          id: 2,
          label: 'React',
          value: 'react',
        },
        {
          id: 3,
          label: 'Angular',
          value: 'angular',
        },
      ],
    },
  ],
  rangeSlider: [
    {
      icon: 'material-symbols:sliders',
      heading: 'اسلایدر بازه‌ای',
      description: 'اسلایدر افقی با بازه مشخص',
      type: 'rangeSlider',
      label: 'اسلایدر بازه ای',
      step: 10,
      min: 50,
      max: 100,
      required: false,
      value: 50,
    },
  ],
})

//#region COMPUTED

const filterElementsBySearch = (
  elements: IElementInput[] | IElementSelection[] | IElementRangeSlider[],
  search: string
) => {
  return elements.filter((element) => element.heading.toLowerCase().includes(search.toLowerCase()))
}

const inputElements = computed<IElementInput[]>(() =>
  filterElementsBySearch(elements.value.inputs, search.value)
)

const selectionElements = computed<IElementSelection[]>(() =>
  filterElementsBySearch(elements.value.selections, search.value)
)

const rangeSliderElements = computed<IElementRangeSlider[]>(() =>
  filterElementsBySearch(elements.value.rangeSlider, search.value)
)

//#endregion
</script>

<template>
  <div class="palette">
    <FormPaletteSearch v-model:search="search" />
    <div class="selections">
      <FormPaletteGroupInputs :elements="inputElements" />
      <FormPaletteGroupSelections :elements="selectionElements" />
      <FormPaletteGroupRangeSlider :elements="rangeSliderElements" />
    </div>
  </div>
</template>

<style scoped>
.palette {
  @apply col-span-12 sm:col-span-6 md:col-span-3 bg-white p-3 h-full shadow-xl;

  .selections {
    @apply overflow-auto p-1 sticky top-0;
  }
}
</style>
