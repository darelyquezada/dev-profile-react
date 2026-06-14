import React from 'react';

// Explicitly mapping out the core stack to keep the about page maintainable
// if we swap out libraries (e.g., switching from jsPDF to another generator later).
const TECH_STACK = [
  { name: 'React',        role: 'UI Framework',       index: '01' },
  { name: 'Vite',         role: 'Build Tool',         index: '02' },
  { name: 'React Router', role: 'Client Routing',     index: '03' },
  { name: 'Context API',  role: 'State Management',   index: '04' },
  { name: 'LocalStorage', role: 'Data Persistence',   index: '05' },
  { name: 'jsPDF',        role: 'PDF Generation',     index: '06' },
  { name: 'html2canvas',  role: 'DOM Capture',        index: '07' },
  { name: 'CSS Variables', role: 'Theme System',       index: '08' },
];

// High-level checklist of the core features implemented across the application
const FEATURES = [
  'Dynamic application built entirely on React component architecture.',
  'Controlled forms featuring real-time validation and error state handling.',
  'Full CRUD operations to add, edit, and remove entries across all profile sections.',
  'Real-time web preview of the CV layout directly within the interface.',
  'Optimized PDF export functionality that preserves original visual styling.',
  'Persistent data storage using localStorage to maintain user state across sessions.',
  'Interactive user experience with native support for light and dark themes.',
  'Dynamic skills visualization supporting bar, donut, or radar chart formats.',
  'Fully responsive design structure tailored for both desktop and mobile viewports.'
];

export default function About() {
  return (
    <main className="page-wrapper">
      {/* Container spacing matches the main dashboard layout for visual consistency */}
      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>

        {/* Hero Section */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="divider-accent" />
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              lineHeight: 0.9,
              textTransform: 'uppercase',
              marginBottom: '2rem',
              color: 'var(--text-primary)',
            }}
          >
            About
            <br />
            the Project
          </h1>
          <p
            style={{
              maxWidth: '650px',
              fontSize: '0.95rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
            }}
          >
            DevProfile is a reactive web platform designed for building, personalizing, 
            and managing professional CVs. The system allows users to dynamically structure 
            their technical and work history, offering a live real-time preview alongside 
            the ability to export the finalized data into a clean, production-ready PDF document.
          </p>
        </div>

        {/* Split grid layout for features and tech stack on desktop viewports */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>

          {/* Features Checklist */}
          <div>
            <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem' }}>
              <h2 className="display-sm">What the App Does</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {FEATURES.map((feat, i) => (
                <div
                  key={i}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}
                >
                  {/* Custom geometric list bullet styled via CSS variables */}
                  <span
                    style={{
                      display: 'block', width: '6px', height: '6px',
                      border: '1.5px solid var(--accent)',
                      transform: 'rotate(45deg)', flexShrink: 0, marginTop: '0.35rem',
                    }}
                  />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Display */}
          <div>
            <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem' }}>
              <h2 className="display-sm">Technologies Used</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {TECH_STACK.map((t, i) => (
                <div
                  key={t.name}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '0.9rem 0',
                    // Disabling the bottom border on the very last element to avoid double lines
                    borderBottom: i < TECH_STACK.length - 1 ? '1px solid var(--border)' : 'none',
                    transition: 'padding-left 0.15s ease',
                  }}
                  // Simple inline mouse tracking to handle the interactive hover indent effect
                  onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = '0.5rem'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = '0'; }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--accent)', letterSpacing: '0.1em', width: '22px', flexShrink: 0 }}>
                    {t.index}
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', textTransform: 'uppercase', flex: 1 }}>
                    {t.name}
                  </span>
                  <span className="label">{t.role}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}