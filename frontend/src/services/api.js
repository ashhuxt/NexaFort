import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({ baseURL: '/api/v1', timeout: 10000 })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('nexafort_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const refresh = localStorage.getItem('nexafort_refresh')
        const res = await axios.post('/api/v1/auth/refresh', { refreshToken: refresh })
        const { accessToken } = res.data.data
        localStorage.setItem('nexafort_token', accessToken)
        original.headers.Authorization = `Bearer ${accessToken}`
        return api(original)
      } catch {
        localStorage.clear()
        window.location.href = '/login'
      }
    }
    const msg = err.response?.data?.message
    if (msg && typeof msg === 'string') toast.error(msg)
    return Promise.reject(err)
  }
)

export default api