// src/api/taskAPI.ts
import axios from 'axios';
import { Task } from '../types/Task';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/todos`);
  return response.data;
};

export const addTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await axios.post(`${API_URL}/todos`, task);
  return response.data;
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
  const response = await axios.put(`${API_URL}/todos/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/todos/${id}`);
};
