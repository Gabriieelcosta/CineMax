import api from '@/plugins/axios'

export default {
  async getAll() {
    const response = await api.get('/users')
    return response.data
  },
}
