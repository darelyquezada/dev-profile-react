import { useProjectCard } from '../hooks/useProjectCard';
import { parseTechnologies } from '../utils/formatters';
import ProjectForm from './ProjectForm';

export default function ProjectCard({ project }) {
  // Extracting UI toggles and layout context triggers via custom hook hooks boundaries
  const { editing, handleStartEdit, handleStopEdit, handleDelete } = useProjectCard(project.id);

  // Computing operational tag collections from static strings through pure side-effect-free utils
  const techList = parseTechnologies(project.technologies);

  // Render optimization branch: Short-circuits directly into a structural form modifying the current entity
  if (editing) {
    return <ProjectForm editTarget={project} onDone={handleStopEdit} />;
  }

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        transition: 'transform 0.2s ease',
      }}
    >
      {/* Image Container Wrapper */}
      {project.image && (
        <div
          style={{
            margin: '-1.5rem -1.5rem 0',
            height: '130px',
            overflow: 'hidden',
            borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <img
            src={project.image}
            alt={project.name}
            onError={(e) => { e.target.parentElement.style.display = 'none'; }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Header Utilities */}
      <div className="flex-between">
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
            lineHeight: 1,
          }}
        >
          {project.name}
        </span>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button className="btn-icon" onClick={handleStartEdit} title="Edit">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className="btn-icon"
            onClick={handleDelete}
            title="Delete"
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

      {/* Project Description Block */}
      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
        {project.description}
      </p>

      {/* Technology Tags Render Loop */}
      {techList.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {techList.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      )}

      {/* External Target Navigation Hyperlinks */}
      {(project.repoUrl || project.deployUrl) && (
        <div
          style={{
            display: 'flex',
            gap: '0.6rem',
            paddingTop: '0.5rem',
            borderTop: '1px solid var(--border)',
          }}
        >
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-ghost"
              style={{ textDecoration: 'none' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.01 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Repo
            </a>
          )}
          {project.deployUrl && (
            <a
              href={project.deployUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm"
              style={{ textDecoration: 'none' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live
            </a>
          )}
        </div>
      )}
    </div>
  );
}