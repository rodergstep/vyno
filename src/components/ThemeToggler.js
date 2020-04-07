import React from 'react';
import { useTheme } from './ThemeContext';

export default function ThemeToggler() {
  const [theme, toggleTheme] = useTheme();
  const isDarkTheme = theme === 'dark';
  return (
      <div onClick={toggleTheme}>
        <span role="img" aria-label={`${isDarkTheme ? 'Sun' : 'Moon'} emoji`}>
          {isDarkTheme ? '🌞' : '🌙'}
        </span>{' '}
        {isDarkTheme ? 'Light' : 'Dark'} mode
      </div>
  );
}
