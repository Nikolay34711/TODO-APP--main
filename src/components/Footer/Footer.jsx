import React from 'react'
import PropTypes from 'prop-types'
import TaskFilter from '../TaskFilter/TaskFilter'
import './Footer.css'

const Footer = ({ filterName, clearCompleted, count, filter }) => (
  <footer className="footer">
    <span className="todo-count">{`${count} items left`}</span>

    <TaskFilter filter={filter} filterName={filterName} />

    <button type="button" className="clear-completed" onClick={clearCompleted}>
      Clear completed
    </button>
  </footer>
)

Footer.propTypes = {
  filterName: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
}

export default Footer
