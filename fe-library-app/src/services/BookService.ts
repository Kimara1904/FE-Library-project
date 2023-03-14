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

export interface BookItemResponse{
    Id: number,
    Title: string,
    Description: string,
    Isbn: string
    Cover: string,
    PublishDate: Date,
    Authors: AuthorBookResponse[]
}

export interface GetBookResponse{
  Items: BookItemResponse[],
  TotalCount: number
}

const params2Query = (request: GetBooksRequest) => {
  let result = '?'
  result += 'PageNumber=' + request.PageNumber.toString()
  result += '&PageLength=' + request.PageLength.toString()
  request.Where?.forEach((where) => {
    if (where.Value !== '' && where.Value != null) {
      result += `&where=${JSON.stringify(where)}`
    }
  })
  request.Order?.forEach((order) => {
    result += '&Order=' + order
  })
  return result
}

export const getBooks = (request: GetBooksRequest) => {
  return axios.get<GetBookResponse>(baseUrl + '/api/Books/paged' + params2Query(request))
}
