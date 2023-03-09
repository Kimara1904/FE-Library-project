import styles from './HomePage.module.css'
import SearchBar from '../../SearchBar/SearchBar'
import BookList from '../../BookList/BookList'
import { GetBookResponse } from '../../../services/BookService'

const HomePage = () => {
  const bookList: GetBookResponse[] = [
    {
      id: 1,
      title: 'Dummy Book',
      description: 'Dummy Description',
      isbn: 'Dummy isbn',
      cover: '',
      publishDate: new Date(Date.now()),
      authors: [
        {
          id: 1,
          firstName: 'Dummy author',
          lastName: 'One'
        },
        {
          id: 2,
          firstName: 'Dummy author',
          lastName: 'Two'
        }
      ]
    }
  ]

  return (
    <div className={styles.home}>
      <div className={styles.screen_search}>
        <SearchBar />
      </div>
      <h1 className={styles.home_content}>Books: </h1>
      <div>
        <BookList books={bookList}/>
      </div>
    </div>
  )
}

export default HomePage
