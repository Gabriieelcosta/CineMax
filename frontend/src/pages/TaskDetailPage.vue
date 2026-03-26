<template>
  <div>
    <div class="d-flex align-center ga-3 mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" @click="router.back()" />
      <h1 class="text-h5 font-weight-bold">Detalhes da Tarefa</h1>
    </div>

    <LoadingSpinner v-if="loading" text="Carregando tarefa..." />

    <v-row v-else-if="task">
      <!-- Detalhes -->
      <v-col cols="12" md="8">
        <v-card class="mb-4">
          <v-card-text class="pa-6" v-if="!editing">
            <div class="d-flex align-center justify-space-between mb-4">
              <TaskStatusChip :status="task.status" />
              <v-btn variant="text" prepend-icon="mdi-pencil" @click="editing = true">
                Editar
              </v-btn>
            </div>
            <h2 class="text-h6 font-weight-bold mb-2">{{ task.title }}</h2>
            <p class="text-medium-emphasis">{{ task.description || 'Sem descrição.' }}</p>
          </v-card-text>

          <TaskForm
            v-else
            :task="task"
            :categories="categories"
            :users="users"
            :loading="formLoading"
            @submit="handleUpdate"
            @cancel="editing = false"
          />
        </v-card>
      </v-col>

      <!-- Info lateral -->
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="pa-4 text-body-1 font-weight-bold">Informações</v-card-title>
          <v-divider />
          <v-list density="compact">
            <v-list-item title="Prioridade" :subtitle="task.priority" />
            <v-list-item title="Categoria" :subtitle="task.category?.name || '—'" />
            <v-list-item title="Responsável" :subtitle="task.assignee?.name || '—'" />
            <v-list-item title="Criado por" :subtitle="task.owner?.name || '—'" />
            <v-list-item
              title="Vencimento"
              :subtitle="task.dueDate ? formatDate(task.dueDate) : '—'"
            />
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/tasks'
import { useCategoryStore } from '@/stores/categories'
import userService from '@/services/userService'
import TaskStatusChip from '@/components/tasks/TaskStatusChip.vue'
import TaskForm from '@/components/tasks/TaskForm.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()
const categoryStore = useCategoryStore()

const editing = ref(false)
const formLoading = ref(false)
const users = ref([])

const loading = computed(() => taskStore.loading)
const task = computed(() => taskStore.selectedTask)
const categories = computed(() => categoryStore.categories)

async function handleUpdate(data) {
  formLoading.value = true
  try {
    await taskStore.updateTask(route.params.id, data)
    editing.value = false
  } finally {
    formLoading.value = false
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR')
}

onMounted(async () => {
  taskStore.fetchTask(route.params.id)
  categoryStore.fetchCategories()
  users.value = await userService.getAll()
})
</script>
