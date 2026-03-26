const { getSummary } = require('../controllers/reportController')
const { authenticate } = require('../middlewares/auth')

async function reportRoutes(fastify) {
  fastify.get('/reports/summary', {
    preHandler: authenticate,
    schema: {
      tags: ['Reports'],
      summary: 'Resumo de tarefas por status, prioridade e categoria',
      security: [{ bearerAuth: [] }],
      response: {
        200: {
          description: 'Resumo geral do sistema',
          type: 'object',
          properties: {
            total: { type: 'integer', description: 'Total de tarefas' },
            completed: { type: 'integer', description: 'Tarefas concluidas' },
            overdue: { type: 'integer', description: 'Tarefas vencidas' },
            byStatus: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  status: { type: 'string' },
                  _count: { type: 'object', properties: { id: { type: 'integer' } } },
                },
              },
            },
            byPriority: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  priority: { type: 'string' },
                  _count: { type: 'object', properties: { id: { type: 'integer' } } },
                },
              },
            },
          },
        },
        401: { description: 'Nao autorizado' },
      },
    },
  }, getSummary)
}

module.exports = reportRoutes
