import axios, { AxiosPromise } from 'axios'

import { baseUrl } from './ServiceConfig'

interface WhereObject{
    field: string,
    value: string,
    operation: number
}

export interface GetBooksRequest{
    where: WhereObject[],
    order: string[],
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

export const getBooks = (request: GetBooksRequest= { where: [], order: [], pageNumber: 1, pageLength: 25 }): Promise<AxiosPromise<GetBookResponse[]>> => {
  return axios.get(baseUrl + '/api/Books/paged', {
    params: request
  })
}
