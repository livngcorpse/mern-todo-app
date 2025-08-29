import React from 'react';
import { formatDistanceToNow, format } from 'date-fns';

export default function TaskItem({ task, onToggle, onEdit, onDelete, selectable, onSelect, selected }){
  const due = task.dueDate ? new Date(task.dueDate) : null;
  return (
    <div className="task-row card" role="listitem" aria-label={`Task ${task.title}`}>
      {selectable && (
        <input aria-label={`Select ${task.title}`} type="checkbox" checked={!!selected} onChange={e => onSelect && onSelect(task._id, e.target.checked)} />
      )}

      <input aria-label={`Mark ${task.title} completed`} type="checkbox" checked={!!task.completed} onChange={()=>onToggle(task._id)} />

      <div className="task-title">
        <div style={{display:'flex',alignItems:'baseline',gap:8}}>
          <strong style={{textDecoration:task.completed? 'line-through':''}}>{task.title}</strong>
          <span className="small">{task.priority}</span>
        </div>
        {task.description && <div className="small">{task.description}</div>}
        <div className="small">
          {due ? `Due ${format(due,'PP p')} (${formatDistanceToNow(due,{addSuffix:true})})` : 'No due date'}
        </div>
      </div>

      <div style={{display:'flex',gap:8}}>
        <button className="icon-btn" onClick={()=>onEdit(task)}>Edit</button>
        <button className="icon-btn" onClick={()=>onDelete(task._id)} aria-label={`Delete ${task.title}`}>Delete</button>
      </div>
    </div>
  );
}
