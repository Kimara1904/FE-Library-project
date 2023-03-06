import styles from './Search.module.css'

const Search = () => {
  return (
    <span className={styles.search}>
      <input type='text' placeholder='Search here' />
    </span>
  )
}

export default Search
