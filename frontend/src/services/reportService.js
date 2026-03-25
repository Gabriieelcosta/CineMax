import api from '@/plugins/axios'

export default {
  async getSummary() {
    const response = await api.get('/reports/summary')
    return response.data
  },
}
