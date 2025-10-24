import React, { useState, useEffect } from 'react';
import { Task } from './types';
import { getTasks, createTask, updateTask, deleteTask } from './api';
import './App.css';

type FilterType = 'all' | 'active' | 'completed';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    // Load from localStorage first
    const saved = localStorage.getItem('tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Save to localStorage whenever tasks change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.isCompleted).length,
    completed: tasks.filter(t => t.isCompleted).length
  };

  return (
    <div className="app-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="task-card p-4 p-md-5">
              <h1 className="text-center mb-4 fw-bold text-primary">
                <i className="bi bi-check2-circle me-2"></i>
                Task Manager
              </h1>
              
              {/* Add Task Form */}
              <form onSubmit={handleAddTask} className="mb-4">
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    className="form-control"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    disabled={loading}
                  />
                  <button 
                    className="btn btn-primary px-4"
                    type="submit" 
                    disabled={loading || !newTask.trim()}
                  >
                    <i className="bi bi-plus-circle me-1"></i>
                    Add
                  </button>
                </div>
              </form>

              {/* Filter Buttons */}
              <div className="btn-group w-100 mb-4" role="group">
                <button
                  type="button"
                  onClick={() => setFilter('all')}
                  className={`btn filter-btn ${
                    filter === 'all' ? 'btn-primary' : 'btn-outline-primary'
                  }`}
                >
                  All
                  <span className="badge bg-light text-dark ms-2">{stats.total}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('active')}
                  className={`btn filter-btn ${
                    filter === 'active' ? 'btn-primary' : 'btn-outline-primary'
                  }`}
                >
                  Active
                  <span className="badge bg-light text-dark ms-2">{stats.active}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('completed')}
                  className={`btn filter-btn ${
                    filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'
                  }`}
                >
                  Completed
                  <span className="badge bg-light text-dark ms-2">{stats.completed}</span>
                </button>
              </div>

              {/* Task List */}
              <div className="task-list">
                {filteredTasks.length === 0 ? (
                  <div className="text-center py-5 text-muted">
                    <i className="bi bi-inbox fs-1 d-block mb-3"></i>
                    <p className="fs-5">
                      {filter === 'all' && 'No tasks yet. Add one to get started!'}
                      {filter === 'active' && 'No active tasks!'}
                      {filter === 'completed' && 'No completed tasks!'}
                    </p>
                  </div>
                ) : (
                  <div className="list-group">
                    {filteredTasks.map(task => (
                      <div 
                        key={task.id} 
                        className={`list-group-item task-item d-flex align-items-center gap-3 ${
                          task.isCompleted ? 'completed' : ''
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="form-check-input task-checkbox m-0"
                          checked={task.isCompleted}
                          onChange={() => handleToggleComplete(task)}
                        />
                        <span className={`task-text flex-grow-1 fs-5 ${
                          task.isCompleted ? 'text-muted' : ''
                        }`}>
                          {task.description}
                        </span>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
