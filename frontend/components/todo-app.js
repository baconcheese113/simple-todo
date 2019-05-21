import React from 'react';
import FetchApi from '../fetch-api';

const ENTER_KEY_CODE = 13;

export default class TodoApp extends React.Component {
  state = { todos: [], newText: '' };

  constructor(props) {
    super(props);
    this.getTodos();
  }

  getTodos = () => {
    return FetchApi.get('/todo')
      .then((todos) => this.setState({ todos }))
      .catch(() => alert('There was an error getting todos'));
  };

  createTodo = () => {
    FetchApi.post('/todo', { text: this.state.newText })
      .then((newTodo) => {
        const newTodos = Array.from(this.state.todos);
        newTodos.push(newTodo);
        this.setState({ todos: newTodos, newText: '' });
      })
      .catch(() => alert('There was an error creating the todo'));
  };

  handleDeleteRequest = (id) => {
    FetchApi.delete(`/todo/${id}`)
      .then(() => {
        const newTodos = Array.from(this.state.todos);
        const todoIndex = newTodos.findIndex((todo) => todo.id.toString() === id.toString());
        newTodos.splice(todoIndex, 1);
        this.setState({ todos: newTodos });
      })
      .catch(() => alert('Error removing todo'));
  };

  handleUpdateRequest = (id) => {
    const text = this.state.newText.length > 0 ? this.state.newText : undefined;
    FetchApi.put(`/todo/${id}`, { text, isCompleted: true })
      .then((newTodo) => {
        const newTodos = Array.from(this.state.todos);
        newTodos[newTodos.findIndex((todo) => todo.id === id)] = newTodo;
        this.setState({ todos: newTodos, newText: '' });
      })
      .catch(() => alert('There was an error updating the todo'));
  };

  handleChange = (e) => {
    this.setState({ newText: e.target.value });
  };

  handleKeyDown = (e) => {
    if (e.keyCode !== ENTER_KEY_CODE) return;
    this.createTodo();
  };

  render() {
    return (
      <div>
        <h1>todos</h1>
        <input
          autoFocus
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder="What needs to be done?"
          value={this.state.newText}
        />
        <ul>
          {this.state.todos.map((todo) => (
            <li key={todo.id}>
              <div className="view">
                <label>{`${todo.text} is ${todo.isCompleted ? '' : 'not'} completed`}</label>
                <button type="button" onClick={() => this.handleUpdateRequest(todo.id)}>
                  Finish Todo
                </button>
                <button type="button" onClick={() => this.handleDeleteRequest(todo.id)}>
                  Remove Todo
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
