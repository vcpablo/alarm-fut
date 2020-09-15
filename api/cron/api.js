require('dotenv').config()
const axios = require('axios')

const axiosInstance = axios.create({
  baseURL: process.env.API_URL
})

axiosInstance.interceptors.request.use(config => ({
  ...config,
  headers: {
    ...config.headers,
    ['X-Auth-Token']: process.env.API_TOKEN
  }
}))

module.exports = axiosInstance
