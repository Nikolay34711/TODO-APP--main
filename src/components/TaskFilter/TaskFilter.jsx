import React from 'react'
import PropTypes from 'prop-types'
import './TaskFilter.css'

export default function TaskFilter({ filterName, filter }) {
  const filters = [
    { name: 'All', value: 'all' },
    { name: 'Active', value: 'active' },
    { name: 'Completed', value: 'completed' },
  ]

  return (
    <ul className="filters">
      {filters.map((el) => (
        <li key={el.value}>
          <button type="button" className={filter === el.value ? 'selected' : ''} onClick={() => filterName(el.value)}>
            {el.name}
          </button>
        </li>
      ))}
    </ul>
  )
}

TaskFilter.propTypes = {
  filterName: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
}
