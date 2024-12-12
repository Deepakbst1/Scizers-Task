import React from 'react';
import { Form, Input, Button, Select, DatePicker, Switch, notification } from 'antd';
import { Task } from '../types/Task';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const { Option } = Select;

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [form] = Form.useForm();
  const [priority, setPriority] = React.useState<string>('');

  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };

  const handleFormSubmit = (values: any) => {
    const newTask: Task = {
      title: values.title,
      priority: values.priority,
      dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : '',
      status: values.status,
      id: 0,
    };
    onAddTask(newTask);
    notification.success({ message: 'Task added successfully' });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={handleFormSubmit}
      layout="vertical"
      className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-6"
    >
      <Form.Item
        label={<span className="font-semibold text-gray-700">Task Title</span>}
        name="title"
        rules={[{ required: true, message: 'Please enter task title' }]}
        className="mb-4"
      >
        <Input className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
      </Form.Item>

      <Form.Item
        label={<span className="font-semibold text-gray-700">Priority</span>}
        name="priority"
        rules={[{ required: true, message: 'Please select priority' }]}
        className="mb-4"
      >
        <Select
          defaultValue=""
          onChange={handlePriorityChange}
          className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <Option value="High">High</Option>
          <Option value="Medium">Medium</Option>
          <Option value="Low">Low</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={<span className="font-semibold text-gray-700">Due Date</span>}
        name="dueDate"
        rules={[{ required: true, message: 'Please select due date' }]}
        className="mb-4"
      >
        <DatePicker className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
      </Form.Item>

      <Form.Item
        label={<span className="font-semibold text-gray-700">Status</span>}
        name="status"
        valuePropName="checked"
        className="mb-6 flex items-center"
      >
        <Switch className="bg-gray-300" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Add Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
