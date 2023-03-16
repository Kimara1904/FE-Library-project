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

interface AuthorBookByIdResponse{
  Id: number,
  Firstname: string,
  Lastname: string
}

export interface BookItemResponse{
    Id: number,
    Title: string,
    Description: string,
    Isbn: string,
    Quantity: number
    Cover: string,
    PublishDate: Date,
    Authors: AuthorBookResponse[]
}

export interface BookByIdItemResponse{
  Id: number,
  Title: string,
  Description: string,
  ISBN: string,
  Quantity: number
  Cover: string,
  PublishDate: Date,
  Authors: AuthorBookByIdResponse[]
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

export const createBook = (request: FormData) => {
  return axios.post<string>(baseUrl + '/api/Books', request)
}

export const getBookById = (id: string) => {
  return axios.get<BookByIdItemResponse>(baseUrl + '/api/Books/' + id)
}

export const modifyBook = (request: FormData) => {
  return axios.put<string>(baseUrl + '/api/Books', request)
}
