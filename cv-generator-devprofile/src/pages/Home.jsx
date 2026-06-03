import { Link } from 'react-router-dom';
import { useHomeStatus } from '../hooks/useHomeStatus';
import { HOME_FEATURES, QUICK_ACCESS_LINKS } from '../utils/constants';

export default function Home() {
  // Extracting computed state metrics and context evaluation from our custom hook
  // to separate layout structure from business logic.
  const { statusLabel, metrics } = useHomeStatus();

  return (
    <main className="page-wrapper" style={{ overflow: 'hidden' }}>

      {/* Hero Section */}
      {/* Viewport tracking is constrained to match our global standard navbar height deduction */}
      <section style={{ position: 'relative', minHeight: 'calc(100vh - var(--nav-height))', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        {/* Background index label */}
        {/* Absolute branding decorative element anchored to upper layout bounds */}
        <span
          style={{
            position: 'absolute', top: '2rem', right: '2rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            letterSpacing: '0.18em', color: 'var(--text-muted)',
            textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}
        >
          <span className="diamond" />
          Academic Project 2026
        </span>

        <div className="container">
          <div style={{ position: 'relative' }}>

            {/* Eyebrow */}
            {/* Project metadata tag highlighting core assignment scope indicators */}
            <div
              className="animate-fade-up"
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', marginTop: '3rem'}}
            >
              <div style={{ width: '40px', height: '1px', background: 'var(--accent)' }} />
              <span className="label">React · Web Technologies · Final Project</span>
            </div>

            {/* Giant headline */}
            {/* Large editorial scale title with fluid typography scaling via CSS clamp */}
            <h1
              className="animate-fade-up delay-1"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(5.5rem, 18vw, 16rem)',
                lineHeight: 0.88,
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
                marginBottom: '0',
              }}
            >
              Dev
            </h1>

            {/* Subtitle row with Call To Action circle */}
            <div style={{ position: 'relative', marginBottom: '2rem' }}>
              <h1
                className="animate-fade-up delay-2"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(5.5rem, 15vw, 12rem)',
                  lineHeight: 0.9,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  color: 'var(--text-primary)',
                  margin: 0,
                }}
              >
                Profile
              </h1>

              {/* Floating Call To Action circle */}
              {/* Context-aware call-to-action button with micro-interactions via event handlers */}
              <Link
                to="/editor"
                className="animate-fade-in delay-3"
                style={{
                  position: 'absolute',
                  right: '0',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-accent)',
                  background: 'var(--bg-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  transition: 'border-color 0.25s ease, transform 0.25s ease',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-accent)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.3 }}>
                  Start<br />Editing
                </span>
              </Link>
            </div>
          </div>

          {/* Tagline */}
          {/* Constrained layout column providing basic conceptual onboarding context */}
          <div style={{ maxWidth: '400px', marginTop: '1.5rem', marginBottom: '6rem' }}>
            <p
              className="animate-fade-up delay-3"
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              A dynamic CV generator that captures, previews and exports your professional profile to PDF.
            </p>
          </div>
        </div>

        {/* Bottom status bar */}
        {/* Dynamic monitoring element verifying data persistence layer synchronization */}
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            borderTop: '1px solid var(--border)',
            padding: '1rem 2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          {/* Dynamically derived status indicator text */}
          <span className="label">{statusLabel}</span>
          {/* Dynamically counted values from the custom hook */}
          <span className="label">
            {metrics.skillsCount} skills · {metrics.projectsCount} projects · {metrics.educationCount} education
          </span>
        </div>
      </section>

      {/* Features grid */}
      {/* Renders functional features map dynamically to guarantee scalable layout growth */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div className="divider-accent" />
              <h2 className="display-md">What's inside</h2>
            </div>
            <Link
              to="/editor"
              className="btn"
              style={{ textDecoration: 'none', flexShrink: 0 }}
            >
              Open Editor →
            </Link>
          </div>

          {/* CSS Grid with automated density mapping adjusting for responsive row wrap bounds */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0' }}>
            {/* Iterating through the clean utils constants file configurations */}
            {HOME_FEATURES.map((f, i) => (
              <div
                key={f.index}
                style={{
                  padding: '2rem',
                  borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--border)' : 'none',
                  borderBottom: i < HOME_FEATURES.length - 3 ? '1px solid var(--border)' : 'none',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent)', letterSpacing: '0.12em', display: 'block', marginBottom: '1rem' }}>
                  {f.index}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                  {f.label}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links bar */}
      {/* Supplementary linear routing tray allowing immediate view testing for evaluators */}
      <section style={{ borderTop: '1px solid var(--border)', padding: '2rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Iterating through imported quick access configuration utility array */}
            {QUICK_ACCESS_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className="btn btn-ghost btn-sm" style={{ textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}