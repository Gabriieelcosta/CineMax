const swaggerConfig = {
  openapi: {
    info: {
      title: 'Cinemax API',
      description: `
## Cinemax — Gerenciamento de Tarefas em Tempo Real

API RESTful para gerenciamento de tarefas com suporte a colaboração entre usuários
e transmissão de eventos em tempo real via **SSE (Server-Sent Events)**.

### Autenticação
Utilize o endpoint \`POST /auth/login\` para obter o token JWT.
Em seguida, clique em **Authorize** e informe: \`Bearer {seu_token}\`

### Streaming de Eventos
Conecte-se ao endpoint \`GET /events\` para receber atualizações
em tempo real sempre que tarefas forem criadas, atualizadas ou deletadas.
      `.trim(),
      version: '1.0.0',
      contact: {
        name: 'Cinemax API',
      },
    },
    tags: [
      { name: 'Auth', description: 'Autenticação e registro de usuários' },
      { name: 'Users', description: 'Perfil do usuário autenticado' },
      { name: 'Tasks', description: 'Gerenciamento de tarefas (CRUD)' },
      { name: 'Categories', description: 'Categorias de tarefas' },
      { name: 'Reports', description: 'Relatórios e resumos' },
      { name: 'Events', description: 'Streaming de eventos em tempo real (SSE)' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
}

const swaggerUiConfig = {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
  staticCSP: true,
}

module.exports = { swaggerConfig, swaggerUiConfig }
