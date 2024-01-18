import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TaskFilter from '../TaskFilter/TaskFilter'
import './Footer.css'

// eslint-disable-next-line react/prefer-stateless-function
export default class Footer extends Component {
  render() {
    const { filterName, clearCompleted, count, filter } = this.props

    return (
      <footer className="footer">

        <span className="todo-count">{`${count} items left`}</span>

        <TaskFilter filter={filter} filterName={filterName} />

        <button type="button" className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
        
      </footer>
    )
  }
}

Footer.propTypes = {
  count: PropTypes.number.isRequired,
  filterName: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
}
