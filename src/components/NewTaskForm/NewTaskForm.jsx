import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.scss'

export default function NewTaskForm({ addTask }) {
  const [text, setText] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const minutes = parseInt(min, 10) || 0
    const seconds = parseInt(sec, 10) || 0
    if (text.trim()) {
      addTask(text, minutes, seconds)
    }
    setText('')
    setMin('')
    setSec('')
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <h1>Todos</h1>
      <input type="submit" hidden />
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        value={min}
        onChange={(e) => setMin(e.target.value)}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={sec}
        onChange={(e) => setSec(e.target.value)}
      />
    </form>
  )
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
}
