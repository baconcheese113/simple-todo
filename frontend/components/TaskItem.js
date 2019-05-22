import React, { useState } from 'react';
import styled from 'styled-components';

/** **************** STYLES */
const StyledTaskItem = styled.div`
  position: relative;
  background-color: #555;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  width: 70%;
  margin: 1rem auto;
  transition: all 1s;

  i {
    cursor: pointer;
    padding: 0 1rem;
  }

  p,
  input {
    text-align: left;
    flex-grow: 1;
    padding: 0 1rem;
    margin: 0 1rem;
  }
`;

const TaskItemInput = styled.input`
  font: inherit;
  border: transparent;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
`;

// Transitions were a bit too buggy, so using display instead
// TODO: make transitions more stable
const StatusToggle = styled.button`
  font: inherit;
  font-size: 3rem;
  background-color: ${(props) => (props.isCompleted ? '#111' : 'violet')};
  height: 100%;
  border: none;
  padding: 2rem 0;
  display: flex;
  overflow: hidden;
  transition: all 0.6s;

  &:hover {
    background-color: ${(props) => (props.isCompleted ? 'violet' : '#111')};
    i {
      color: ${(props) => (props.isCompleted ? '#000' : '#ccc')};
      text-shadow: ${(props) => (props.isCompleted ? '' : '0 0 1rem #ccc')};
      &.dead {
        transform: ${(props) => (props.isCompleted ? 'translateY(6rem)' : 'translateY(0rem)')};
        opacity: ${(props) => (props.isCompleted ? 0 : 1)};
        display: ${(props) => (props.isCompleted ? 'none' : 'inline-block')};
      }
      &.alive {
        transform: ${(props) => (props.isCompleted ? 'translateY(0rem)' : 'translateY(-6rem)')};
        opacity: ${(props) => (props.isCompleted ? 1 : 0)};
        display: ${(props) => (props.isCompleted ? 'inline-block' : 'none')};
      }
    }
  }

  i {
    left: 0;
    color: ${(props) => (props.isCompleted ? '#ccc' : '#000')};
    text-shadow: ${(props) => (props.isCompleted ? '0 0 1rem #ccc' : '')};
    transition: opacity 0.2s, transform 0.3s;
    &.hidden {
      position: relative;
      opacity: 0;
    }
    &.dead {
      position: absolute;
      transform: ${(props) => (props.isCompleted ? 'translateY(0rem)' : 'translateY(6rem)')};
      opacity: ${(props) => (props.isCompleted ? 1 : 0)};
      display: ${(props) => (props.isCompleted ? 'inline-block' : 'none')};
    }
    &.alive {
      position: absolute;
      transform: ${(props) => (props.isCompleted ? 'translateY(-6rem)' : 'translateY(0rem)')};
      opacity: ${(props) => (props.isCompleted ? 0 : 1)};
      display: ${(props) => (props.isCompleted ? 'none' : 'inline-block')};
    }
  }
`;

/** **************** LOGIC */
const TaskItem = (props) => {
  const { todo, updateItem, deleteItem } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(todo.text);

  const handleEditClick = () => {
    if (isEditing) {
      // submit change
      if (newTask !== todo.text) updateItem(todo.id, { text: newTask });
    } else {
      // Enter edit mode
    }
    setIsEditing(!isEditing);
  };

  const editIcon = `fas fa-${isEditing ? 'hand-point-left' : 'pen'}`;

  return (
    <StyledTaskItem>
      <StatusToggle
        className={todo.isCompleted ? 'dead' : 'alive'}
        isCompleted={todo.isCompleted}
        onClick={() => updateItem(todo.id, { ...todo, isCompleted: !todo.isCompleted })}
      >
        <div style={{ overflow: 'hidden' }}>
          <i className="hidden fas fa-dizzy" />
          <i className="dead fas fa-dizzy" />
          <i className="alive fas fa-flushed" />
        </div>
      </StatusToggle>
      {isEditing ? <TaskItemInput value={newTask} onChange={(e) => setNewTask(e.target.value)} /> : <p>{todo.text}</p>}
      <div>
        <i className={editIcon} onClick={handleEditClick} />
        {isEditing ? (
          <i className="fas fa-times-circle" onClick={() => setIsEditing(false)} />
        ) : (
          <i className="fas fa-skull" onClick={() => deleteItem(todo.id)} />
        )}
      </div>
    </StyledTaskItem>
  );
};

export default TaskItem;
