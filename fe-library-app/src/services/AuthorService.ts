import axios from 'axios'

import { baseUrl } from './ServiceConfig'

export interface GetAuthorResponse{
  Id: number,
  FirstName: string,
  LastName: string
}

export interface PostAuthorRequest{
  FirstName: string,
  LastName: string
}

export const getAuthors = () => {
  return axios.get<GetAuthorResponse[]>(baseUrl + '/api/Authors')
}

export const createAuthor = (request: PostAuthorRequest) => {
  return axios.post<string>(baseUrl + '/api/Authors', request)
}
