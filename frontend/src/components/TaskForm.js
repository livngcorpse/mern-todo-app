import React, { useState, useEffect } from 'react';

export default function TaskForm({ initial = {}, onSave, onCancel }){
  const [title, setTitle] = useState(initial.title || '');
  const [description, setDescription] = useState(initial.description || '');
  const [priority, setPriority] = useState(initial.priority || 'medium');
  const [dueDate, setDueDate] = useState(initial.dueDate ? new Date(initial.dueDate).toISOString().slice(0,16) : '');
  const [error, setError] = useState(null);

  useEffect(()=>{ setError(null); }, [title]);

  function submit(e){
    e.preventDefault();
    if (!title.trim()) return setError('Title is required');
    const payload = { title: title.trim(), description: description.trim(), priority, dueDate: dueDate ? new Date(dueDate).toISOString() : null };
    onSave && onSave(payload);
  }

  return (
    <form onSubmit={submit} className="card" aria-label={initial._id ? 'Edit task' : 'Add task'}>
      <div className="form-row">
        <label>
          Title
          <input aria-label="Title" autoFocus value={title} onChange={e=>setTitle(e.target.value)} required maxLength={200} />
        </label>
        <label>
          Description
          <textarea aria-label="Description" value={description} onChange={e=>setDescription(e.target.value)} maxLength={2000} />
        </label>
        <label>
          Priority
          <select aria-label="Priority" value={priority} onChange={e=>setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          Due date
          <input aria-label="Due date" type="datetime-local" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
        </label>
      </div>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <button type="submit" className="btn">Save</button>
        <button type="button" className="icon-btn" onClick={onCancel}>Cancel</button>
      </div>
      {error && <div role="alert" style={{color:'crimson',marginTop:8}}>{error}</div>}
    </form>
  );
}
