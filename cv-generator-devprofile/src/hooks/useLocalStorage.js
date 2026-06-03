import { useState, useCallback } from 'react';

export function useLocalStorage(key, initialValue) {
  
  // 1. Initialize state with a lazy initializer function to avoid redundant disk reads
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

  // 2. Wrap the setter function in useCallback to maintain reference integrity across re-renders
  const setValue = useCallback((value) => {
    try {
      // Support functional state updates (e.g., setValue(prev => ...)) just like standard useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Update the internal operational React state loop
      setStoredValue(valueToStore);
      
      // Serialize and commit the new state data structure directly to disk storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`[useLocalStorage] Error setting key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}