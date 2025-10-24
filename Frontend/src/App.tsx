import React, { useState, useEffect } from 'react';
import { Task } from './types';
import { getTasks, createTask, updateTask, deleteTask } from './api';
import './App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setLoading(true);
    try {
      const task = await createTask(newTask);
      setTasks([...tasks, task]);
      setNewTask('');
    } catch (error) {
      console.error('Failed to add task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const updated = await updateTask(task.id, task.description, !task.isCompleted);
      setTasks(tasks.map(t => t.id === task.id ? updated : t));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Task Manager</h1>
        
        <form onSubmit={handleAddTask} className="add-task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            disabled={loading}
          />
          <button type="submit" disabled={loading || !newTask.trim()}>
            Add
          </button>
        </form>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-state">No tasks yet. Add one to get started!</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleToggleComplete(task)}
                />
                <span className="task-description">{task.description}</span>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
