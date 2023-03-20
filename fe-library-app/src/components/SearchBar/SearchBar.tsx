import { useState } from 'react'

import { getToken } from '../../services/AuthService'
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

  const handleClickFilter = () => {
    setShowFilter((pervState) => !pervState)
    setShowOrder(false)
  }

  const handleClickOrder = () => {
    setShowOrder((pervState) => !pervState)
    setShowFilter(false)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token')
  }

  const handleFilterHide = () => {
    setShowFilter(false)
  }

  const handleOrderHide = () => {
    setShowOrder(false)
  }

  return (
    <div className={style.search}>
      <Search searchChange={props.searchChange}/>
      <button onClick={handleClickFilter}>Filter</button>
      <button onClick={handleClickOrder}>^</button>
      <div>
        <a className={style.logout_link} href='./login' onClick={handleLogout}>{getToken() != null ? 'Logout' : 'Login'}</a>
      </div>
      <Filter filterChange={props.filterChange} switchShowFilter={showFilter} hideFilter={handleFilterHide}/>
      <Order orderChange={props.orderChange} switchShowOrder={showOrder} hideOrder={handleOrderHide}/>
    </div>
  )
}

export default SearchBar
