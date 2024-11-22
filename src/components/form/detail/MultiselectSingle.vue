<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { Icon } from '@iconify/vue'

const store = useStore()

// Create a computed property for reactivity
const selectedElement = computed(() => store.getters.getSelectedElement)

onMounted(() => {
  options.value = selectedElement.value.options
})

const options = ref<{ id: number; label?: string; value?: any }[]>([])

const addOption = () => {
  rearrangeIds()
  const lastId = options.value.length ? options.value[options.value.length - 1].id : 0
  const option = { id: lastId + 1, label: '', value: '' }
  options.value.push(option)
  // selectedElement.value.options.push(option)
}

const removeOption = (id: number) => {
  if (options.value.length > 1) {
    const findIndex = options.value.findIndex((option: any) => option.id === id)

    if (options.value[findIndex].value === selectedElement.value.value) {
      store.commit('updateSelectedElement', {
        id: selectedElement.value.id,
        key: 'value',
        value: null,
      })
    }
    options.value = options.value.filter((option: any) => option.id !== id)
    // selectedElement.value.options = selectedElement.value.options.filter((option: any) => option.id !== id)

    rearrangeIds()
  }
}

const rearrangeIds = () => {
  options.value = options.value.map((option: any, index: number) => {
    return { ...option, id: index + 1 }
  })

  selectedElement.value.options = options.value
}
</script>

<template>
  <div class="detail-selectboxsingle">
    <div class="label-text">
      <label for="">عنوان</label>
      <input type="text" v-model="selectedElement.label" />
    </div>
    <div v-for="(option, i) in options" :key="i" class="new-options" dir="ltr">
      <div class="flex flex-col col-span-5 gap-y-1 text-right">
        <label for="">عنوان</label>
        <input v-model="option.label" class="border-2" type="text" />
      </div>
      <div class="flex flex-col col-span-5 gap-y-1 text-right">
        <label for="">مقدار</label>
        <input v-model="option.value" class="border-2" type="text" />
      </div>
      <div
        @click="removeOption(option.id)"
        class="col-span-2 text-left flex justify-center self-end bg-rose-600 px-3 text-sm/6 font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-300 cursor-pointer rounded-2xl"
      >
        <Icon height="35" icon="ic:outline-clear" />
      </div>
    </div>
    <div>
      <button class="add-option" @click="addOption">اضافه کردن</button>
    </div>
    <div class="required">
      <label for="">اجباری</label>
      <input v-model="selectedElement.required" type="checkbox" />
    </div>
  </div>
</template>

<style scoped>
.detail-selectboxsingle {
  @apply space-y-3;
  .label-text {
    @apply flex flex-col text-right;
  }
  .new-options {
    @apply grid grid-cols-12 gap-x-2 mb-3 items-center;
  }

  .add-option {
    @apply bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 p-2 rounded-lg w-full;
  }

  input {
    @apply border-2 outline-none p-1 px-2 rounded-md text-sm text-slate-800/90;
  }

  label {
    @apply text-sm mb-0.5 text-slate-500;
  }

  .required {
    @apply flex gap-x-1 flex-row items-center;
  }
}
</style>
