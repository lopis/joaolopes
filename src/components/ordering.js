import React from 'react'
import orderStyles from './ordering.module.css'

const Sorter = ({ type, onChange, active }) => (
  <a
    onClick={() => onChange(type)}
    className={
      orderStyles.btn + ' ' + (active === type ? orderStyles.active : '')
    }
  >
    {type}
  </a>
)

const Ordering = props => (
  <div className={orderStyles.container}>
    sort by:
    <Sorter type="order" {...props} />
    <Sorter type="radius" {...props} />
  </div>
)

export default Ordering
