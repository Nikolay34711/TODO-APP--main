import React from 'react'
import PropTypes from 'prop-types'
import Task from '../Task/Task'
import './TaskList.scss'

export default function TaskList({
  tasks,
  toggleCompleted,
  delTask,
  toggleEdit,
  startTimer,
  stopTimer,
}) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          toggleCompleted={toggleCompleted}
          delTask={delTask}
          toggleEdit={toggleEdit}
          stopTimer={stopTimer}
          startTimer={startTimer}
        />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  delTask: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
}
