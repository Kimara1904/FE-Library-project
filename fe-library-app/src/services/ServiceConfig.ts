import axios from 'axios'

import { getToken } from './AuthService'

export const baseUrl: string = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : ''

export const configureAxiosRequestInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = getToken()
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}
