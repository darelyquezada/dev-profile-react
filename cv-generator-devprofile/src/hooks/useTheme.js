import { useCV, CVContext } from '../context/CVContext';

// Custom hook to abstract theme state management away from specific UI rendering
export function useTheme() {
  const { theme, toggleTheme } = useCV();
  
  // Memoizing this value isn't strictly necessary for a simple string comparison, 
  // but it cleanly exposes a boolean flag for quick theme checks across the app.
  const isDark = theme === 'dark';

  return {
    theme,
    isDark,
    toggleTheme
  };
}