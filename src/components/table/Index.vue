<script setup lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { setStatus } from '@/composables/common'
import { addForm } from '@/composables/common'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
const store = useStore()
const toast = useToast()

const getForms = computed(() => store.getters.getForms)

const removeForm = (id: number) => {
  store.commit('removeForm', id)
  toast.success('فرم حذف شد')
}

const selectForm = (form: any) => {
  store.commit('setSelectedForm', form)
  store.commit('setSelectedElement', form.elements[0])
  setStatus(store, 'form')
}
</script>

<template>
  <div class="col-span-12 p-10 relative overflow-x-auto">
    <div v-if="getForms.length">
      <button
        @click="addForm(store)"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        ایجاد فرم جدید
      </button>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 mt-3">
        <thead class="text-xs text-gray-500 uppercase bg-gray-200">
          <tr>
            <th scope="col" class="px-6 py-3">فرم</th>
            <th scope="col" class="px-6 py-3">عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(form, i) in getForms" :key="i" class="odd:bg-gray-50 even:bg-gray-200/20">
            <th scope="row" class="px-6 py-4 font-semibold text-black whitespace-nowrap">
              {{ form.title }}
            </th>
            <td class="px-6 py-4 text-black flex gap-x-4">
              <div
                @click="selectForm(form)"
                class="cursor-pointer transition-transform duration-200 hover:scale-110"
              >
                <Icon icon="material-symbols:edit" height="24" color="#666" />
              </div>
              <div
                @click="removeForm(form.id)"
                class="cursor-pointer transition-transform duration-200 hover:scale-110"
              >
                <Icon icon="material-symbols:delete-sharp" height="24" color="#666" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="no-result">
      <img src="../../assets/images/404.png" alt="" />
      <p class="text-xl font-semibold">
        هنوز هیچ فرمی ساخته نشده است. برای شروع، یک فرم جدید ایجاد کنید.
      </p>
      <button
        @click="addForm(store)"
        class="rounded-md bg-indigo-600 p-5 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        ایجاد فرم
      </button>
    </div>
    <!-- <button
      @click="setStatus(store, 'none')"
      class="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
    >
      بارگشت
    </button> -->
  </div>
</template>

<style scoped>
.no-result {
  @apply text-center flex flex-col space-y-10 items-center;
  img {
    @apply mx-auto text-center w-1/3;
  }
  button {
    @apply w-40;
  }
}
</style>
