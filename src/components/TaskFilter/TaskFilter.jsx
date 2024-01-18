import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TaskFilter.css'

// eslint-disable-next-line react/prefer-stateless-function
export default class TaskFilter extends Component {
  render() {

    const { filterName, filter } = this.props

    return (

      <ul className="filters">
        <li>

          <button type="button" className={filter === 'all' ? 'selected' : ''} onClick={() => filterName('all')}>
            All
          </button>

        </li>
        <li>

          <button type="button" className={filter === 'active' ? 'selected' : ''} onClick={() => filterName('active')}>
            Active
          </button>

        </li>
        <li>

          <button
            type="button"
            className={filter === 'completed' ? 'selected' : ''}
            onClick={() => filterName('completed')}
          >
            Completed
          </button>
          
        </li>
      </ul>
    )
  }
}

TaskFilter.propTypes = {
  filterName: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
}
