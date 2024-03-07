import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';


jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('mocked-uuid'),
}));


const localStorageMock = (function () {
  let store: Record<string, string> = {};
  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value;
    },
    clear: function () {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });


jest.mock('./components/TaskList', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

describe('App Component', () => {
  beforeEach(() => {
    render(
        <App />
    );
  });

  it('renders the welcome message on the home page', () => {
    expect(screen.getByText('Welcome to Task Management App')).toBeInTheDocument();
  });

  it('renders the task list on the tasks page', () => {
    fireEvent.click(screen.getByText('Tasks'));
    expect(screen.getByText('Task Management App')).toBeInTheDocument();
  });

  it.only('adds a new task when the "Add Task" button is clicked', () => {
    fireEvent.click(screen.getByText('Tasks'));

    const mockTaskList = jest.fn(() => null);
    jest.mock('./components/TaskList', () => ({
      __esModule: true,
      default: mockTaskList,
    }));


    fireEvent.click(screen.getByText('Add Task'));

    expect(localStorage.getItem('tasks')).toEqual(
      JSON.stringify([{ id: 'mocked-uuid', name: 'New Task', description: '', deadline: '' }])
    );
  });
});
