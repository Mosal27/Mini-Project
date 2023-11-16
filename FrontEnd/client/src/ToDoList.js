import React, { useState } from 'react';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const markAsCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskObject = {
      name: newTask,
      completed: false
    };
    setTasks([...tasks, taskObject]);
    setNewTask('');
  };

  return (
    <div>
      <h1>My shopping List</h1>

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
        <ul>
          {tasks.map((taskObject, index) => (
            <li key={index}
                style={{ textDecoration: taskObject.completed ? 'line-through' : 'none' }}>
              {taskObject.name}
              <button onClick={() => markAsCompleted(index)}>
                {taskObject.completed ? 'Undo' : 'Complete'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToDoList;
