import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const wiggle = keyframes`
  0% {transform: rotate(0);}
  25% {transform: rotate(10deg);}
  75% {transform: rotate(-10deg);}
  100% {transform: rotate(0);}
`;

const StyledConsole = styled.div`
  position: relative;
  width: 100%;
  height: 20vh;
  background-image: linear-gradient(to bottom right, #313131, #111 60%);
  background-color: #135466;
  border-radius: 3rem 3rem 6rem 6rem;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 0 1rem #fff;
`;

const Title = styled.h1`
  font-size: 5rem;
  padding-top: 2rem;
  animation: ${wiggle} 20s ease-in infinite;
`;

const NewTaskForm = styled.form`
  position: relative;
  display: inline-block;
  margin: 0 auto;
  background-color: transparent;
  top: 5.5rem;
  font-size: 2rem;
`;

const NewTaskInput = styled.input`
  font: inherit;
  border: transparent;
  border-radius: 1rem 0 0 1rem;
  padding: 0.5rem 1rem;
  box-shadow: 0 0 1rem #fff;
`;
const NewTaskButton = styled.button`
  background-color: #313131;
  color: #fff;
  font: inherit;
  outline: none;
  border-radius: 0 1rem 1rem 0;
  padding: 0.5rem 1rem;
  border: transparent;
  cursor: pointer;
  box-shadow: 0 0 1rem #fff;
`;

const Tombstone = styled.button`
  position: absolute;
  margin: 0 5rem;
  padding: 4rem 1.5rem;
  font: inherit;
  font-size: 2rem;
  border-radius: 5rem 5rem 0 0;
  border: 0.3rem solid grey;
  border-bottom: 0.4rem solid #774d2c;
  bottom: 0;
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  cursor: pointer;
  overflow: hidden;

  i {
    position: absolute;
    font-size: 3rem;
    bottom: ${(props) => (props.active ? '2%' : '-30%')};
    left: 0;
    right: 0;
    transition: all 2s;
  }

  &:hover i {
    bottom: 2%;
  }
`;

const Console = (props) => {
  const { createTodo, showAlive, setShowAlive } = props;

  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.length > 0) {
      createTodo({ text: newTask, isCompleted: false });
      setNewTask('');
    }
  };

  // TODO: Strike through Done/In-progress and absolutely position Dead/Living below to make interface more intuitive

  return (
    <StyledConsole>
      <Title>Till Death To We Do</Title>
      <NewTaskForm onSubmit={(e) => handleSubmit(e)}>
        <NewTaskInput value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter a new soul" />
        <NewTaskButton>Create</NewTaskButton>
      </NewTaskForm>
      <Tombstone left="0" active={showAlive} onClick={() => setShowAlive(true)}>
        View the Living
        <i className="fas fa-flushed" />
      </Tombstone>
      <Tombstone right="0" active={!showAlive} onClick={() => setShowAlive(false)}>
        View the Dead
        <i className="fas fa-dizzy" />
      </Tombstone>
    </StyledConsole>
  );
};

export default Console;
