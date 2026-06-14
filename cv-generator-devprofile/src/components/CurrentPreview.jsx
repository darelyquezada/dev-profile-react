import { useState } from 'react';

export default function CurrentPreview({ value }) {
  const [valid, setValid] = useState(true);

  if (!value) return (
    <div style={{ width: '90px', height: '90px', borderRadius: '50%', border: '2px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.2" strokeLinecap="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    </div>
  );

  return (
    <img
      src={value}
      alt="current avatar"
      onError={() => setValid(false)}
      onLoad={() => setValid(true)}
      style={{
        width: '90px', height: '90px', borderRadius: '50%',
        objectFit: 'cover',
        border: `2px solid ${valid ? 'var(--accent)' : 'var(--accent-red)'}`,
        flexShrink: 0,
        display: 'block',
      }}
    />
  );
}