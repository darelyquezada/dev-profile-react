import CVPreview from '../components/CVPreview';
import { usePDFExport } from '../hooks/usePDFExport';

export default function Preview() {
  // Consumimos toda la lógica destructurando nuestro hook personalizado
  const { cv, exporting, hasData, goToEditor, handleExport } = usePDFExport();

  return (
    <main className="page-wrapper">
      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="divider-accent" />
          <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 className="display-md">CV Preview</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.4rem' }}>
                Review your CV before exporting to PDF
              </p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        {hasData && (
          <div style={{
            display: 'flex', gap: '2rem', flexWrap: 'wrap',
            padding: '0.85rem 1.25rem',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
            marginBottom: '2rem', background: 'var(--bg-card)',
          }}>
            {[
              { label: 'Skills',    value: cv.skills.length       },
              { label: 'Projects',  value: cv.projects.length     },
              { label: 'Education', value: cv.education.length    },
              { label: 'Extra',     value: cv.extra.items.length  },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.4rem',
                  color: value > 0 ? 'var(--accent)' : 'var(--text-muted)', lineHeight: 1,
                }}>
                  {value}
                </span>
                <span className="label">{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* CV Preview Container */}
        <CVPreview />

        {/* Bottom actions */}
        <div style={{
          marginTop: '2rem', paddingTop: '1.5rem',
          borderTop: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        }}>
          <span className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ color: 'var(--accent)' }}>●</span>
            Preview updates automatically when you edit data
          </span>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-ghost" onClick={goToEditor}>
              ← Go to Editor
            </button>
            <ExportButton loading={exporting} onClick={handleExport} disabled={!hasData} />
          </div>
        </div>
      </div>
    </main>
  );
}

/* Reusable export button */
function ExportButton({ loading, onClick, disabled }) {
  return (
    <button
      className="btn btn-primary"
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'opacity 0.2s ease',
      }}
    >
      {loading ? (
        <svg
          width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round"
          style={{ animation: 'spin 0.8s linear infinite' }}
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      )}
      {loading ? 'Preparing…' : 'Export PDF'}
    </button>
  );
}