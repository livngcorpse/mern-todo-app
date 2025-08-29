import React, { useContext, useEffect, useState, useRef } from 'react';
import { TaskContext } from '../context/TaskContext';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import SearchFilterBar from '../components/SearchFilterBar';
import BulkActions from '../components/BulkActions';

export default function Dashboard(){
  const { tasks, loading, error, fetch, createTask, updateTask, toggleComplete, deleteTask } = useContext(TaskContext);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const reminderTimers = useRef(new Map());

  useEffect(()=>{
    // clear old timers
    for (const t of reminderTimers.current.values()) clearTimeout(t);
    reminderTimers.current.clear();

    tasks.forEach(task => {
      if (!task.dueDate || task.completed) return;
      const when = new Date(task.dueDate).getTime();
      const now = Date.now();
      const ms = when - now;
      // only schedule reminders within next 7 days
      if (ms > 0 && ms < 7 * 24 * 60 * 60 * 1000) {
        const id = setTimeout(()=>{
          if (window.Notification && Notification.permission === 'granted'){
            new Notification('Task reminder', { body: task.title });
          } else {
            alert(`Reminder: ${task.title}`);
          }
        }, ms);
        reminderTimers.current.set(task._id, id);
      }
    });

    return ()=>{
      for (const t of reminderTimers.current.values()) clearTimeout(t);
      reminderTimers.current.clear();
    };
  }, [tasks]);

  useEffect(()=>{ if (window.Notification && Notification.permission !== 'granted') Notification.requestPermission(); },[]);

  async function handleCreate(payload){
    await createTask(payload);
    setShowForm(false);
  }

  async function handleUpdate(payload){
    await updateTask(editing._id, payload);
    setEditing(null);
    setShowForm(false);
  }

  function handleEdit(task){ setEditing(task); setShowForm(true); }

  async function handleToggle(id){ await toggleComplete(id); }
  async function handleDelete(id){ if (confirm('Delete this task?')) await deleteTask(id); }

  function handleSelect(id, checked){
    setSelected(prev=>{
      const copy = new Set(prev);
      if (checked) copy.add(id); else copy.delete(id);
      return copy;
    });
  }

  async function markSelectedComplete(){
    const ids = Array.from(selected);
    for (const id of ids) {
      await toggleComplete(id);
    }
    setSelected(new Set());
  }

  async function deleteSelected(){
    if (!confirm(`Delete ${selected.size} tasks?`)) return;
    const ids = Array.from(selected);
    for (const id of ids) await deleteTask(id);
    setSelected(new Set());
  }

  return (
    <main className="container">
      <Header />

      <div style={{display:'flex',gap:8,flexDirection:'column'}}>
        <SearchFilterBar onSearch={fetch} />

        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <button className="btn" onClick={()=>{ setEditing(null); setShowForm(s=>!s); }} aria-expanded={showForm}>{showForm ? 'Close' : 'Add Task'}</button>
          <button className="icon-btn" onClick={()=>fetch()}>Refresh</button>
        </div>

        {showForm && (
          <TaskForm initial={editing || {}} onSave={editing ? handleUpdate : handleCreate} onCancel={()=>{ setShowForm(false); setEditing(null); }} />
        )}

        <BulkActions selectedCount={selected.size} onMarkComplete={markSelectedComplete} onDelete={deleteSelected} />

        {loading ? <div className="card">Loading…</div> : <TaskList tasks={tasks} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} selectable onSelect={handleSelect} selectedIds={selected} />}

        {error && <div role="alert" style={{color:'crimson'}}>{error}</div>}
      </div>
    </main>
  );
}
