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
  const [ pageNumber, setPageNumber ] = useState(1)
  const [ isResponseEmpty, setIsResponseEmpty ] = useState(true)

  const getBooksPageAppend = (request: GetBooksRequest) => {
    getBooks(request)
      .then((response) => {
        setBookList(prevList => [ ...prevList, ...response.data.Items ])
        setIsResponseEmpty(request.PageNumber * request.PageLength >= response.data.TotalCount)
      })
      .catch(() => alert('Something went wrong!'))
  }

  const getBooksPage = (request: GetBooksRequest) => {
    getBooks(request)
      .then((response) => {
        setBookList(response.data.Items)
        setIsResponseEmpty(request.PageNumber * request.PageLength >= response.data.TotalCount)
      })
      .catch(() => alert('Something went wrong!'))
  }

  useEffect(() => {
    getBooksPageAppend({ PageNumber: pageNumber, PageLength: 12, Where: [ { Field: 'Title', Value: search, Operation: 2 } ] })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ pageNumber ])

  useEffect(() => {
    setBookList([])
    getBooksPage({
      PageNumber: 1,
      PageLength: 12,
      Where: [
        { Field: 'Title', Value: search, Operation: 2 },
        { Field: 'Description', Value: filters?.description as string, Operation: 2 },
        { Field: 'Isbn', Value: filters?.isbn as string, Operation: 2 },
        { Field: 'Authors.FirstName', Value: filters?.authorFirstName as string, Operation: 2 },
        { Field: 'Authors.LastName', Value: filters?.authorLastName as string, Operation: 2 }
      ]
    })
    setPageNumber(2)
  }, [ search, filters ] )

  const handleNextPage = () => {
    setPageNumber(prevPage => prevPage + 1)
  }

  const searchChangeHandler = (newInput: string): void => {
    setSearch(newInput)
  }

  const filterChangeHandler = (filterData: Filters) => {
    setFilters(filterData)
  }

  return (
    <div className={styles.home}>
      <div className={styles.screen_search}>
        <SearchBar searchChange={searchChangeHandler} filterChange={filterChangeHandler}/>
      </div>
      <h1 className={styles.home_content}>Books: </h1>
      <div className={styles.inf_wrap}>
        <InfiniteScroll
          dataLength={bookList.length}
          next={handleNextPage}
          hasMore={!isResponseEmpty}
          loader={<h4>Loading...</h4>}
          className={styles.book}
          endMessage={<h4>You saw all books :)</h4>}
          scrollThreshold='75%'
        >
          <BookList books={bookList}/>
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default HomePage
