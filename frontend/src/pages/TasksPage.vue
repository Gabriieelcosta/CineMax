<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-6">
      <h1 class="text-h5 font-weight-bold">Tarefas</h1>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="showForm = true">
        Nova Tarefa
      </v-btn>
    </div>

    <!-- Filtros -->
    <TaskFilters :categories="categories" @update:filters="onFilterChange" />

    <!-- Loading -->
    <LoadingSpinner v-if="loading" text="Carregando tarefas..." />

    <!-- Lista de tarefas -->
    <v-row v-else-if="filteredTasks.length" align="stretch">
      <v-col v-for="task in filteredTasks" :key="task.id" cols="12" md="6" lg="4">
        <TaskCard :task="task" @click="openTask" />
      </v-col>
    </v-row>

    <!-- Estado vazio -->
    <v-card v-else>
      <v-card-text class="text-center pa-12">
        <v-icon size="64" color="primary" class="mb-4">mdi-checkbox-marked-circle-outline</v-icon>
        <p class="text-h6">Nenhuma tarefa encontrada</p>
        <p class="text-medium-emphasis mt-1">Crie sua primeira tarefa para começar</p>
        <v-btn color="primary" class="mt-4" @click="showForm = true">Criar tarefa</v-btn>
      </v-card-text>
    </v-card>

    <!-- Modal de criação -->
    <v-dialog v-model="showForm" max-width="600">
      <TaskForm
        :categories="categories"
        :users="users"
        :loading="formLoading"
        @submit="handleCreate"
        @cancel="showForm = false"
      />
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/tasks'
import { useCategoryStore } from '@/stores/categories'
import userService from '@/services/userService'
import TaskCard from '@/components/tasks/TaskCard.vue'
import TaskFilters from '@/components/tasks/TaskFilters.vue'
import TaskForm from '@/components/tasks/TaskForm.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const router = useRouter()
const taskStore = useTaskStore()
const categoryStore = useCategoryStore()

const showForm = ref(false)
const formLoading = ref(false)
const activeFilters = ref({})

const loading = computed(() => taskStore.loading)
const categories = computed(() => categoryStore.categories)
const users = ref([])

const filteredTasks = computed(() => {
  let tasks = taskStore.tasks
  const { search } = activeFilters.value
  if (search) {
    tasks = tasks.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    )
  }
  return tasks
})

function onFilterChange(filters) {
  activeFilters.value = filters
  taskStore.setFilters(filters)
  taskStore.fetchTasks()
}

function openTask(task) {
  router.push(`/tasks/${task.id}`)
}

async function handleCreate(data) {
  formLoading.value = true
  try {
    await taskStore.createTask(data)
    showForm.value = false
  } finally {
    formLoading.value = false
  }
}

onMounted(async () => {
  taskStore.fetchTasks()
  categoryStore.fetchCategories()
  users.value = await userService.getAll()
})
</script>
