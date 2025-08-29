import React from 'react';

export default function BulkActions({ selectedCount, onMarkComplete, onDelete }){
  if (!selectedCount) return null;
  return (
    <div className="card" role="region" aria-label="Bulk actions" style={{display:'flex',gap:8,alignItems:'center',marginTop:8}}>
      <div className="small">{selectedCount} selected</div>
      <button className="btn" onClick={onMarkComplete}>Mark complete</button>
      <button className="icon-btn" onClick={onDelete}>Delete</button>
    </div>
  );
}
