import { useState, useRef, useCallback } from 'react';
import { URL_REGEX } from '../utils/validations';

export function useUploadTab(value, onChange) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  // Expanded validation check to catch both local binary base-64 encodings and remote hyper-links
  const hasImage = value && (value.startsWith('data:image/') || value.startsWith('data:') || URL_REGEX.test(value));

  const processFile = useCallback((file) => {
    if (!file) return;

    // Reject processing non-image binaries to protect systemic state shape consistency
    if (!file.type.startsWith('image/')) {
      setError('File must be an image (PNG, JPG, WEBP, etc.)');
      return;
    }

    // Limit maximum allocation constraints to 4MB to prevent local memory overflow
    if (file.size > 4 * 1024 * 1024) {
      setError('Image must be smaller than 4 MB');
      return;
    }

    setError('');
    
    // Abstract the local file buffering conversion stream away from individual node layers
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsDataURL(file);
  }, [onChange]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files?.[0]);
  }, [processFile]);

  // Intercept defaults to guarantee accurate targeting on physical dropping interactions
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);
  
  const handleInput = (e) => processFile(e.target.files?.[0]);

  const handleClear = () => {
    onChange('');
    setError('');
  };

  const triggerBrowse = () => {
    if (!hasImage) {
      inputRef.current?.click();
    }
  };

  const triggerReplace = (e) => {
    // Kill the event bubbling sequence to block unnecessary parent click execution loops
    e.stopPropagation();
    inputRef.current?.click();
  };

  const triggerRemove = (e) => {
    e.stopPropagation();
    handleClear();
  };

  return {
    dragging,
    error,
    inputRef,
    hasImage,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleInput,
    triggerBrowse,
    triggerReplace,
    triggerRemove,
  };
}