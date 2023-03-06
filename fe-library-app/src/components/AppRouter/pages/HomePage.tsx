import styles from './HomePage.module.css'
import BookSearch from '../../BookSearch/BookSearch'

const HomePage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.screen_search}>
        <BookSearch />
      </div>
      <div className={styles.home_content}>Home</div>
    </div>
  )
}

export default HomePage
