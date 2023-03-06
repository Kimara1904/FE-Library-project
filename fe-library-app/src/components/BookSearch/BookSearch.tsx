import { useState } from 'react'

import Filter from '../Filter/Filter'
import Search from '../Search/Search'
import style from './BookSearch.module.css'

const BookSearch = () => {
  const [ showFilter, setShowFilter ] = useState<boolean>(false)

  const onFilterHandler = () => {
    setShowFilter((pervState) => !pervState)
  }

  return (
    <div className={style.search}>
      <Search />
      <button onClick={onFilterHandler}>Filter</button>
      <button>^</button>
      <a href='./'>Logout</a>
      {showFilter && <Filter />}
    </div>
  )
}

export default BookSearch
