<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ElementsText from '../Elements/Text.vue'
import ElementsNumber from '../Elements/Number.vue'
import ElementsColor from '../Elements/Color.vue'
import ElementsCheckbox from '../Elements/Checkbox.vue'
import ElementsRadio from '../Elements/Radio.vue'
import ElementsMultiselectSingle from '../Elements/MultiselectSingle.vue'
import ElementsMultiselectMultiple from '../Elements/MultiselectMultiple.vue'
import ElementsButton from '../Elements/Button.vue'
import ElementsRangeSlider from '../Elements/RangeSlider.vue'
import { Icon } from '@iconify/vue'
import { useStore } from 'vuex'
import type { IElementInput } from '@/interfaces/element'
import { setStatus } from '@/composables/common'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { checkColorRegex } from '@/composables/common'

const store = useStore()
const toast = useToast()

//#region DRAG & DROP
const handleDrop = (event: DragEvent) => {
  if (getSelectedForm.value) {
    event.preventDefault()
    const data = event.dataTransfer?.getData('element')
    if (!data) return

    let element = JSON.parse(data)
    rearrangeIds()
    const lastId = getDroppedElements.value.length
      ? getDroppedElements.value[getDroppedElements.value.length - 1].id
      : 0
    element = { ...element, id: lastId + 1 }
    store.commit('addElement', element)
    setSelectedElement(element)
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
}
//#endregion

//#region HELPER FUCTIONS & COMPUTED
// Computed dropped elements
const getDroppedElements = computed(() => {
  return store.getters.getDroppedElements
})
const getSelectedForm = computed(() => store.getters.getSelectedForm)
const showEmpty = computed(() => getSelectedForm.value && !getDroppedElements.value.length)
const showAddNewForm = computed(() => !getSelectedForm.value)
const builderStyle = computed(() => {
  switch (getStatus.value) {
    case 'none':
      return 'col-span-12'
    case 'form':
      return 'col-span-12 sm:col-span-6'
  }
})
const getStatus = computed(() => store.getters.getStatus)
const getForms = computed(() => store.getters.getForms)

// Component mapping
const getComponentByName = (element: IElementInput) => {
  switch (element.type) {
    case 'text':
      return ElementsText
    case 'number':
      return ElementsNumber
    case 'color':
      return ElementsColor
    case 'checkbox':
      return ElementsCheckbox
    case 'radio':
      return ElementsRadio
    case 'button':
      return ElementsButton
    case 'multiselectSingle':
      return ElementsMultiselectSingle
    case 'multiselectMultiple':
      return ElementsMultiselectMultiple
    case 'rangeSlider':
      return ElementsRangeSlider
    default:
      return null
  }
}
//#endregion

//#region ELEMENTS
const rearrangeIds = () => {
  store.commit('rearrangeIds')
}

const removeElement = (id: number) => {
  const element = getDroppedElements.value.find((element: any) => element.id === id)
  store.commit('removeElement', id)
  toast.success(`المان '${element.heading}' حذف شد`)
}

const setSelectedElement = (element: IElementInput) => {
  store.commit('setSelectedElement', element)
}

const clearAllElements = () => {
  store.commit('clearAllElements')
  // toast.success(`تمامی المان ها حذف شدند`)
}
//#endregion

//#region FORMS

const removeForm = () => {
  store.commit('removeForm', getSelectedForm.value.id)
  store.commit('setUnSelectedForm')
  clearAllElements()
  if (!getSelectedForm.value) {
    setStatus(store, 'none')
  }
  toast.success('فرم حذف شد')
}

const saveForm = () => {
  if (checkError()) {
    store.commit('addElementsToForm', getDroppedElements.value)
    clearAllElements()
    store.commit('setUnSelectedForm')
    setStatus(store, 'none')
    toast.success('فرم با موفقیت ایجاد شد')
  }
}

const checkError = () => {
  for (let element of getDroppedElements.value) {
    if (element.type === 'text' && element.required && !element.value.trim()) {
      toast.error("المان 'متن کوتاه' مقدار ندارد")
      return false
    }

    if (element.type === 'color' && element.required) {
      if (!element.value.trim()) {
        toast.error("المان 'رنگ' مقدار ندارد")
        return false
      }
      if (!checkColorRegex(element.value.trim())) {
        toast.error("مقدار المان 'رنگ' صحیح نمی باشد")
        return false
      }
    }

    if (element.type === 'number' && element.required && element.value === '') {
      toast.error("المان 'عدد' صحیح نمی باشد")
      return false
    }

    if (element.type === 'radio') {
      for (const option of element.options) {
        if (!option.label || [undefined, '', null].includes(option.value)) {
          toast.error("گزینه های 'دکمه انتخاب' مقدار یا عنوان ندارد")
          return false
        }
      }
      if (element.required && [undefined, '', null].includes(element.value)) {
        toast.error("المان 'دکمه انتخاب' مقدار ندارد")
        return false
      }
    }

    if (element.type === 'checkbox') {
      for (const option of element.options) {
        if (!option.label || [undefined, '', null].includes(option.value)) {
          toast.error("گزینه های 'چک باکس' مقدار یا عنوان ندارد")
          return false
        }
      }
      if (!element.value.length && element.required) {
        toast.error("المان 'چک باکس' مقدار ندارد")
        return false
      }
    }

    if (element.type === 'button' && !element.label.trim()) {
      toast.error("المان 'دکمه' عنوان ندارد")
      return false
    }

    if (element.type === 'multiselectSingle') {
      for (const option of element.options) {
        if (!option.label || [undefined, '', null].includes(option.value)) {
          toast.error("گزینه های 'انتخاب تکی' مقدار یا عنوان ندارد")
          return false
        }
      }
      if (element.required && [undefined, '', null].includes(element.value)) {
        toast.error("المان 'دکمه انتخاب' مقدار ندارد")
        return false
      }
    }

    if (element.type === 'multiselectMultiple') {
      for (const option of element.options) {
        if (!option.label || [undefined, '', null].includes(option.value)) {
          toast.error("گزینه های 'انتخاب تکی' مقدار یا عنوان ندارد")
          return false
        }
      }
      if (!element.value.length && element.required) {
        toast.error("المان 'انتخاب چندگانه' مقدار ندارد")
        return false
      }
    }
  }

  return true
}

//#endregion
</script>

<template>
  <div class="builder" :class="builderStyle" @dragover="handleDragOver" @drop="handleDrop">
    <div class="builder-header flex items-center justify-center gap-x-3">
      <h1>فرم ساز</h1>
      <div v-if="getSelectedForm" class="flex items-center gap-x-3">
        <span class="font-bold"> - </span>
        <h1 class="font-bold">{{ getSelectedForm.title }}</h1>
      </div>
    </div>
    <div v-if="getForms.length" class="builder-content">
      <div class="builder-container">
        <div v-if="showAddNewForm" class="new-form-button"></div>
        <div v-if="showEmpty" class="empty">
          <h4>یک عنصر را از لیست سمت راست کشیده و در اینجا رها کنید.</h4>
        </div>
        <div
          v-for="element in getDroppedElements"
          :key="element.id"
          class="element"
          :class="{
            '!border-red-800 !border-2': element.id === store.getters.getSelectedElement?.id,
          }"
          @click="setSelectedElement(element)"
        >
          <div
            v-if="element.id === store.getters.getSelectedElement?.id"
            class="remove-element"
            @click.stop="removeElement(element.id)"
          >
            <Icon icon="ic:outline-clear" height="16" />
          </div>
          <component :is="getComponentByName(element)" :id="element.id" />
        </div>
      </div>
      <div v-if="getSelectedForm" class="buttons">
        <button
          @click="saveForm"
          :disabled="!getDroppedElements.length"
          class="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          :class="{
            '!bg-green-300 hover:!bg-green-300 cursor-not-allowed': !getDroppedElements.length,
          }"
        >
          ذخیره
        </button>
        <button
          v-if="getDroppedElements.length"
          @click="clearAllElements"
          class="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          حذف همه
        </button>
      </div>
      <button v-if="getSelectedForm" @click="removeForm" class="remove-form">
        <Icon icon="ic:outline-clear" height="20" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.builder {
  @apply p-4;

  .builder-header {
    @apply text-center mb-5;
    h1 {
      @apply text-center text-3xl font-semibold;
    }
  }

  .builder-content {
    @apply relative z-30;

    .builder-container {
      @apply shadow-sm bg-white min-h-20 mx-auto rounded-md p-4 py-6 space-y-5;

      .new-form-button {
        @apply flex items-center justify-center text-center gap-x-5;
      }

      .empty {
        @apply text-center text-slate-400;
      }

      .element {
        @apply relative border p-1 rounded-md;
        .remove-element {
          @apply absolute w-4 h-4 flex justify-center items-center -top-[16px] rounded-t-md hover:scale-105 transition-transform duration-200 left-0.5 cursor-pointer bg-red-800 text-white;
        }
      }
    }

    .buttons {
      @apply flex gap-x-2 mt-3;
    }

    .remove-form {
      @apply transition-transform duration-200 absolute -z-[1] left-1 -top-[22px] rounded-t-md bg-red-600 px-0.5 py-0.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600;
      &:hover {
        @apply scale-110;
      }
    }
  }
}
</style>
