import { useUploadTab } from '../hooks/useUploadTab';

export default function UploadTab({ value, onChange }) {
  const {
    dragging,
    error,
    inputRef,
    isBase64,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleInput,
    triggerBrowse,
    triggerReplace,
    triggerRemove,
  } = useUploadTab(value, onChange);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <div
        onClick={triggerBrowse}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          border: `1.5px dashed ${dragging ? 'var(--accent)' : isBase64 ? 'var(--border-accent)' : 'var(--border)'}`,
          borderRadius: 'var(--radius-md)',
          background: dragging ? 'var(--accent-subtle)' : 'var(--bg-secondary)',
          transition: 'border-color 0.2s ease, background 0.2s ease',
          cursor: isBase64 ? 'default' : 'pointer',
          overflow: 'hidden',
          minHeight: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {isBase64 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem', width: '100%' }}>
            <img
              src={value}
              alt="avatar"
              style={{
                width: '80px', height: '80px', borderRadius: '50%',
                objectFit: 'cover', border: '2px solid var(--accent)', flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                ✓ Image loaded
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Click <strong style={{ color: 'var(--text-secondary)' }}>Replace</strong> to choose another file
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flexShrink: 0 }}>
              <button className="btn btn-sm" onClick={triggerReplace}>
                Replace
              </button>
              <button className="btn btn-sm btn-danger" onClick={triggerRemove}>
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1.75rem', pointerEvents: 'none' }}>
            <svg
              width="36" height="36" viewBox="0 0 24 24" fill="none"
              stroke={dragging ? 'var(--accent)' : 'var(--text-muted)'}
              strokeWidth="1.2" strokeLinecap="round"
              style={{ transition: 'stroke 0.2s ease' }}
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: dragging ? 'var(--accent)' : 'var(--text-secondary)',
              transition: 'color 0.2s ease',
            }}>
              {dragging ? 'Drop to upload' : 'Drag & drop or click to browse'}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6' , color: 'var(--text-muted)' }}>
              PNG, JPG, WEBP, GIF · max 4 MB
            </span>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleInput} />
      {error && <span className="form-error">⚠ {error}</span>}
    </div>
  );
}