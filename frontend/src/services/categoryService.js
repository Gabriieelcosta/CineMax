import api from '@/plugins/axios'

export default {
  async getAll() {
    const response = await api.get('/categories')
    return response.data
  },

  async create(data) {
    const response = await api.post('/categories', data)
    return response.data
  },

  async update(id, data) {
    const response = await api.put(`/categories/${id}`, data)
    return response.data
  },

  async remove(id) {
    await api.delete(`/categories/${id}`)
  },
}
