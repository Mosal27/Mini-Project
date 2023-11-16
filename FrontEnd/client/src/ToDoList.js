import React, { useState, useEffect } from 'react';
import { useTaskCounter } from './useTaskCounter';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const { taskCount, incrementTaskCount } = useTaskCounter(0);

  const markAsCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskObject = {
      name: newTask,
      completed: false,
    };
    setTasks([...tasks, taskObject]);
    setNewTask('');
    incrementTaskCount(); // Increment the task count when a new task is added
  };

  useEffect(() => {
    // Example of a side effect (logging the tasks)
    console.log('Tasks:', tasks);
  }, [tasks]); // Include tasks in the dependency array

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
                <button onClick={() => markAsCompleted(index)}>
                  {taskObject.completed ? 'Undo' : 'Complete'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ToDoList;
