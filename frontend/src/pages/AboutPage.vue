<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-2">Sobre o Claquete</h1>
    <p class="text-medium-emphasis mb-6">Guia rápido de uso do sistema</p>

    <!-- O que é -->
    <v-card class="mb-4 pa-2">
      <v-card-item>
        <template #prepend>
          <v-icon color="primary" size="32">mdi-movie-play</v-icon>
        </template>
        <v-card-title>O que é o Claquete?</v-card-title>
      </v-card-item>
      <v-card-text>
        Claquete é um gerenciador de tarefas colaborativo desenvolvido para equipes de produção.
        Todos os usuários cadastrados compartilham o mesmo ambiente — qualquer um pode ver todas
        as tarefas e categorias, mas <strong>somente o criador pode editar ou excluir</strong> o
        que criou.
      </v-card-text>
    </v-card>

    <!-- Funcionalidades -->
    <v-row>
      <v-col
        v-for="feature in features"
        :key="feature.title"
        cols="12"
        md="6"
      >
        <v-card height="100%">
          <v-card-item>
            <template #prepend>
              <v-icon :color="feature.color" size="28">{{ feature.icon }}</v-icon>
            </template>
            <v-card-title class="text-body-1 font-weight-bold">{{ feature.title }}</v-card-title>
          </v-card-item>
          <v-card-text class="pt-0">
            <v-list density="compact" class="pa-0">
              <v-list-item
                v-for="tip in feature.tips"
                :key="tip"
                :title="tip"
                density="compact"
                min-height="32"
              >
                <template #prepend>
                  <v-icon color="primary" size="14" class="mr-1">mdi-check</v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Regras de permissão -->
    <v-card class="mt-4" color="surface-variant">
      <v-card-item>
        <template #prepend>
          <v-icon color="warning" size="28">mdi-shield-account</v-icon>
        </template>
        <v-card-title>Regras de Permissão</v-card-title>
      </v-card-item>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <div class="d-flex align-center ga-2 mb-2">
              <v-icon color="success" size="18">mdi-check-circle</v-icon>
              <span class="text-body-2 font-weight-medium">Todos os usuários podem</span>
            </div>
            <v-list density="compact" class="pa-0">
              <v-list-item v-for="item in canDo" :key="item" :title="item" min-height="28" density="compact">
                <template #prepend>
                  <v-icon color="success" size="12">mdi-circle</v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="d-flex align-center ga-2 mb-2">
              <v-icon color="error" size="18">mdi-close-circle</v-icon>
              <span class="text-body-2 font-weight-medium">Apenas o criador pode</span>
            </div>
            <v-list density="compact" class="pa-0">
              <v-list-item v-for="item in onlyOwner" :key="item" :title="item" min-height="28" density="compact">
                <template #prepend>
                  <v-icon color="error" size="12">mdi-circle</v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Indicador SSE -->
    <v-card class="mt-4">
      <v-card-item>
        <template #prepend>
          <v-icon color="success" size="28">mdi-wifi</v-icon>
        </template>
        <v-card-title>Indicador "Ao vivo"</v-card-title>
      </v-card-item>
      <v-card-text>
        O chip no canto superior direito indica a conexão em tempo real (SSE — Server-Sent Events).
        Enquanto a aba estiver aberta, o status
        <v-chip size="x-small" color="success" variant="tonal" class="mx-1"><v-icon start size="8">mdi-circle</v-icon>Ao vivo</v-chip>
        permanece ativo e o sistema recebe atualizações automáticas sem precisar recarregar a página —
        novas tarefas e categorias criadas por outros usuários aparecem instantaneamente.
        O status <v-chip size="x-small" color="error" variant="tonal" class="mx-1"><v-icon start size="8">mdi-circle</v-icon>Offline</v-chip>
        só ocorre se o servidor for reiniciado ou a conexão de rede cair; nesse caso o sistema
        reconecta automaticamente em 5 segundos.
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
const features = [
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard',
    color: 'primary',
    tips: [
      'Visão geral das suas tarefas',
      'Contagem por status (Pendente, Em andamento, Concluída)',
      'Atalho rápido para criar nova tarefa',
    ],
  },
  {
    title: 'Tarefas',
    icon: 'mdi-checkbox-marked-circle',
    color: 'info',
    tips: [
      'Crie tarefas com título, descrição, prioridade e vencimento',
      'Atribua uma categoria e um responsável',
      'Filtre por status, prioridade ou texto',
      'Clique no card para ver os detalhes completos',
    ],
  },
  {
    title: 'Categorias',
    icon: 'mdi-tag-multiple',
    color: 'success',
    tips: [
      'Organize tarefas por tema ou área',
      'Escolha uma cor para identificar visualmente',
      'As categorias ficam disponíveis para todos os usuários',
    ],
  },
  {
    title: 'Relatórios',
    icon: 'mdi-chart-bar',
    color: 'warning',
    tips: [
      'Total de tarefas cadastradas no sistema',
      'Quantas foram concluídas e quantas estão vencidas',
      'Distribuição por status e por prioridade',
    ],
  },
]

const canDo = [
  'Ver todas as tarefas e categorias',
  'Criar novas tarefas e categorias',
  'Ver detalhes de qualquer tarefa',
  'Visualizar relatórios e dashboard',
]

const onlyOwner = [
  'Editar uma tarefa',
  'Editar uma categoria',
  'Excluir uma categoria',
]
</script>
