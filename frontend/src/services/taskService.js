import api from '@/plugins/axios'

export default {
  async getAll(filters = {}) {
    // Remove filtros nulos antes de enviar — evita ?status=null na URL
    const params = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== null && v !== undefined)
    )
    const response = await api.get('/tasks', { params })
    return response.data
  },

  async getById(id) {
    const response = await api.get(`/tasks/${id}`)
    return response.data
  },

  async create(data) {
    const response = await api.post('/tasks', data)
    return response.data
  },

  async update(id, data) {
    const response = await api.put(`/tasks/${id}`, data)
    return response.data
  },

  async remove(id) {
    await api.delete(`/tasks/${id}`)
  },

  async addCollaborator(taskId, userId) {
    const response = await api.post(`/tasks/${taskId}/collaborators`, { userId })
    return response.data
  },
}
