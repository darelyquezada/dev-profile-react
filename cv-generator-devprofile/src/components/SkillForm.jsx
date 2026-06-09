import { useSkillHook } from '../hooks/useFormValidation';
import { CATEGORIES, LEVELS, EMPTY_SKILL } from '../utils/constants';

/* Form component to handle adding or updating professional skill entries */
export default function SkillForm({ editTarget, onDone }) {
  // Leverages the custom validation hook to manage state and errors cleanly
  const { 
    form, 
    errors, 
    handleChange, 
    handleSubmit, 
    levelValues 
  } = useSkillHook(editTarget, EMPTY_SKILL, onDone);

  return (
    <div
      className="card"
      style={{ borderLeft: '3px solid var(--accent)', marginBottom: '1.5rem' }}
    >
      {/* Form Header */}
      <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span className="diamond" style={{ color: 'var(--accent)' }} />
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            textTransform: 'uppercase',
          }}
        >
          {editTarget ? 'Edit Skill' : 'Add Skill'}
        </span>
      </div>

      {/* Name and Category Fields */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Skill Name *</label>
          <input
            className={`form-input${errors.name ? ' error' : ''}`}
            placeholder="e.g. React"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          {errors.name && <span className="form-error">⚠ {errors.name}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Proficiency Level Buttons selection */}
      <div className="form-group">
        <label className="form-label">Proficiency Level</label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => handleChange('level', lvl)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.35rem 0.8rem',
                border: `1px solid ${form.level === lvl ? 'var(--accent)' : 'var(--border-accent)'}`,
                background: form.level === lvl ? 'var(--accent-subtle)' : 'transparent',
                color: form.level === lvl ? 'var(--accent)' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {lvl}
            </button>
          ))}
        </div>
        
        {/* Dynamic visual progress bar based on level value mapping */}
        <div className="progress-bar" style={{ marginTop: '0.75rem' }}>
          <div className="progress-fill" style={{ width: `${levelValues[form.level]}%` }} />
        </div>
      </div>

      {/* Skill Description Area */}
      <div className="form-group">
        <label className="form-label">
          Brief Description *
          <span style={{ color: 'var(--text-muted)', marginLeft: '0.4rem' }}>
            ({form.description.length}/200)
          </span>
        </label>
        <textarea
          className={`form-textarea${errors.description ? ' error' : ''}`}
          placeholder="Briefly describe your experience with this skill..."
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          style={{ minHeight: '72px' }}
        />
        {errors.description && <span className="form-error">⚠ {errors.description}</span>}
      </div>

      {/* Action Buttons Row */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button className="btn btn-primary" onClick={handleSubmit}>
          {editTarget ? 'Update Skill' : 'Add Skill'}
        </button>
        {onDone && (
          <button className="btn btn-ghost" onClick={onDone}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}