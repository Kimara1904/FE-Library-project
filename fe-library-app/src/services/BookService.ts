import axios from 'axios'

import { baseUrl } from './ServiceConfig'

interface WhereObject{
    field: string,
    value: string,
    operation: number
}

export interface GetBooksRequest{
    where?: WhereObject[],
    order?: string[],
    pageNumber: number,
    pageLength: number
}

interface AuthorBookResponse{
    id: number,
    firstName: string,
    lastName: string
}

export interface GetBookResponse{
    id: number,
    title: string,
    description: string,
    isbn: string
    cover: string,
    publishDate: Date,
    authors: AuthorBookResponse[]
}

export const getBooks = (request: GetBooksRequest) => {
  return axios.get<GetBookResponse[]>(baseUrl + '/api/Books/paged', {
    params: request
  })
}
