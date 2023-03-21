import axios, { AxiosResponse } from 'axios'

import { baseUrl } from './ServiceConfig'

export interface LoginResponse{
    AccessToken: string,
    RefreshToken: string,
    Expiration: Date
}

export const isThereToken = () => {
  return sessionStorage.getItem('token') !== null
}

export const login = (Email: string, Password: string): Promise<AxiosResponse<LoginResponse>> => {
  const loginInfo = {
    Email,
    Password
  }
  return axios.post<LoginResponse>(baseUrl + '/api/Auth/login', loginInfo)
}
