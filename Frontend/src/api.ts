import axios from 'axios';
import { Task } from './types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tasks';

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

export const createTask = async (description: string): Promise<Task> => {
  const response = await axios.post<Task>(API_URL, { description, isCompleted: false });
  return response.data;
};

export const updateTask = async (id: string, description: string, isCompleted: boolean): Promise<Task> => {
  const response = await axios.put<Task>(`${API_URL}/${id}`, { description, isCompleted });
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
