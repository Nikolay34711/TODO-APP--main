import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'

export default class Task extends Component {
  state = {
    isEdit: false,
    editText: '',
  }

  toggleEdit = () => {
    this.setState(({ isEdit }) => ({
      isEdit: !isEdit,
      // eslint-disable-next-line
      editText: this.props.task.description,
    }))
  }

  handleChange = (e) => {
    this.setState({ editText: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { toggleEdit } = this.props
    // eslint-disable-next-line
    toggleEdit(this.state.editText, this.props.task.id)
    this.setState({ isEdit: false })
  }

  render() {
    const { isEdit, editText } = this.state
    const { task, onDeleted, toggleCompleted } = this.props
    return (
      <>
        {!isEdit && (
          <li className={task.completed ? 'completed' : ''}>
            <div className="view">
              <input className="toggle" type="checkbox" checked={task.completed} onChange={toggleCompleted} />

              <label>
                <span className="description">{task.description} </span>
                <span className="created">
                  created {formatDistanceToNow(task.timer, { includeSeconds: true, addSuffix: true })}
                </span>
              </label>
              <button type="button" className="icon icon-edit" onClick={this.toggleEdit} />
              <button type="button" className="icon icon-destroy" onClick={onDeleted} />
            </div>
          </li>
        )}

        {isEdit && (
          <form onSubmit={this.onSubmit}>
            <input type="text" className="edit" value={editText} onChange={this.handleChange} />
          </form>
        )}
      </>
    )
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    description: PropTypes.string.isRequired,
    timer: PropTypes.instanceOf(Date).isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onDeleted: PropTypes.func.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
}
