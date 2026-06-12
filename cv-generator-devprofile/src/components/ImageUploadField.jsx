import { useState, useRef, useCallback } from 'react';
import { URL_REGEX } from '../utils/validations';

export default function ImageUploadField({ value, onChange }) {
  const [dragging, setDragging] = useState(false);
  const [error, setError]       = useState('');
  const inputRef                = useRef(null);

  // Validates file signatures and serializes buffer streams to local storage string formats
  const processFile = useCallback((file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('File must be an image (PNG, JPG, WEBP, etc.)');
      return;
    }

    // Limit maximum allocation constraints to 4MB
    if (file.size > 4 * 1024 * 1024) {
      setError('Image must be smaller than 4 MB');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsDataURL(file);
  }, [onChange]);

  // Captures and drops local system elements onto the virtual viewport area
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  }, [processFile]);

  const handleDragOver  = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = ()  => setDragging(false);
  const handleInput     = (e) => processFile(e.target.files?.[0]);
  const handleClear     = ()  => { onChange(''); setError(''); };

  const hasImage = value && (value.startsWith('data:') || URL_REGEX.test(value));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <div
        onClick={() => !hasImage && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          position: 'relative',
          border: `1.5px dashed ${dragging ? 'var(--accent)' : hasImage ? 'var(--border-accent)' : 'var(--border)'}`,
          borderRadius: 'var(--radius-md)',
          background: dragging ? 'var(--accent-subtle)' : 'var(--bg-secondary)',
          transition: 'border-color 0.2s ease, background 0.2s ease',
          cursor: hasImage ? 'default' : 'pointer',
          overflow: 'hidden',
          minHeight: '140px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {hasImage ? (
          <>
            <img
              src={value}
              alt="project preview"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block' }}
            />
            <button
              onClick={(e) => { e.stopPropagation(); handleClear(); }}
              title="Remove image"
              style={{
                position: 'absolute', top: '0.5rem', right: '0.5rem',
                background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 'var(--radius-sm)', color: '#fff',
                width: '28px', height: '28px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,60,60,0.75)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.65)'; }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              title="Replace image"
              style={{
                position: 'absolute', bottom: '0.5rem', right: '0.5rem',
                background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 'var(--radius-sm)', color: '#ccc',
                padding: '0.25rem 0.6rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                cursor: 'pointer', transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.85)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.65)'; }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Replace
            </button>
          </>
        ) : (
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '0.6rem',
            padding: '2rem', pointerEvents: 'none',
          }}>
            <svg
              width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke={dragging ? 'var(--accent)' : 'var(--text-muted)'}
              strokeWidth="1.2" strokeLinecap="round"
              style={{ transition: 'stroke 0.2s ease' }}
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: dragging ? 'var(--accent)' : 'var(--text-secondary)',
              transition: 'color 0.2s ease',
            }}>
              {dragging ? 'Drop to upload' : 'Drag & drop or click to browse'}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>
              PNG, JPG, WEBP · max 4 MB
            </span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleInput}
      />

      {error && <span className="form-error">⚠ {error}</span>}
    </div>
  );
}