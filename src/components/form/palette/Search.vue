<script setup lang="ts">
import { Icon } from '@iconify/vue'

const search = defineModel('search')
</script>

<template>
  <div class="search-box">
    <div class="search-box-icon">
      <Icon icon="material-symbols:search" height="20" />
    </div>
    <div class="search-box-input">
      <input type="text" v-model="search" placeholder="جستجو کنید" />
    </div>
    <div class="search-box-clear" @click="search = ''">
      <Icon icon="material-symbols:close-small-outline-rounded" height="24" />
    </div>
  </div>
</template>

<style scoped>
.search-box {
  @apply flex justify-between items-center bg-gray-100 p-1 rounded-md px-2 h-10 gap-x-2 mb-3;
  .search-box-input {
    @apply grow;
    input {
      @apply bg-transparent border-none outline-none text-base;
    }
  }
  .search-box-clear {
    @apply cursor-pointer;
  }
}
</style>
