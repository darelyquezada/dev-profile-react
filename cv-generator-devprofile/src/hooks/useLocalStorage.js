import { useState, useCallback } from 'react';

export function useLocalStorage(key, initialValue) {
  
  // Initialize state with a lazy initializer function to avoid redundant disk reads
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // If cached item exists, parse and return it; otherwise, evaluate the fallback initial value
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Safe fail-safe execution fallback in case browser privacy shields block storage APIs
      console.error(`[useLocalStorage] Error reading key "${key}":`, error);
      return initialValue;
    }
  });

  // Wrap the setter function in useCallback to maintain reference integrity across re-renders
  // Use the functional updater form of setState to avoid stale closures when callers
  // provide an updater function (prev => next).
  const setValue = useCallback((value) => {
    try {
      setStoredValue((prev) => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (err) {
          console.error(`[useLocalStorage] Error writing key "${key}" to localStorage:`, err);
        }
        return valueToStore;
      });
    } catch (error) {
      console.error(`[useLocalStorage] Error setting key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue];
}