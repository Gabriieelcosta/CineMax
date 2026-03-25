<template>
  <v-card elevation="4">
    <v-card-text class="pa-6">
      <h2 class="text-h6 font-weight-bold mb-6 text-center">Criar conta</h2>

      <v-form @submit.prevent="handleRegister">
        <v-text-field
          v-model="form.name"
          label="Nome completo"
          prepend-inner-icon="mdi-account-outline"
          class="mb-2"
        />
        <v-text-field
          v-model="form.email"
          label="E-mail"
          type="email"
          prepend-inner-icon="mdi-email-outline"
          class="mb-2"
        />
        <v-text-field
          v-model="form.password"
          label="Senha"
          :type="showPassword ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          class="mb-4"
        />

        <v-alert v-if="error" type="error" variant="tonal" class="mb-4" density="compact">
          {{ error }}
        </v-alert>

        <v-btn type="submit" color="primary" block size="large" :loading="loading">
          Criar conta
        </v-btn>
      </v-form>
    </v-card-text>

    <v-divider />

    <v-card-text class="text-center pa-4">
      <span class="text-medium-emphasis text-body-2">Já tem conta? </span>
      <RouterLink to="/login" class="text-primary text-body-2">Entrar</RouterLink>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({ name: '', email: '', password: '' })
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

async function handleRegister() {
  error.value = ''
  loading.value = true
  try {
    await authStore.register(form.value.name, form.value.email, form.value.password)
    router.push('/dashboard')
  } catch (e) {
    error.value = e.response?.data?.message || 'Erro ao criar conta'
  } finally {
    loading.value = false
  }
}
</script>
