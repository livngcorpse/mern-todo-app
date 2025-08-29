import React from 'react';
import { TaskProvider } from './context/TaskContext';
import Dashboard from './pages/Dashboard';

export default function App(){
  return (
    <TaskProvider>
      <Dashboard />
    </TaskProvider>
  );
}
