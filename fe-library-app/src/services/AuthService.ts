import axios, { AxiosResponse } from 'axios'

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
  return axios.post<LoginResponse>('https://library-practice-app.azurewebsites.net/api/Auth/login', loginInfo)
}
