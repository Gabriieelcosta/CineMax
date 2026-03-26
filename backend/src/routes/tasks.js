const { getAll, getById, create, update, remove, addCollaborator } = require('../controllers/taskController')
const { authenticate } = require('../middlewares/auth')

async function taskRoutes(fastify) {
  fastify.get('/tasks', {
    preHandler: authenticate,
    schema: {
      tags: ['Tasks'],
      summary: 'Listar tarefas do usuário (com filtros opcionais)',
      security: [{ bearerAuth: [] }],
      querystring: {
        type: 'object',
        properties: {
          status: { type: 'string', enum: ['PENDING', 'IN_PROGRESS', 'DONE', 'CANCELLED'] },
          priority: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'] },
          categoryId: { type: 'string' },
        },
      },
    },
      response: {
        200: {
          description: 'Lista de tarefas',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              description: { type: 'string' },
              status: { type: 'string' },
              priority: { type: 'string' },
              dueDate: { type: 'string', format: 'date-time' },
              createdAt: { type: 'string', format: 'date-time' },
            },
          },
        },
        401: { description: 'Nao autorizado' },
      },
    },
  }, getAll)

  fastify.get('/tasks/:id', {
    preHandler: authenticate,
    schema: {
      tags: ['Tasks'],
      summary: 'Buscar tarefa por ID',
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        properties: { id: { type: 'string' } },
      },
      response: {
        200: {
          description: 'Detalhes da tarefa',
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            status: { type: 'string' },
            priority: { type: 'string' },
            dueDate: { type: 'string', format: 'date-time' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        401: { description: 'Nao autorizado' },
        403: { description: 'Sem permissao' },
        404: { description: 'Tarefa nao encontrada' },
      },
    },
  }, getById)

  fastify.post('/tasks', {
    preHandler: authenticate,
    schema: {
      tags: ['Tasks'],
      summary: 'Criar nova tarefa',
      security: [{ bearerAuth: [] }],
      body: {
        type: 'object',
        required: ['title'],
        properties: {
          title: { type: 'string', minLength: 1 },
          description: { type: 'string' },
          status: { type: 'string', enum: ['PENDING', 'IN_PROGRESS', 'DONE', 'CANCELLED'] },
          priority: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'] },
          dueDate: { type: 'string' },
          categoryId: { type: 'string' },
          assigneeId: { type: 'string' },
        },
      },
      response: {
        201: {
          description: 'Tarefa criada com sucesso',
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            status: { type: 'string' },
            priority: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        401: { description: 'Nao autorizado' },
      },
    },
  }, create)

  fastify.put('/tasks/:id', {
    preHandler: authenticate,
    schema: {
      tags: ['Tasks'],
      summary: 'Atualizar tarefa',
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        properties: { id: { type: 'string' } },
      },
      body: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          status: { type: 'string', enum: ['PENDING', 'IN_PROGRESS', 'DONE', 'CANCELLED'] },
          priority: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'] },
          dueDate: { type: 'string' },
          categoryId: { type: 'string' },
          assigneeId: { type: 'string' },
        },
      },
      response: {
        200: {
          description: 'Tarefa atualizada com sucesso',
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            status: { type: 'string' },
            priority: { type: 'string' },
          },
        },
        401: { description: 'Nao autorizado' },
        403: { description: 'Somente o criador pode editar' },
        404: { description: 'Tarefa nao encontrada' },
      },
    },
  }, update)

  fastify.delete('/tasks/:id', {
    preHandler: authenticate,
    schema: {
      tags: ['Tasks'],
      summary: 'Deletar tarefa',
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        properties: { id: { type: 'string' } },
      },
      response: {
        204: { description: 'Tarefa excluida com sucesso' },
        401: { description: 'Nao autorizado' },
        403: { description: 'Somente o criador pode excluir' },
        404: { description: 'Tarefa nao encontrada' },
      },
    },
  }, remove)

  fastify.post('/tasks/:id/collaborators', {
    preHandler: authenticate,
    schema: {
      tags: ['Tasks'],
      summary: 'Adicionar colaborador à tarefa',
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        properties: { id: { type: 'string' } },
      },
      body: {
        type: 'object',
        required: ['userId'],
        properties: {
          userId: { type: 'string' },
        },
      },
    },
  }, addCollaborator)
}

module.exports = taskRoutes
