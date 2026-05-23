import axios from 'axios'
import toast from 'react-hot-toast'

// Use environment variable for the backend URL, fallback to local proxy if undefined
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const normalizeToken = (value) => {
  if (!value) return null
  if (value === '[object Object]') return null

  const trimmed = value.trim()
  const unwrapped = trimmed.startsWith('"') && trimmed.endsWith('"')
    ? trimmed.slice(1, -1)
    : trimmed

  return unwrapped.replace(/^Bearer\s+/i, '')
}

const getAccessToken = () =>
  normalizeToken(localStorage.getItem('nexafort_token') || localStorage.getItem('accessToken'))

const getRefreshToken = () =>
  normalizeToken(localStorage.getItem('nexafort_refresh') || localStorage.getItem('refreshToken'))

api.interceptors.request.use(config => {
  const token = getAccessToken()
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json'
  }
  config.headers.Accept = 'application/json'
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
        const refresh = getRefreshToken()
        // Use the absolute path or the base URL for the refresh call
        const res = await axios.post(`${baseURL}/auth/refresh`, { refreshToken: refresh })
        const { accessToken, refreshToken } = res.data.data
        localStorage.setItem('nexafort_token', accessToken)
        localStorage.setItem('accessToken', accessToken)
        if (refreshToken) {
          localStorage.setItem('nexafort_refresh', refreshToken)
          localStorage.setItem('refreshToken', refreshToken)
        }
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
