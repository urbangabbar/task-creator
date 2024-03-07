// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Button, Container, CssBaseline, Typography, AppBar, Toolbar } from '@mui/material';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Array<{ id: string; name: string; description: string; deadline: string }>>([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    console.log(tasks)
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: { name: string; description: string; deadline: string }) => {
    console.log(uuidv4())
    setTasks([...tasks, { id: uuidv4(), ...newTask }]);
  };

  const updateTask = (updatedTask: { id: string; name: string; description: string; deadline: string }) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Management App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/tasks">
            Tasks
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Typography variant="h2">Welcome to Task Management App</Typography>} />
          <Route
            path="/tasks"
            element={
              <>
                <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
                <div style={{ marginTop: '20px' }}>
                  <Typography variant="h4">Add New Task</Typography>
                  <Button
                    variant="contained"
                    onClick={() => addTask({ name: 'New Task', description: '', deadline: '' })}
                  >
                    Add Task
                  </Button>
                </div>
              </>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
