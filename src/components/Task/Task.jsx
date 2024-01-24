import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './Task.scss'

export default function Task({
  task,
  toggleCompleted,
  delTask,
  toggleEdit,
  startTimer,
  stopTimer,
}) {
  // destructuring task
  const { description, created, id, formatTime, completed } = task

  // state
  const [isEdit, setIsEdit] = useState(false)
  const [newDesc, setNewDesc] = useState(description)

  // submit
  const onSubmit = (e) => {
    e.preventDefault()
    toggleEdit(newDesc, id)
    setIsEdit(false)
  }

  return (
    <>
      {!isEdit && (
        <li className={completed ? 'completed' : ''}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={completed}
              onChange={() => toggleCompleted(id)}
            />
            <label>
              <span className="title">{description}</span>
              <span className="description">
                <button type="button" className="icon icon-play" onClick={() => startTimer(id)} />
                <button type="button" className="icon icon-pause" onClick={() => stopTimer(id)} />
                <span className="span-timer">{formatTime}</span>
              </span>
              <span className="description">
                created {formatDistanceToNow(created, { includeSeconds: true, addSuffix: true })}
              </span>
            </label>
            <button type="button" className="icon icon-edit" onClick={() => setIsEdit(true)} />
            <button type="button" className="icon icon-destroy" onClick={() => delTask(id)} />
          </div>
        </li>
      )}
      {isEdit && (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="edit"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          />
        </form>
      )}
    </>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
    description: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    formatTime: PropTypes.string,
  }).isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  delTask: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
}
