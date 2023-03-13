import { useState } from 'react'

import Filter from '../Filter/Filter'
import Order from '../Order/Order'
import Search from '../Search/Search'
import style from './SearchBar.module.css'

interface SearchBarProps{
  searchChange: (newInput: string) => void
}

const SearchBar = (props: SearchBarProps) => {
  const [ showFilter, setShowFilter ] = useState(false)
  const [ showOrder, setShowOrder ] = useState(false)

  const clickFilterHandler = () => {
    setShowFilter((pervState) => !pervState)
  }

  const clickOrderHandler = () => {
    setShowOrder((pervState) => !pervState)
  }

  const logoutHandler = () => {
    sessionStorage.removeItem('token')
  }

  return (
    <div className={style.search}>
      <Search searchChange={props.searchChange}/>
      <button onClick={clickFilterHandler}>Filter</button>
      <button onClick={clickOrderHandler}>^</button>
      <div>
        <a className={style.logout_link} href='./login' onClick={logoutHandler}>{sessionStorage.getItem('token') != null ? 'Logout' : 'Login'}</a>
      </div>
      {showFilter && <Filter />}
      {showOrder && <Order />}
    </div>
  )
}

export default SearchBar
