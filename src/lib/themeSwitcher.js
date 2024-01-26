"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check local storage or system preference
    const localTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(localTheme || systemPreference);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  

  return (
    <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
      {theme === 'light' ? (
        <Image src="/moon.svg" alt="Dark mode" width={24} height={24} />
      ) : (
        <Image src="/sun.svg" alt="Light mode" width={24} height={24} />
      )}
    </button>
  );
};

export default ThemeSwitcher;
