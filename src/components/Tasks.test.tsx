import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Task from './Task';

const mockTask = {
  id: '1',
  name: 'Sample Task',
  description: 'Task description',
  deadline: '2024-03-31',
};

describe.skip('Task Component', () => {
  const mockOnUpdate = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    render(<Task task={mockTask} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
  });

  it('renders task details correctly', () => {
    expect(screen.getByText('Sample Task')).toBeInTheDocument();
    expect(screen.getByText('Task description')).toBeInTheDocument();
    expect(screen.getByText('Deadline: 2024-03-31')).toBeInTheDocument();
  });

  it('switches to edit mode when "Edit" button is clicked', () => {
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Deadline')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('cancels edit mode when "Cancel" button is clicked', () => {
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Sample Task')).toBeInTheDocument();
    expect(screen.getByText('Task description')).toBeInTheDocument();
    expect(screen.getByText('Deadline: 2024-03-31')).toBeInTheDocument();
  });

  it('updates task details and switches back to view mode when "Save" button is clicked', () => {
    fireEvent.click(screen.getByText('Edit'));

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Updated Task' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Updated description' } });
    fireEvent.change(screen.getByLabelText('Deadline'), { target: { value: '2025-01-01' } });

    fireEvent.click(screen.getByText('Save'));

    expect(mockOnUpdate).toHaveBeenCalledWith({
      id: '1',
      name: 'Updated Task',
      description: 'Updated description',
      deadline: '2025-01-01',
    });
  });

  it('calls onDelete when "Delete" button is clicked', () => {
    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });
});
