// src/components/TaskList.tsx
import React from 'react';
import Task from './Task';

interface TaskListProps {
  tasks: Array<{
    id: string;
    name: string;
    description: string;
    deadline: string;
  }>;
  onUpdate: (task: { id: string; name: string; description: string; deadline: string }) => void;
  onDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;
