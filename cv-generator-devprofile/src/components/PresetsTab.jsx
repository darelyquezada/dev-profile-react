import { PRESET_AVATARS } from '../utils/constants';
import '../styles/global.css';

export default function PresetsTab({ value, onChange }) {
  
  // Single pass array scanning helper to isolate structural lookup logic from return block
  const selectedAvatar = PRESET_AVATARS.find((av) => av.url === value);

  const handleSelection = (avatarUrl, isSelected) => {
    // Structural toggle: deselect back to empty string when clicking an already active preset
    onChange(isSelected ? '' : avatarUrl);
  };

  const handleImageError = (currentTarget) => {
    // Intercept image fetching failures to prevent broken binary layouts from breaking UI flow
    const buttonWrapper = currentTarget.closest('.preset-button');
    if (buttonWrapper) {
      buttonWrapper.style.display = 'none';
    }
  };

  return (
    <div className="presets-container">
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Select a predefined avatar
      </p>
      
      <div className="presets-grid">
        {PRESET_AVATARS.map((av) => {
          const isSelected = value === av.url;
          
          return (
            <button
              key={av.id}
              onClick={() => handleSelection(av.url, isSelected)}
              title={av.label}
              className={`preset-button${isSelected ? ' selected' : ''}`}
            >
              <img
                src={av.url}
                alt={av.label}
                onError={(e) => handleImageError(e.currentTarget)}
                className="preset-img"
              />
              
              {isSelected && (
                <span className="selected-badge">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--bg)" strokeWidth="3.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {selectedAvatar && (
        <p style={{ marginTop: '0.85rem', fontFamily: 'var(--font-mono)', fontSize: '0.63rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span>✓</span>
          {selectedAvatar.label} selected
        </p>
      )}
    </div>
  );
}