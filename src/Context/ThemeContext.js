// src/context/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const ThemeContext = createContext();

// Create a custom hook to use the theme
export const useTheme = () => {
  return useContext(ThemeContext);
};

// Create the Theme Provider component
export const ThemeProvider = ({ children }) => {
  // Try to get theme from localStorage, default to 'light'
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Effect to apply theme class to body and save to localStorage
  useEffect(() => {
    document.body.className = theme; // Add 'light' or 'dark' class to body
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Provide the theme and toggle function to children
  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};