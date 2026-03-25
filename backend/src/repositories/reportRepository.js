const prisma = require('../config/database')

async function getSummary() {
  const [totalTasks, byStatus, byPriority, byCategory, overdue] = await Promise.all([
    // Total geral de tarefas
    prisma.task.count(),

    // Agrupado por status
    prisma.task.groupBy({
      by: ['status'],
      _count: { status: true },
    }),

    // Agrupado por prioridade
    prisma.task.groupBy({
      by: ['priority'],
      _count: { priority: true },
    }),

    // Tarefas por categoria
    prisma.task.groupBy({
      by: ['categoryId'],
      where: { categoryId: { not: null } },
      _count: { categoryId: true },
    }),

    // Tarefas atrasadas (com data de entrega no passado e não concluídas)
    prisma.task.count({
      where: {
        dueDate: { lt: new Date() },
        status: { notIn: ['DONE', 'CANCELLED'] },
      },
    }),
  ])

  return { totalTasks, byStatus, byPriority, byCategory, overdue }
}

module.exports = { getSummary }
