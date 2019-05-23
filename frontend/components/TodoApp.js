import React from 'react';
import styled from 'styled-components';
import FetchApi from '../fetch-api';
import Console from './Console';
import TaskItem from './TaskItem';

const ENTER_KEY_CODE = 13;

const StyledTodoApp = styled.div`
  font-size: 62.5%; /* Setting to 10px so I can use rem with dumb math */
  max-width: 800px;
  margin: 0 auto;
`;

export default class TodoApp extends React.Component {
  state = { todos: [], showAlive: false };

  constructor(props) {
    super(props);
    this.getTodos();
  }

  getTodos = () => {
    return FetchApi.get('/todo')
      .then((todos) => this.setState({ todos }))
      .catch(() => alert('There was an error getting todos'));
  };

  createTodo = (todo) => {
    FetchApi.post('/todo', todo)
      .then((newTodo) => {
        const newTodos = Array.from(this.state.todos);
        newTodos.push(newTodo);
        this.setState({ todos: newTodos });
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

  handleUpdateRequest = (id, todo) => {
    const { text, isCompleted } = todo;
    // const text = todo.text.length > 0 ? todo.text : undefined;
    FetchApi.put(`/todo/${id}`, { text, isCompleted })
      .then((newTodo) => {
        const newTodos = Array.from(this.state.todos);
        newTodos[newTodos.findIndex((todo) => todo.id === id)] = newTodo;
        this.setState({ todos: newTodos });
      })
      .catch(() => alert('There was an error updating the todo'));
  };

  // handleChange = (e) => {
  //   this.setState({ newText: e.target.value });
  // };

  // handleKeyDown = (e) => {
  //   if (e.keyCode !== ENTER_KEY_CODE) return;
  //   this.createTodo();
  // };

  render() {
    return (
      <StyledTodoApp>
        <Console
          createTodo={this.createTodo}
          showAlive={this.state.showAlive}
          setShowAlive={(showAlive) => this.setState({ showAlive })}
        />
        <ul>
          {this.state.todos
            .filter((todo) => todo.isCompleted !== this.state.showAlive)
            .map((todo) => (
              <li key={todo.id}>
                <TaskItem todo={todo} updateItem={this.handleUpdateRequest} deleteItem={this.handleDeleteRequest} />
              </li>
            ))}
        </ul>
      </StyledTodoApp>
    );
  }
}
