import { useEffect, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'

import styles from './HomePage.module.css'
import SearchBar from '../../SearchBar/SearchBar'
import BookList from '../../BookList/BookList'
import { BookItemResponse, getBooks, GetBooksRequest } from '../../../services/BookService'

export interface Filters{
  description: string,
  isbn: string,
  authorFirstName: string,
  authorLastName: string
}

const HomePage = () => {
  const [ bookList, setBookList ] = useState<BookItemResponse[]>([])
  const [ search, setSearch ] = useState('')
  const [ filters, setFilters ] = useState<Filters>()
  const [ orders, setOrders ] = useState<string[]>([])
  const [ pageNumber, setPageNumber ] = useState(1)
  const [ isResponseEmpty, setIsResponseEmpty ] = useState(true)

  const getBooksPage = (request: GetBooksRequest) => {
    getBooks(request)
      .then((response) => {
        if (request.PageNumber === 1) {
          setBookList(response.data.Items)
        }else{
          setBookList(prevList => [ ...prevList, ...response.data.Items ])
        }
        setIsResponseEmpty(request.PageNumber * request.PageLength >= response.data.TotalCount)
      })
      .catch(() => alert('Something went wrong!'))
  }

  useEffect(() => {
    getBooksPage({
      PageNumber: pageNumber,
      PageLength: 15,
      Order: orders,
      Where: [
        { Field: 'Title', Value: search, Operation: 2 },
        { Field: 'Description', Value: filters?.description as string, Operation: 2 },
        { Field: 'Isbn', Value: filters?.isbn as string, Operation: 2 },
        { Field: 'Authors.FirstName', Value: filters?.authorFirstName as string, Operation: 2 },
        { Field: 'Authors.LastName', Value: filters?.authorLastName as string, Operation: 2 }
      ]
    })
  }, [ pageNumber, search, filters, orders ])

  useEffect(() => {
    setPageNumber(1)
  }, [ search, filters, orders ] )

  const handleNextPage = () => {
    setPageNumber(prevPage => prevPage + 1)
  }

  const handleSearchChange = (newInput: string): void => {
    setSearch(newInput)
  }

  const handleFilterChange = (filterData: Filters) => {
    setFilters(filterData)
  }

  const handleOrderChange = (orderData: string[]) => {
    setOrders(orderData)
  }

  const handleBookListChange = () => {
    getBooksPage({
      PageNumber: 1,
      PageLength: 15,
      Order: orders,
      Where: [
        { Field: 'Title', Value: search, Operation: 2 },
        { Field: 'Description', Value: filters?.description as string, Operation: 2 },
        { Field: 'Isbn', Value: filters?.isbn as string, Operation: 2 },
        { Field: 'Authors.FirstName', Value: filters?.authorFirstName as string, Operation: 2 },
        { Field: 'Authors.LastName', Value: filters?.authorLastName as string, Operation: 2 }
      ]
    })
  }

  return (
    <div className={styles.home}>
      <div className={styles.screen_search}>
        <SearchBar searchChange={handleSearchChange} filterChange={handleFilterChange} orderChange={handleOrderChange} />
      </div>
      <h1 className={styles.home_content}>Books: </h1>
      <div className={styles.inf_wrap}>
        {bookList.length > 0 ? (
          <InfiniteScroll
            dataLength={bookList.length}
            next={handleNextPage}
            hasMore={!isResponseEmpty}
            loader={<h4>Loading...</h4>}
            className={styles.book}
            endMessage={<h4>You saw all books :)</h4>}
            scrollThreshold='75%'
          >
            <BookList books={bookList} onChange={handleBookListChange} />
          </InfiniteScroll>
        ) : (
          <h4>There is no books</h4>
        )}
      </div>
    </div>
  )
}

export default HomePage
