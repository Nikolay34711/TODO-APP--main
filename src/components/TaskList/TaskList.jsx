import React from 'react'
import PropTypes from 'prop-types'
import Task from '../Task/Task'
import './TaskList.css'

const TaskList = ({ tasks, onDeleted, toggleCompleted, toggleEdit }) => (
  <ul className="todo-list">
    {tasks.map((task) => (
      <Task
        key={task.id}
        task={task}
        onDeleted={() => onDeleted(task.id)}
        toggleCompleted={() => toggleCompleted(task.id)}
        toggleEdit={toggleEdit}
      />
    ))}
  </ul>
)

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      timer: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
}

export default TaskList
