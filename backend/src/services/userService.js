const userRepository = require('../repositories/userRepository')
const { hashPassword } = require('../utils/hash')
const { NotFoundError } = require('../utils/errors')

async function getProfile(userId) {
  const user = await userRepository.findById(userId)
  if (!user) throw new NotFoundError('Usuário não encontrado')
  return user
}

async function updateProfile(userId, { name, password }) {
  const data = {}

  if (name) data.name = name
  if (password) data.password = await hashPassword(password)

  return userRepository.update(userId, data)
}

async function getAll() {
  return userRepository.findAll()
}

module.exports = { getProfile, updateProfile, getAll }
