import React from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header(){
  return (
    <header className="header" role="banner">
      <div>
        <h1 style={{margin:0}}>To-Do</h1>
        <div className="small">Accessible • Mobile-first • Persistent</div>
      </div>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <ThemeToggle />
      </div>
    </header>
  );
}
