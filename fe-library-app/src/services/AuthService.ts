import axios, { AxiosResponse } from 'axios'

import { baseUrl } from './ServiceConfig'

export interface LoginResponse{
    accessToken: string,
    refreshToken: string,
    expiration: Date
}

export const login = (email: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
  const loginInfo = {
    email,
    password
  }
  return axios.post<LoginResponse>(baseUrl + '/api/Auth/login', loginInfo)
}
