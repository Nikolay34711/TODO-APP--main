import React, { Component } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 } from 'uuid'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import './App.css'

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  
  // my initial tasks in my life
  myInitialTask = [
    {
      description: 'Окончить кату',
      completed: false,
      timer: new Date(),
      id: v4(),
    },
    {
      description: 'Заработать свой первый миллион',
      completed: false,
      timer: new Date(),
      id: v4(),
    },
  ]
  
  // state
  state = {
    taskData: this.myInitialTask,
    filter: 'all',
  }

  //  create task
  createTask = (newTask) => ({
    description: newTask,
    completed: false,
    timer: new Date(),
    id: v4(),
  })

  // del task
  onDeleted = (id) => {
    this.setState(({ taskData }) => ({
      taskData: taskData.filter((obj) => obj.id !== id),
    }))
  }

  // addTask
  addTask = (newTask) => {
    this.setState(({ taskData }) => ({
      taskData: [...taskData, this.createTask(newTask)],
    }))
  }

  // toggle completed
  toggleCompleted = (id) => {
    this.setState(({ taskData }) => ({
      taskData: taskData.map((obj) => (obj.id === id ? { ...obj, completed: !obj.completed } : obj)),
    }))
  }

  // filter all, active and completed tasks
  listFilter = (filter) => {
    this.setState({ filter })
  }

  getFilteredTasks = () => {
    const { taskData, filter } = this.state

    switch (filter) {
      case 'all':
        return taskData
      case 'active':
        return taskData.filter((task) => !task.completed)
      case 'completed':
        return taskData.filter((task) => task.completed)
      default:
        return taskData
    }
  }

  // clear all completed tasks
  clearCompleted = () => {
    this.setState(({ taskData }) => ({
      taskData: taskData.filter((obj) => !obj.completed),
    }))
  }

  // edit text task
  toggleEdit = (newText, id) => {
    this.setState(({ taskData }) => ({
      taskData: taskData.map((task) => (task.id === id ? { ...task, description: newText } : task)),
    }))
  }

  render() {
    const { taskData } = this.state
    const counter = taskData.filter((el) => !el.completed).length
    const { filter } = this.state

    return (
      <div className="main">
        <div className="todoapp">

          <NewTaskForm addTask={(newTask) => this.addTask(newTask)} />

          <TaskList
            tasks={this.getFilteredTasks()}
            onDeleted={(id) => this.onDeleted(id)}
            toggleCompleted={(id) => this.toggleCompleted(id)}
            toggleEdit={this.toggleEdit}
          />

          <Footer
            filter={filter}
            filterName={(typeFilter) => this.listFilter(typeFilter)}
            clearCompleted={this.clearCompleted}
            count={counter}
          />

        </div>
      </div>
    )
  }
}
