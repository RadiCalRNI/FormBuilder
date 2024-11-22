<script setup lang="ts">
import { useStore } from 'vuex'
import FormBuilder from './Builder.vue'
import FormPalette from './Palette/Index.vue'
import FormDetail from './detail/Index.vue'
import Table from '../table/Index.vue'
import { computed } from 'vue'

const store = useStore()

const getStatus = computed(() => store.getters.getStatus)
</script>

<template>
  <div class="form-builder">
    <FormPalette v-if="getStatus === 'form'" />
    <FormBuilder v-if="getStatus === 'form'" />
    <FormDetail v-if="getStatus === 'form'" />
    <Table v-if="getStatus === 'none'" />
  </div>
</template>

<style scoped>
.form-builder {
  @apply grid grid-cols-12 h-screen bg-slate-100 gap-x-5 overflow-auto relative;
}
</style>
