import React, { useState, useEffect } from 'react';
import { useTaskCounter } from './useTaskCounter';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const { taskCount, incrementTaskCount } = useTaskCounter(0);

  useEffect(() => {
    console.log('Tasks:', tasks);
  }, [tasks]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskObject = {
      name: newTask,
      completed: false,
    };
    setTasks([...tasks, taskObject]);
    setNewTask('');
    incrementTaskCount(); 
  };

  return (
    <div>
      <h1>My Shopping List</h1>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Add a new task'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type='submit'>Add Task</button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        <div>
          <p>Total tasks added: {taskCount}</p>
          <ul>
            {tasks.map((taskObject, index) => (
              <li key={index} style={{ textDecoration: taskObject.completed ? 'line-through' : 'none' }}>
                {taskObject.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ToDoList;
