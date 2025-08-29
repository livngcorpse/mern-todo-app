import React, { useState } from 'react';

export default function SearchFilterBar({ onSearch }){
  const [q, setQ] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');
  const [order, setOrder] = useState('asc');

  function apply(){
    onSearch({ q: q || undefined, priority: priority || undefined, completed: status===''?undefined: status==='complete', sortBy, order });
  }

  function reset(){
    setQ(''); setPriority(''); setStatus(''); setSortBy('dueDate'); setOrder('asc');
    onSearch({});
  }

  return (
    <div className="card" style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}} role="search" aria-label="Search and filters">
      <input aria-label="Search tasks" placeholder="Search title or description" value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==='Enter' && apply()} />
      <select aria-label="Filter priority" value={priority} onChange={e=>setPriority(e.target.value)}>
        <option value="">Any priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select aria-label="Filter status" value={status} onChange={e=>setStatus(e.target.value)}>
        <option value="">Any status</option>
        <option value="complete">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
      <select aria-label="Sort by" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
        <option value="dueDate">Due date</option>
        <option value="priority">Priority</option>
        <option value="createdAt">Created</option>
        <option value="title">Title</option>
      </select>
      <select aria-label="Sort order" value={order} onChange={e=>setOrder(e.target.value)}>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
      <div style={{display:'flex',gap:8,marginLeft:'auto'}}>
        <button className="btn" onClick={apply}>Apply</button>
        <button className="icon-btn" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
