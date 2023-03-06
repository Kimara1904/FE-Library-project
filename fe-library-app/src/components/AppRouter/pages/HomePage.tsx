import { useState } from 'react'

import Search from '../../Search/Search'
import Filter from '../../Filter/Filter'
import styles from './HomePage.module.css'

const HomePage = () => {
  const [ showFilter, setShowFilter ] = useState<boolean>(false)

  const onFilterHandler = () => {
    setShowFilter((pervState) => !pervState)
  }
  return (
    <div className={styles.home}>
      <Search />
      <button onClick={onFilterHandler}>Filter</button>
      <button>^</button>
      {showFilter && <Filter/>}
      <div>Home</div>
    </div>
  )
}

export default HomePage
