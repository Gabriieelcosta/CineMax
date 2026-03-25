<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-6">Dashboard</h1>

    <!-- Cards de resumo -->
    <v-row class="mb-6">
      <v-col v-for="card in summaryCards" :key="card.label" cols="6" md="3">
        <v-card>
          <v-card-text class="d-flex align-center ga-4">
            <v-icon :color="card.color" size="36">{{ card.icon }}</v-icon>
            <div>
              <div class="text-h5 font-weight-bold">{{ card.value }}</div>
              <div class="text-caption text-medium-emphasis">{{ card.label }}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Em breve -->
    <v-card>
      <v-card-text class="text-center pa-12">
        <v-icon size="64" color="primary" class="mb-4">mdi-view-dashboard</v-icon>
        <p class="text-h6 font-weight-medium">Dashboard em construção</p>
        <p class="text-medium-emphasis mt-2">Gráficos e relatórios serão exibidos aqui</p>
        <v-btn color="primary" class="mt-4" to="/tasks">Ver Tarefas</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
const summaryCards = [
  { label: 'Total de tarefas', value: '—', icon: 'mdi-checkbox-marked-circle', color: 'primary' },
  { label: 'Em andamento',     value: '—', icon: 'mdi-play-circle',             color: 'info' },
  { label: 'Concluídas',       value: '—', icon: 'mdi-check-circle',            color: 'success' },
  { label: 'Vencidas',         value: '—', icon: 'mdi-alert-circle',            color: 'error' },
]
</script>
