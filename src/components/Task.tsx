// src/components/Task.tsx
import React, { useState, ChangeEvent } from 'react';
import { TextField, TextareaAutosize, Button, Card, CardContent, Typography } from '@mui/material';

interface TaskProps {
  task: {
    id: string;
    name: string;
    description: string;
    deadline: string;
  };
  onUpdate: (task: { id: string; name: string; description: string; deadline: string }) => void;
  onDelete: (taskId: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onUpdate(editedTask);
    setEditing(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  return (
    <Card variant="outlined" style={{ marginBottom: '10px' }}>
      <CardContent>
        {isEditing ? (
          <>
            <TextField
              label="Name"
              name="name"
              value={editedTask.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextareaAutosize
              placeholder="Description"
              name="description"
              value={editedTask.description}
              onChange={handleChange}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <TextField
              type="date"
              label="Deadline"
              name="deadline"
              value={editedTask.deadline}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" onClick={handleSave} style={{ marginRight: '10px' }}>
              Save
            </Button>
            <Button variant="contained" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h5">{task.name}</Typography>
            <Typography>{task.description}</Typography>
            <Typography>Deadline: {task.deadline}</Typography>
            <Button data-testid="abc" variant="outlined" onClick={handleEdit} style={{ marginRight: '10px' }}>
              Edit
            </Button>
            <Button variant="outlined" onClick={() => onDelete(task.id)}>
              Delete
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Task;
