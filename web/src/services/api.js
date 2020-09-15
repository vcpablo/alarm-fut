import axios from 'axios'

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_REST_API_URL,
  timeout: process.env.TIMEOUT_MILLISECONDS
})

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers['Cache-Control'] = 'no-cache'
  config.headers['Pragma'] = 'no-cache'
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

apiInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // eslint-disable-next-line no-console
    console.error('API error:', error)
    return Promise.reject(error)
  }
)

export default apiInstance
