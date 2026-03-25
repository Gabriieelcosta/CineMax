<template>
  <v-dialog v-model="model" max-width="420" persistent>
    <v-card>
      <v-card-item>
        <v-card-title class="d-flex align-center ga-2">
          <v-icon color="error">mdi-alert-circle-outline</v-icon>
          {{ title }}
        </v-card-title>
      </v-card-item>

      <v-card-text class="text-medium-emphasis">
        {{ message }}
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn variant="text" @click="emit('cancel')">
          Cancelar
        </v-btn>
        <v-btn color="error" :loading="loading" @click="emit('confirm')">
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Confirmar exclusão' },
  message: { type: String, default: 'Essa ação não pode ser desfeita.' },
  confirmText: { type: String, default: 'Deletar' },
  loading: { type: Boolean, default: false },
})

const model = defineModel()
const emit = defineEmits(['confirm', 'cancel'])
</script>
