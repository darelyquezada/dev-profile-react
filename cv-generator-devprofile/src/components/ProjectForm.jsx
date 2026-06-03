import { useProjectHook } from '../hooks/useFormValidation';
import { EMPTY_PROJECT } from '../utils/constants';
import { URL_REGEX } from '../utils/validations';

/* Form component to handle adding or updating engineering project records */
export default function ProjectForm({ editTarget, onDone }) {
  // Leverages the custom validation hook to isolate state and change actions
  const { 
    form, 
    errors, 
    handleChange, 
    handleSubmit 
  } = useProjectHook(editTarget, EMPTY_PROJECT, onDone);

  return (
    <div className="card" style={{ borderLeft: '3px solid var(--accent)', marginBottom: '1.5rem' }}>
      {/* Form Header */}
      <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span className="diamond" style={{ color: 'var(--accent)' }} />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', textTransform: 'uppercase' }}>
          {editTarget ? 'Edit Project' : 'Add Project'}
        </span>
      </div>

      {/* Name and Technologies Row */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Project Name *</label>
          <input
            className={`form-input${errors.name ? ' error' : ''}`}
            placeholder="e.g. Portfolio Site"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          {errors.name && <span className="form-error">⚠ {errors.name}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Technologies Used</label>
          <input
            className="form-input"
            placeholder="React, Node.js, MongoDB…"
            value={form.technologies}
            onChange={(e) => handleChange('technologies', e.target.value)}
          />
        </div>
      </div>

      {/* Description Area */}
      <div className="form-group">
        <label className="form-label">
          Description *
          <span style={{ color: 'var(--text-muted)', marginLeft: '0.4rem' }}>
            ({form.description.length}/400)
          </span>
        </label>
        <textarea
          className={`form-textarea${errors.description ? ' error' : ''}`}
          placeholder="What does this project do? What problem does it solve?"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
        {errors.description && <span className="form-error">⚠ {errors.description}</span>}
      </div>

      {/* External Repository and Deployment Hyperlinks */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Repository URL</label>
          <input
            className={`form-input${errors.repoUrl ? ' error' : ''}`}
            placeholder="https://github.com/you/repo"
            value={form.repoUrl}
            onChange={(e) => handleChange('repoUrl', e.target.value)}
          />
          {errors.repoUrl && <span className="form-error">⚠ {errors.repoUrl}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Deploy URL</label>
          <input
            className={`form-input${errors.deployUrl ? ' error' : ''}`}
            placeholder="https://myproject.vercel.app"
            value={form.deployUrl}
            onChange={(e) => handleChange('deployUrl', e.target.value)}
          />
          {errors.deployUrl && <span className="form-error">⚠ {errors.deployUrl}</span>}
        </div>
      </div>

      {/* Image Preview and Input Setup */}
      <div className="form-group">
        <label className="form-label">Screenshot / Image URL</label>
        <input
          className={`form-input${errors.image ? ' error' : ''}`}
          placeholder="https://..."
          value={form.image}
          onChange={(e) => handleChange('image', e.target.value)}
        />
        {errors.image && <span className="form-error">⚠ {errors.image}</span>}
        {form.image && URL_REGEX.test(form.image) && (
          <img
            src={form.image}
            alt="project preview"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            style={{
              marginTop: '0.6rem', width: '100%', maxHeight: '140px',
              objectFit: 'cover', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
            }}
          />
        )}
      </div>

      {/* Submission Actions Row */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button className="btn btn-primary" onClick={handleSubmit}>
          {editTarget ? 'Update Project' : 'Add Project'}
        </button>
        {onDone && <button className="btn btn-ghost" onClick={onDone}>Cancel</button>}
      </div>
    </div>
  );
}