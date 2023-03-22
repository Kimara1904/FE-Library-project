import axios from 'axios'

import { baseUrl } from './ServiceConfig'

export interface RentalUserInfoResponse{
    Id: number,
    Email: string,
    FirstName: string,
    LastName: string
}

export interface RentHistoryResponse{
    Id: number,
    User: RentalUserInfoResponse,
    RentDate: Date,
    IsReturned: boolean
}

export const rentBook = (id: string) => {
  return axios.post<string>(baseUrl + `/api/Rental/rent/${id}`)
}

export const returnBook = (id: string) => {
  return axios.post<string>(baseUrl + `/api/Rental/return/${id}`)
}

export const getRentalHistory = (id: string) => {
  return axios.get<RentHistoryResponse[]>(baseUrl + `/api/Rental/book-history/${id}`)
}
