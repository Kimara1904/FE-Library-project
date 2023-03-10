import { useEffect, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'

import styles from './HomePage.module.css'
import SearchBar from '../../SearchBar/SearchBar'
import BookList from '../../BookList/BookList'
import { GetBookResponse, getBooks, GetBooksRequest } from '../../../services/BookService'

const HomePage = () => {
  const [ bookList, setBookList ] = useState<GetBookResponse[]>([])
  const [ pageNumber, setPageNumber ] = useState(1)
  const [ isResponseEmpty, setIsResponseEmpty ] = useState(true)

  const getBooksPage = (request: GetBooksRequest) => {
    getBooks(request)
      .then((response) => {
        setBookList(prevList => [ ...prevList, ...response.data ])
        setIsResponseEmpty(response.data.length === 0)
      })
      .catch(() => alert('Something went wrong!'))
  }

  useEffect(() => {
    getBooksPage({ pageNumber: pageNumber, pageLength: 9 })
  }, [ pageNumber ])

  const handleNextPage = () => {
    setPageNumber(prevPage => prevPage + 1)
  }

  return (
    <div className={styles.home}>
      <div className={styles.screen_search}>
        <SearchBar />
      </div>
      <h1 className={styles.home_content}>Books: </h1>
      <div className={styles.inf_wrap}>
        <InfiniteScroll
          dataLength={bookList.length}
          next={handleNextPage}
          hasMore={true}
          loader={<h4>{isResponseEmpty ? 'You saw all books :)' : 'Loading...'}</h4>}
          className={styles.book}
        >
          <BookList books={bookList}/>
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default HomePage
