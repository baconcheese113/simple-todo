import React, { useState } from 'react';
import styled from 'styled-components';

const StyledTaskItem = styled.div`
  background-color: #555;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  border-left: 0.5rem solid violet;
  width: 50%;
  margin: 1rem auto;
  transition: all 1s;

  i {
    cursor: pointer;
    margin-left: 0.5rem;
  }
`;

const TaskItemInput = styled.input`
  font: inherit;
  border: transparent;
  border-radius: 1rem 0 0 1rem;
  padding: 0.5rem 1rem;
  width: 80%;
`;

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
