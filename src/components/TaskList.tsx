import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskTable from '../components/TaskTable';
import { getTasks } from '../api/taskApi';
import { Task } from '../types/Task';
import { notification } from 'antd';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks from the mock API on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
      } catch (error) {
        notification.error({ message: 'Failed to load tasks' });
      }
    };
    fetchTasks();
  }, []);

  // Add a new task to the list
  const handleAddTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // Delete a task by filtering out the deleted task from the list
  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Update task status or other fields
  const handleUpdateTask = (id: number, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Task Management</h1>
        <TaskForm onAddTask={handleAddTask} />
        <TaskTable
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
        />
      </div>
    </div>
  );
};

export default TaskList;
