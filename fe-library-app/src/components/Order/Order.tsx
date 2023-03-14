import { useState } from 'react'

import styles from './Order.module.css'

interface OrderProps{
  orderChange: (orderData: string[]) => void,
  switchShowOrder: boolean,
  hideOrder: () => void
}

const Order = (props: OrderProps) => {
  const [ titleOrder, setTitleOrder ] = useState('')
  const [ descriptionOrder, setDescription ] = useState('')
  const [ isbnOrder, setIsbnOrder ] = useState('')
  const [ publishDateOrder, setPublishDateOrder ] = useState('')

  const sortHandler = () => {
    const orders: string[] = []
    if (titleOrder !== '') {
      orders.push('Title ' +  titleOrder)
    }
    if (descriptionOrder !== '') {
      orders.push('Description ' +  descriptionOrder)
    }
    if (isbnOrder !== '') {
      orders.push('Isbn ' +  isbnOrder)
    }
    if (publishDateOrder !== '') {
      orders.push('PublishDate ' +  publishDateOrder)
    }

    props.orderChange(orders)
    props.hideOrder()
  }

  const clearOrder = () => {
    setTitleOrder('')
    setDescription('')
    setIsbnOrder('')
    setPublishDateOrder('')

    props.orderChange([])
    props.hideOrder()
  }

  return (
    <div className={props.switchShowOrder ? styles.order_form : styles.order_hidden}>
      <div className={styles.order_row}>
        <label>Title:</label>
        <div className={styles.order_radio}>
          <div>
            <label>ASC</label>
            <input
              type='radio'
              name='title'
              checked={titleOrder === 'ASC'}
              onChange={() => setTitleOrder('ASC')}
            />
          </div>
          <div>
            <label>DESC</label>
            <input
              type='radio'
              name='title'
              checked={titleOrder === 'DESC'}
              onChange={() => setTitleOrder('DESC')}
            />
          </div>
        </div>
      </div>
      <div className={styles.order_row}>
        <label>Description:</label>
        <div className={styles.order_radio}>
          <div>
            <label>ASC</label>
            <input
              type='radio'
              name='desc'
              checked={descriptionOrder === 'ASC'}
              onChange={() => setDescription('ASC')}
            />
          </div>
          <div>
            <label>DESC</label>
            <input
              type='radio'
              name='desc'
              checked={descriptionOrder === 'DESC'}
              onChange={() => setDescription('DESC')}
            />
          </div>
        </div>
      </div>
      <div className={styles.order_row}>
        <label>ISBN:</label>
        <div className={styles.order_radio}>
          <div>
            <label>ASC</label>
            <input
              type='radio'
              name='isbn'
              checked={isbnOrder === 'ASC'}
              onChange={() => setIsbnOrder('ASC')}
            />
          </div>
          <div>
            <label>DESC</label>
            <input
              type='radio'
              name='isbn'
              checked={isbnOrder === 'DESC'}
              onChange={() => setIsbnOrder('DESC')}
            />
          </div>
        </div>
      </div>
      <div className={styles.order_row}>
        <label>Publish Date:</label>
        <div className={styles.order_radio}>
          <div>
            <label>ASC</label>
            <input
              type='radio'
              name='publishDate'
              checked={publishDateOrder === 'ASC'}
              onChange={() => setPublishDateOrder('ASC')}
            />
          </div>
          <div>
            <label>DESC</label>
            <input
              type='radio'
              name='publishDate'
              checked={publishDateOrder === 'DESC'}
              onChange={() => setPublishDateOrder('DESC')}
            />
          </div>
        </div>
      </div>
      <button onClick={sortHandler}>Sort</button>
      <button onClick={clearOrder}>Clear</button>
    </div>
  )
}

export default Order
