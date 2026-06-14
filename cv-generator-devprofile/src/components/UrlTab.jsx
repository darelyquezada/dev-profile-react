import { useUrlTab } from '../hooks/useUrlTab';

export default function UrlTab({ value, onChange }) {
  const {
    input,
    error,
    preview,
    handleApply,
    handleClear,
    handleInputChange,
    handleImageError,
    handleImageLoad,
  } = useUrlTab(value, onChange);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <div style={{ display: 'flex', gap: '0.6rem' }}>
        <input
          className={`form-input${error ? ' error' : ''}`}
          placeholder="https://example.com/avatar.png"
          value={input}
          style={{ flex: 1 }}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleApply()}
        />
        <button className="btn btn-primary btn-sm" onClick={handleApply}>
          Apply
        </button>
        {preview && (
          <button className="btn btn-ghost btn-sm" onClick={handleClear} title="Clear">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
      
      {error && <span className="form-error">⚠ {error}</span>}

      {preview && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src={preview}
            alt="avatar preview"
            onError={(e) => handleImageError(e.currentTarget)}
            onLoad={(e) => handleImageLoad(e.currentTarget)}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--accent)',
              display: 'block',
            }}
          />
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              ✓ Preview loaded
            </p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', wordBreak: 'break-all' }}>
              {preview.length > 60 ? preview.slice(0, 57) + '…' : preview}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}