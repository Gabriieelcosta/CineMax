<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-6">
      <h1 class="text-h5 font-weight-bold">Categorias</h1>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openForm()">
        Nova Categoria
      </v-btn>
    </div>

    <LoadingSpinner v-if="loading" text="Carregando categorias..." />

    <v-row v-else-if="categories.length">
      <v-col v-for="cat in categories" :key="cat.id" cols="12" sm="6" md="4">
        <v-card>
          <v-card-item>
            <template #prepend>
              <v-icon :color="cat.color || 'primary'">mdi-tag</v-icon>
            </template>
            <v-card-title>{{ cat.name }}</v-card-title>
            <v-card-subtitle v-if="cat.userId !== authStore.user?.id" class="text-caption">
              Criada por outro usuário
            </v-card-subtitle>
            <template #append>
              <v-tooltip text="Apenas o criador pode editar" :disabled="cat.userId === authStore.user?.id">
                <template #activator="{ props }">
                  <span v-bind="props">
                    <v-btn
                      icon="mdi-pencil"
                      variant="text"
                      size="small"
                      :disabled="cat.userId !== authStore.user?.id"
                      @click="openForm(cat)"
                    />
                  </span>
                </template>
              </v-tooltip>
              <v-tooltip text="Apenas o criador pode excluir" :disabled="cat.userId === authStore.user?.id">
                <template #activator="{ props }">
                  <span v-bind="props">
                    <v-btn
                      icon="mdi-delete"
                      variant="text"
                      size="small"
                      color="error"
                      :disabled="cat.userId !== authStore.user?.id"
                      @click="confirmDelete(cat)"
                    />
                  </span>
                </template>
              </v-tooltip>
            </template>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <v-card v-else>
      <v-card-text class="text-center pa-12">
        <v-icon size="64" color="primary" class="mb-4">mdi-tag-multiple-outline</v-icon>
        <p class="text-h6">Nenhuma categoria criada</p>
        <v-btn color="primary" class="mt-4" @click="openForm()">Criar categoria</v-btn>
      </v-card-text>
    </v-card>

    <!-- Modal de criação/edição -->
    <v-dialog v-model="showForm" max-width="400">
      <v-card>
        <v-card-title class="pa-4">{{ editingCat ? 'Editar' : 'Nova' }} Categoria</v-card-title>
        <v-divider />
        <v-card-text class="pa-4">
          <v-text-field v-model="form.name" label="Nome *" autofocus class="mb-2" />

          <div class="text-caption text-medium-emphasis mb-2">Cor da categoria</div>
          <div class="d-flex align-center ga-3">
            <div
              class="color-preview"
              :style="{ backgroundColor: form.color }"
              @click="$refs.colorInput.click()"
            >
              <v-icon color="white" size="18">mdi-eyedropper</v-icon>
            </div>
            <div>
              <div class="text-body-2">{{ form.color }}</div>
              <div class="text-caption text-medium-emphasis">Clique para escolher</div>
            </div>
            <input ref="colorInput" type="color" v-model="form.color" class="hidden-input" />
          </div>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn variant="text" @click="showForm = false">Cancelar</v-btn>
          <v-btn color="primary" :loading="formLoading" @click="handleSubmit">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Confirmação de exclusão -->
    <ConfirmDialog
      v-model="showConfirm"
      message="Tem certeza que deseja excluir esta categoria?"
      :loading="deleteLoading"
      @confirm="handleDelete"
      @cancel="showConfirm = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCategoryStore } from '@/stores/categories'
import { useAuthStore } from '@/stores/auth'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'

const categoryStore = useCategoryStore()
const authStore = useAuthStore()

const showForm = ref(false)
const showConfirm = ref(false)
const formLoading = ref(false)
const deleteLoading = ref(false)
const editingCat = ref(null)
const deletingCat = ref(null)
const form = ref({ name: '', color: '#E50914' })

const loading = computed(() => categoryStore.loading)
const categories = computed(() => categoryStore.categories)

function openForm(cat = null) {
  editingCat.value = cat
  form.value = { name: cat?.name || '', color: cat?.color || '#E50914' }
  showForm.value = true
}

function confirmDelete(cat) {
  deletingCat.value = cat
  showConfirm.value = true
}

async function handleSubmit() {
  formLoading.value = true
  try {
    if (editingCat.value) {
      await categoryStore.updateCategory(editingCat.value.id, form.value)
    } else {
      await categoryStore.createCategory(form.value)
    }
    showForm.value = false
  } finally {
    formLoading.value = false
  }
}

async function handleDelete() {
  deleteLoading.value = true
  try {
    await categoryStore.deleteCategory(deletingCat.value.id)
    showConfirm.value = false
  } finally {
    deleteLoading.value = false
  }
}

onMounted(() => categoryStore.fetchCategories())
</script>

<style scoped>
.color-preview {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.15s;
}

.color-preview:hover {
  transform: scale(1.1);
}

.hidden-input {
  width: 0;
  height: 0;
  opacity: 0;
  position: absolute;
}
</style>
