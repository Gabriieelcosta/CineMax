const categoryRepository = require('../repositories/categoryRepository')
const { NotFoundError, ForbiddenError } = require('../utils/errors')

async function getAll() {
  return categoryRepository.findAll()
}

async function create(userId, { name, color }) {
  return categoryRepository.create({ name, color, userId })
}

async function update(userId, categoryId, data) {
  const category = await categoryRepository.findById(categoryId)
  if (!category) throw new NotFoundError('Categoria não encontrada')
  if (category.userId !== userId) throw new ForbiddenError('Acesso negado')

  return categoryRepository.update(categoryId, data)
}

async function remove(userId, categoryId) {
  const category = await categoryRepository.findById(categoryId)
  if (!category) throw new NotFoundError('Categoria não encontrada')
  if (category.userId !== userId) throw new ForbiddenError('Acesso negado')

  return categoryRepository.remove(categoryId)
}

module.exports = { getAll, create, update, remove }
