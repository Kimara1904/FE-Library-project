import axios from 'axios'

import { baseUrl } from './ServiceConfig'

interface WhereObject{
    Field: string,
    Value: string,
    Operation: number
}

export interface GetBooksRequest{
    Where?: WhereObject[],
    Order?: string[],
    PageNumber: number,
    PageLength: number
}

interface AuthorBookResponse{
    Id: number,
    FirstName: string,
    LastName: string
}

export interface GetBookResponse{
    Id: number,
    Title: string,
    Description: string,
    Isbn: string
    Cover: string,
    PublishDate: Date,
    Authors: AuthorBookResponse[]
}

export const getBooks = (request: GetBooksRequest) => {
  return axios.get<GetBookResponse[]>(baseUrl + '/api/Books/paged', {
    params: request
  })
}
