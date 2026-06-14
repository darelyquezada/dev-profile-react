import { useState } from 'react';
import { useCV, CVContext } from '../context/CVContext';
import { PRESET_AVATARS, TAB_META } from '../utils/constants';
import UrlTab from './UrlTab';
import UploadTab from './UploadTab';
import PresetsTab from './PresetsTab';
import CurrentPreview from './CurrentPreview';

export default function AvatarForm() {
  const { cv, updatePersonal } = useCV();
  const avatar = cv.personal.avatar ?? '';

  // Resolves the context index state relative to incoming data profiles
  const detectTab = (val) => {
    if (!val) return 'url';
    if (val.startsWith('data:')) return 'upload';
    if (PRESET_AVATARS.some((a) => a.url === val)) return 'presets';
    return 'url';
  };

  const [activeTab, setActiveTab] = useState(() => detectTab(avatar));
  const [saved, setSaved]         = useState(false);

  const handleChange = (val) => {
    updatePersonal({ avatar: val });
    setSaved(false);
  };

  const handleSave = () => {
    updatePersonal({ avatar: cv.personal.avatar });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleRemove = () => {
    updatePersonal({ avatar: '' });
    setSaved(false);
  };

  const handleTabSwitch = (id) => {
    setActiveTab(id);
    if (id !== activeTab) {
      updatePersonal({ avatar: '' });
      setSaved(false);
    }
  };

  // Helper dictionary to cleanly render layout icons based on tab identifiers
  const renderTabIcon = (id) => {
    switch (id) {
      case 'url':
        return (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        );
      case 'upload':
        return (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        );
      case 'presets':
        return (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="form-section-title">Profile Image</div>

      {/* Current avatar snapshot indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
        <CurrentPreview value={avatar} />
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
            {avatar ? 'Avatar active' : 'No avatar set'}
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {avatar
              ? 'Your profile image will appear in the CV preview and the exported PDF.'
              : 'Add a photo via URL, upload a file from your device, or pick a preset avatar.'}
          </p>
        </div>
        {avatar && (
          <button className="btn btn-sm btn-danger" onClick={handleRemove} style={{ flexShrink: 0 }}>
            Remove
          </button>
        )}
      </div>

      {/* Navigation Tab Bar */}
      <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid var(--border)', marginBottom: '1.75rem' }}>
        {TAB_META.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabSwitch(tab.id)}
              style={{
                background: 'none', border: 'none',
                borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                marginBottom: '-1px', padding: '0.65rem 1.1rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.45rem',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                transition: 'color 0.15s ease',
              }}
            >
              <span style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}>
                {renderTabIcon(tab.id)}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Context Container */}
      <div className="animate-fade-up" key={activeTab}>
        {activeTab === 'url'     && <UrlTab     value={avatar} onChange={handleChange} />}
        {activeTab === 'upload'  && <UploadTab  value={avatar} onChange={handleChange} />}
        {activeTab === 'presets' && <PresetsTab value={avatar} onChange={handleChange} />}
      </div>

      {/* Global Context Persistence Trigger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={!avatar}
          style={{ opacity: avatar ? 1 : 0.4, cursor: avatar ? 'pointer' : 'not-allowed' }}
        >
          Save Avatar
        </button>
        {saved && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            ✓ Avatar saved
          </span>
        )}
      </div>
    </div>
  );
}