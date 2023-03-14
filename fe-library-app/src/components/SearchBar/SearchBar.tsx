import { useState } from 'react'

import Filter from '../Filter/Filter'
import Search from '../Search/Search'
import style from './SearchBar.module.css'

interface SearchBarProps{
  searchChange: (newInput: string) => void
}

const SearchBar = (props: SearchBarProps) => {
  const [ showFilter, setShowFilter ] = useState(false)

  const onFilterHandler = () => {
    setShowFilter((pervState) => !pervState)
  }

  const logoutHandler = () => {
    sessionStorage.removeItem('token')
  }

  return (
    <div className={style.search}>
      <Search searchChange={props.searchChange}/>
      <button onClick={onFilterHandler}>Filter</button>
      <button>^</button>
      <div>
        <a className={style.logout_link} href='./login' onClick={logoutHandler}>{sessionStorage.getItem('token') != null ? 'Logout' : 'Login'}</a>
      </div>
      {showFilter && <Filter />}
    </div>
  )
}

export default SearchBar
