const reportRepository = require('../repositories/reportRepository')

async function getSummary() {
  const { totalTasks, byStatus, byPriority, byCategory, overdue } =
    await reportRepository.getSummary()

  // Formata os dados para o frontend consumir facilmente
  return {
    total: totalTasks,
    overdue,
    byStatus: byStatus.map((s) => ({
      status: s.status,
      count: s._count.status,
    })),
    byPriority: byPriority.map((p) => ({
      priority: p.priority,
      count: p._count.priority,
    })),
    byCategory: byCategory.map((c) => ({
      categoryId: c.categoryId,
      count: c._count.categoryId,
    })),
  }
}

module.exports = { getSummary }
