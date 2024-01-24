import React from 'react'
import PropTypes from 'prop-types'
import TaskFilter from '../TaskFilter/TaskFilter'
import './Footer.scss'

export default function Footer({ toggleFilter, clearCompleted, count, classFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{`${count} items left`}</span>
      <TaskFilter toggleFilter={toggleFilter} classFilter={classFilter} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}
Footer.propTypes = {
  count: PropTypes.number.isRequired,
  classFilter: PropTypes.string.isRequired,
  toggleFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
}
