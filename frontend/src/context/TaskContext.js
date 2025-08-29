import React, { createContext, useEffect, useState } from 'react';
import api from '../services/api';

export const TaskContext = createContext();

export function TaskProvider({ children }){
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetch(params){
    setLoading(true); setError(null);
    try{
      const data = await api.getTasks(params);
      setTasks(data);
    }catch(e){
      setError(e.response?.data?.error || e.message);
    }
    setLoading(false);
  }

  async function createTask(task){
    const created = await api.createTask(task);
    setTasks(prev => [created, ...prev]);
    return created;
  }

  async function updateTask(id, updates){
    const updated = await api.updateTask(id, updates);
    setTasks(prev => prev.map(t => t._id === id ? updated : t));
    return updated;
  }

  async function toggleComplete(id){
    const updated = await api.toggleComplete(id);
    setTasks(prev => prev.map(t => t._id === id ? updated : t));
    return updated;
  }

  async function deleteTask(id){
    await api.deleteTask(id);
    setTasks(prev => prev.filter(t => t._id !== id));
  }

  useEffect(()=>{ fetch(); }, []);

  return (
    <TaskContext.Provider value={{ tasks, loading, error, fetch, createTask, updateTask, toggleComplete, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}
