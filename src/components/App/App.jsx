/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import './App.scss'

export default function App() {
  // STATE
  const [tasks, setTasks] = useState([
    {
      description: 'Окончить кату',
      created: new Date(),
      id: uuid(),
      completed: false,
      min: 11,
      sec: 11,
      timer: undefined,
      formatTime: '11:11',
      totalSeconds: 671,
    },
    {
      description: 'Заработать свой первый миллион',
      created: new Date(),
      id: uuid(),
      completed: false,
      min: 11,
      sec: 11,
      timer: undefined,
      formatTime: '11:11',
      totalSeconds: 671,
    },
  ])

  const [filter, setFilter] = useState('all')

  // FUNK FOR CREATE TASKS
  const createTask = (text, min, sec) => ({
    description: text,
    created: new Date(),
    id: uuid(),
    completed: false,
    min,
    sec,
    timer: undefined,
    formatTime: `${min}:${sec}`,
    totalSeconds: min * 60 + sec,
  })

  // TOGGLE FOR COMPLETED
  const toggleCompleted = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    )
  }

  // FUNK FOR DEL TASK
  const delTask = (id) => {
    setTasks((prev) => {
      const updatedTasks = prev.filter((task) => task.id !== id)
      stopTimer(id)
      return updatedTasks
    })
  }

  // FUNK FOR ADD TASK
  const addTask = (text, min, sec) => {
    setTasks((prev) => [...prev, createTask(text, min, sec)])
  }

  // TOGGLE FOR EDIT TASK
  const toggleEdit = (newText, id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, description: newText } : task)),
    )
  }

  // FUNKS FOR FILTER TASKS
  const toggleFilter = (chapter) => {
    setFilter(chapter)
  }
  const filteredTasks = () => {
    switch (filter) {
      case 'all':
        return tasks
      case 'active':
        return tasks.filter((task) => !task.completed)
      case 'completed':
        return tasks.filter((task) => task.completed)
      default:
        return tasks
    }
  }

  // FUNK FOR CLEAR ALL COMPLETED TASKS
  const clearCompleted = () => {
    setTasks((prev) => {
      const updatedTasks = prev.filter((task) => !task.completed)
      stopAllTimers()
      return updatedTasks
    })
  }

  // COUNTER
  const counter = () => tasks.filter((task) => !task.completed).length

  // TIMER
  function startTimer(id) {
    if (!tasks.find((task) => task.id === id).timer) {
      const newTimer = setInterval(() => {
        setTasks((prev) => prev.map((t) => (t.id === id ? updateTaskTimer(t) : t)))
      }, 1000)

      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, timer: newTimer } : t)))
    }
  }

  function stopTimer(id) {
    const task = tasks.find((t) => t.id === id)
    if (task && task.timer) {
      clearInterval(task.timer)
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, timer: undefined } : t)))
    }
  }

  function stopAllTimers() {
    tasks.forEach((task) => {
      if (task.timer) {
        clearInterval(task.timer)
      }
    })
  }

  const padZero = (value) => (String(value).length < 2 ? `0${value}` : value)

  const updateTaskTimer = (task) => {
    if (task.totalSeconds <= 0) {
      stopTimer(task.id)
      return { ...task, totalSeconds: 0 }
    }

    const minutes = Math.floor(task.totalSeconds / 60)
    const seconds = task.totalSeconds % 60
    const formatTime = `${padZero(minutes)}:${padZero(seconds)}`

    return {
      ...task,
      formatTime,
      totalSeconds: task.totalSeconds - 1,
    }
  }

  // IF TASK BECAME COMPLETED
  useEffect(() => {
    tasks.forEach((task) => {
      if (task.completed && task.timer) {
        stopTimer(task.id)
      }
    })
  }, [tasks])

  // FOR ALL TIMERS
  useEffect(() => {
    return () => stopAllTimers()
  }, [])

  // RETURN
  return (
    <div className="main">
      <div className="todoapp">
        <NewTaskForm addTask={addTask} />
        <TaskList
          tasks={filteredTasks()}
          toggleCompleted={toggleCompleted}
          delTask={delTask}
          toggleEdit={toggleEdit}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
        <Footer
          toggleFilter={toggleFilter}
          clearCompleted={clearCompleted}
          count={counter()}
          classFilter={filter}
        />
      </div>
    </div>
  )
}
