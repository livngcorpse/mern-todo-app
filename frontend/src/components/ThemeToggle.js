import React, { useEffect, useState } from 'react';

export default function ThemeToggle(){
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  useEffect(()=>{ document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('theme', theme); },[theme]);
  return (
    <button aria-pressed={theme==='dark'} className="icon-btn" onClick={()=>setTheme(t=>t==='dark'?'light':'dark')} aria-label="Toggle theme">
      {theme==='dark' ? '🌙' : '☀️'}
    </button>
  );
}
