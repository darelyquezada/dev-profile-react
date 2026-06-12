import { useState } from 'react';
import { useProjectHook } from '../hooks/useFormValidation';
import { EMPTY_PROJECT, IMAGE_TABS } from '../utils/constants';
import { URL_REGEX } from '../utils/validations';
import ImageUploadField from './ImageUploadField';

export default function ProjectForm({ editTarget, onDone }) {
  const { form, errors, handleChange, handleSubmit } = useProjectHook(editTarget, EMPTY_PROJECT, onDone);
  
  // Set default tab state view depending on the payload format types
  const [imageTab, setImageTab] = useState(() =>
    editTarget?.image?.startsWith('data:') ? 'upload' : 'url'
  );

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

      {/* Screenshot / Image Context section */}
      <div className="form-group">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
          <label className="form-label" style={{ margin: 0 }}>Screenshot / Image</label>

          {/* Tab Selection Row */}
          <div style={{ display: 'flex', gap: '0', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
            {IMAGE_TABS.map((tab) => {
              const active = imageTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setImageTab(tab.id);
                    handleChange('image', '');
                  }}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '0.3rem 0.75rem', cursor: 'pointer',
                    border: 'none',
                    borderRight: tab.id === 'url' ? '1px solid var(--border)' : 'none',
                    background: active ? 'var(--accent)' : 'transparent',
                    color: active ? 'var(--bg)' : 'var(--text-secondary)',
                    fontWeight: active ? '700' : '400',
                    transition: 'background 0.15s ease, color 0.15s ease',
                  }}
                >
                  {tab.id === 'url' ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                      </svg>
                      {tab.label}
                    </span>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                      {tab.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Panel rendering determined by selected asset source */}
        {imageTab === 'url' ? (
          <>
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
          </>
        ) : (
          <ImageUploadField
            value={form.image}
            onChange={(val) => handleChange('image', val)}
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