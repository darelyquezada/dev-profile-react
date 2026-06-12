import { useState } from 'react';
import { useCV } from '../context/CVContext';
import { EMPTY_EDUCATION } from '../utils/constants';
import { validateEducationForm } from '../utils/validations';

/* ── Single row display for Education Item ── */
function EducationItem({ item, onEdit, onDelete }) {
  return (
    <div
      className="card card-accent"
      style={{ marginBottom: '0.85rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.25rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              textTransform: 'uppercase',
            }}
          >
            {item.program || '—'}
          </span>
          <span className="label">{item.period}</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
          {item.institution}
        </p>
        {item.description && (
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {item.description}
          </p>
        )}
        {item.evidenceUrl && (
          <a
            href={item.evidenceUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '0.4rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              textDecoration: 'none',
            }}
          >
            → View Certificate
          </a>
        )}
      </div>
      <div style={{ display: 'flex', gap: '0.35rem', flexShrink: 0 }}>
        <button className="btn-icon" onClick={() => onEdit(item)} title="Edit">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          className="btn-icon"
          onClick={() => onDelete(item.id)}
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
  );
}

/* ── Main Form Component ── */
export default function EducationForm() {
  const { cv, addEducation, updateEducation, deleteEducation } = useCV();
  const [form, setForm]         = useState(EMPTY_EDUCATION);
  const [errors, setErrors]   = useState({});
  const [editId, setEditId]   = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = () => {
    const validationErrors = validateEducationForm(form);
    
    if (Object.keys(validationErrors).length) { 
      setErrors(validationErrors); 
      return; 
    }
    
    if (editId) updateEducation(editId, form);
    else addEducation(form);
    
    setForm(EMPTY_EDUCATION);
    setErrors({});
    setEditId(null);
    setShowForm(false);
  };

  const startEdit = (item) => {
    setForm({ 
      institution: item.institution, 
      program: item.program, 
      period: item.period, 
      description: item.description, 
      evidenceUrl: item.evidenceUrl 
    });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setForm(EMPTY_EDUCATION);
    setErrors({});
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="form-section-title">Education & Certifications</div>

      {/* List */}
      {cv.education.length === 0 && !showForm && (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}>
          No records yet. Add your first entry below.
        </p>
      )}
      
      {cv.education.map((item) => (
        <EducationItem key={item.id} item={item} onEdit={startEdit} onDelete={deleteEducation} />
      ))}

      {/* Form toggle */}
      {!showForm ? (
        <button className="btn" onClick={() => setShowForm(true)} style={{ marginTop: '0.5rem' }}>
          + Add Education / Certification
        </button>
      ) : (
        <div className="card" style={{ borderLeft: '3px solid var(--accent)', marginTop: '1rem' }}>
          <div style={{ marginBottom: '1rem', fontFamily: 'var(--font-display)', fontSize: '1.1rem', textTransform: 'uppercase' }}>
            {editId ? 'Edit Entry' : 'New Entry'}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Institution *</label>
              <input
                className={`form-input${errors.institution ? ' error' : ''}`}
                placeholder="e.g. UAA"
                value={form.institution}
                onChange={(e) => handleChange('institution', e.target.value)}
              />
              {errors.institution && <span className="form-error">⚠ {errors.institution}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Period / Year</label>
              <input
                className="form-input"
                placeholder="e.g. 2022–2026"
                value={form.period}
                onChange={(e) => handleChange('period', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Program / Course / Certification *</label>
            <input
              className={`form-input${errors.program ? ' error' : ''}`}
              placeholder="e.g. B.S. Computer Science"
              value={form.program}
              onChange={(e) => handleChange('program', e.target.value)}
            />
            {errors.program && <span className="form-error">⚠ {errors.program}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Brief Description
              <span style={{ color: 'var(--text-muted)', marginLeft: '0.4rem' }}>
                ({form.description.length}/300)
              </span>
            </label>
            <textarea
              className={`form-textarea${errors.description ? ' error' : ''}`}
              placeholder="Relevant coursework, achievements, notes…"
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              style={{ minHeight: '72px' }}
            />
            {errors.description && <span className="form-error">⚠ {errors.description}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Evidence URL</label>
            <input
              className={`form-input${errors.evidenceUrl ? ' error' : ''}`}
              placeholder="https://..."
              value={form.evidenceUrl}
              onChange={(e) => handleChange('evidenceUrl', e.target.value)}
            />
            {errors.evidenceUrl && <span className="form-error">⚠ {errors.evidenceUrl}</span>}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {editId ? 'Update Entry' : 'Add Entry'}
            </button>
            <button className="btn btn-ghost" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}