import { useSkillCard } from '../hooks/useSkillCard';
import { LEVEL_VALUES, CATEGORY_COLORS } from '../utils/constants';
import SkillForm from './SkillForm';

/* Card component to render interactive structural items for single skill entries */
export default function SkillCard({ skill }) {
  // Pulls action controls and view states from the custom card hook
  const { 
    editing, 
    handleStartEdit, 
    handleStopEdit, 
    handleDelete 
  } = useSkillCard(skill.id);

  // Renders the form layout directly if the card switches to editing state
  if (editing) {
    return <SkillForm editTarget={skill} onDone={handleStopEdit} />;
  }

  // Resolves styling metrics and visual fills from the centralized constants mapping
  const pct = LEVEL_VALUES[skill.level] ?? 50;
  const color = CATEGORY_COLORS[skill.category] ?? '#888888';

  return (
    <div
      className="card"
      style={{
        borderLeft: `3px solid ${color}`,
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Meta Row: Title and Category Tags */}
      <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.15rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--text-primary)',
              lineHeight: 1,
            }}
          >
            {skill.name}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color,
            }}
          >
            {skill.category}
          </span>
        </div>

        {/* Action Controls Group */}
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button className="btn-icon" onClick={handleStartEdit} title="Edit skill">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className="btn-icon"
            onClick={handleDelete}
            title="Delete skill"
            style={{ borderColor: 'transparent', color: 'var(--text-muted)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-red)'; e.currentTarget.style.borderColor = 'var(--accent-red)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'transparent'; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Metric Indicators and Progress Bar */}
      <div style={{ marginBottom: '0.6rem' }}>
        <div className="flex-between" style={{ marginBottom: '0.3rem' }}>
          <span className="label">{skill.level}</span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
            }}
          >
            {pct}%
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
        </div>
      </div>

      {/* Optional Description block */}
      {skill.description && (
        <p
          style={{
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            marginTop: '0.5rem',
          }}
        >
          {skill.description}
        </p>
      )}
    </div>
  );
}