import React from 'react'
import PropTypes from 'prop-types'
import './TaskFilter.scss'

const filters = [
  { name: 'all', label: 'All' },
  { name: 'active', label: 'Active' },
  { name: 'completed', label: 'Completed' },
]

export default function TaskFilter({ toggleFilter, classFilter }) {
  return (
    <ul className="filters">
      {filters.map(({ name, label }) => (
        <li key={name}>
          <button
            type="button"
            className={classFilter === name ? 'selected' : ''}
            onClick={() => toggleFilter(name)}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  )
}

TaskFilter.propTypes = {
  toggleFilter: PropTypes.func.isRequired,
  classFilter: PropTypes.string.isRequired,
}
