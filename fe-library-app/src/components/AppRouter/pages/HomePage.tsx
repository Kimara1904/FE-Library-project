import styles from './HomePage.module.css'
import SearchBar from '../../SearchBar/SearchBar'

const HomePage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.screen_search}>
        <SearchBar />
      </div>
      <div className={styles.home_content}>Home</div>
    </div>
  )
}

export default HomePage
