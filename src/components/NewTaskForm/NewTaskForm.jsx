import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

// eslint-disable-next-line react/prefer-stateless-function
export default class NewTaskForm extends Component {
  state = {
    field: '',
  }

  onChange = (e) => {
    this.setState({
      field: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { field } = this.state
    const { addTask } = this.props
    if (field.trim().length === 0) {
      console.log('пусто')
    } else {
      addTask(field)
    }
    this.setState(() => ({ field: '' }))
  }

  render() {
    const { field } = this.state

    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>Todos</h1>

        <input className="new-todo" value={field} onChange={this.onChange} placeholder="What needs to be done?" />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
}
