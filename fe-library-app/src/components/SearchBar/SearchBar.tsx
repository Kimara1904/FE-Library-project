import { useState } from 'react'

import { Filters } from '../AppRouter/pages/HomePage'
import Filter from '../Filter/Filter'
import Order from '../Order/Order'
import Search from '../Search/Search'
import style from './SearchBar.module.css'

interface SearchBarProps{
  searchChange: (newInput: string) => void
  filterChange: (filterData: Filters) => void
  orderChange: (orderData: string[]) => void
}

const SearchBar = (props: SearchBarProps) => {
  const [ showFilter, setShowFilter ] = useState(false)
  const [ showOrder, setShowOrder ] = useState(false)

  const clickFilterHandler = () => {
    setShowFilter((pervState) => !pervState)
    setShowOrder(false)
  }

  const clickOrderHandler = () => {
    setShowOrder((pervState) => !pervState)
    setShowFilter(false)
  }

  const logoutHandler = () => {
    sessionStorage.removeItem('token')
  }

  const hideFilter = () => {
    setShowFilter(false)
  }

  const hideOrder = () => {
    setShowOrder(false)
  }

  return (
    <div className={style.search}>
      <Search searchChange={props.searchChange}/>
      <button onClick={clickFilterHandler}>Filter</button>
      <button onClick={clickOrderHandler}>^</button>
      <div>
        <a className={style.logout_link} href='./login' onClick={logoutHandler}>{sessionStorage.getItem('token') != null ? 'Logout' : 'Login'}</a>
      </div>
      <Filter filterChange={props.filterChange} switchShowFilter={showFilter} hideFilter={hideFilter}/>
      <Order orderChange={props.orderChange} switchShowOrder={showOrder} hideOrder={hideOrder}/>
    </div>
  )
}

export default SearchBar
