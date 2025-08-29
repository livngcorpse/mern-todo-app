import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggle, onEdit, onDelete, selectable=false, selectedIds=new Set(), onSelect }){
  if (!tasks || tasks.length===0) return <div className="card">No tasks</div>;
  return (
    <div role="list" aria-label="Task list">
      {tasks.map(t=> (
        <TaskItem key={t._id} task={t} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} selectable={selectable} selected={selectedIds.has(t._id)} onSelect={onSelect} />
      ))}
    </div>
  );
}
