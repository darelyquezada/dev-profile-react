import { useState } from 'react';
import { URL_REGEX } from '../utils/validations';

export function useUrlTab(initialValue, onChange) {
  // Sanitize initial values to avoid feeding malformed strings directly into the UI layer
  const getSanitizedValue = (val) => (val && URL_REGEX.test(val) ? val : '');

  const [input, setInput] = useState(() => getSanitizedValue(initialValue));
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(() => getSanitizedValue(initialValue));

  const handleApply = () => {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      setError('Enter a URL');
      return;
    }

    if (!URL_REGEX.test(trimmedInput)) {
      setError('Must start with http:// or https://');
      return;
    }

    // Flush active errors on successful format validation before attempting to resolve the remote source
    setError('');
    setPreview(trimmedInput);
    onChange(trimmedInput);
  };

  const handleClear = () => {
    setInput('');
    setPreview('');
    setError('');
    onChange('');
  };

  const handleInputChange = (value) => {
    setInput(value);
    // Clear textual validation errors immediately as the user edits, providing reactive feedback
    setError('');
  };

  const handleImageError = (currentTarget) => {
    // Hide the broken img node immediately to protect layout integrity if the URL points to a non-image binary or 404
    currentTarget.style.display = 'none';
    setError('Could not load image — check the URL');
  };

  const handleImageLoad = (currentTarget) => {
    // Re-display the node safely once the browser confirms the source resolves into a valid renderable image
    currentTarget.style.display = 'block';
    setError('');
  };

  return {
    input,
    error,
    preview,
    handleApply,
    handleClear,
    handleInputChange,
    handleImageError,
    handleImageLoad,
  };
}