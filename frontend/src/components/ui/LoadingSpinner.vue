<template>
  <div class="d-flex flex-column align-center justify-center pa-8">
    <v-progress-circular
      indeterminate
      color="primary"
      :size="size"
      :width="3"
    />
    <p v-if="text" class="text-medium-emphasis text-body-2 mt-4">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  size: { type: Number, default: 48 },
  text: { type: String, default: '' },
})
</script>
