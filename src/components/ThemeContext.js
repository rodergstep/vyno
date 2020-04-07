import React from 'react';
import usePersistedState from './usePersistedState';

export const ThemeContext = React.createContext();
export const ThemeProvider = props => {
  const [theme, setTheme] = usePersistedState('theme', 'light');
  const context = React.useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
  return (
    <ThemeContext.Provider value={context}>
      <div
        theme={theme === 'dark' ? 'darkTheme' : 'lightTheme'}
        {...props}
      />
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const themeContext = React.useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("useTheme can't be used witout outside of a ThemeProvider");
  }
  const { theme, setTheme } = themeContext;
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  return [theme, toggleTheme];
};
