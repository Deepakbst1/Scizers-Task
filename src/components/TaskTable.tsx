import React from 'react';
import { Table, Button, Switch, Popconfirm, notification } from 'antd';
import { Task } from '../types/Task';
import { deleteTask, updateTask } from '../api/taskApi';

interface TaskTableProps {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
  onUpdateTask: (id: number, task: Partial<Task>) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onDeleteTask, onUpdateTask }) => {
  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      onDeleteTask(id);
      notification.success({ message: 'Task Deleted Successfully!' });
    } catch (error) {
      notification.error({ message: 'Failed To Delete Task' });
    }
  };

  const handleStatusChange = async (id: number, checked: boolean) => {
    try {
      const updatedTask = await updateTask(id, { status: checked });
      onUpdateTask(id, updatedTask);
      notification.success({ message: 'Task Status Updated' });
    } catch (error) {
      notification.error({ message: 'Failed To Update Task Status' });
    }
  };

  const columns = [
    {
      title: 'Task Title',
      dataIndex: 'title',
      className: 'text-left font-medium text-gray-800',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      className: 'text-center font-medium text-gray-600',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      className: 'text-center font-medium text-gray-600',
    },
    {
      title: 'Status',
      render: (_: string, record: Task) => (
        <Switch
          checked={record.status}
          onChange={(checked) => handleStatusChange(record.id, checked)}
          className="bg-blue-500 focus:outline-none"
        />
      ),
      className: 'text-center',
    },
    {
      title: 'Actions',
      render: (_: any, record: Task) => (
        <Popconfirm
          title="Are you sure you want to delete this task?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            danger
            className="bg-red-500 text-white hover:bg-red-600 rounded focus:outline-none"
          >
            Delete
          </Button>
        </Popconfirm>
      ),
      className: 'text-center',
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table
        columns={columns}
        dataSource={tasks}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="shadow-md rounded-lg"
      />
    </div>
  );
};

export default TaskTable;
