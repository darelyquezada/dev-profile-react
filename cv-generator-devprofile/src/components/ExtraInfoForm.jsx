import { useState } from 'react';
import { useCV } from '../context/CVContext'; 
import { EMPTY_EXP, EMPTY_LANG, LANG_LEVELS } from '../utils/constants';
import { validateExtraInfoForm } from '../utils/validations'; 
import { splitTags } from '../utils/formatters';

/* ── Single row display for Experience ── */
function ExperienceItem({ item, onEdit, onDelete }) {
  // Se reemplaza la división y filtrado manual por el uso directo de splitTags
  const tools = splitTags(item.tools);
  
  return (
    <div className="card card-accent" style={{ marginBottom: '0.85rem' }}>
      <div className="flex-between" style={{ marginBottom: '0.4rem' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', textTransform: 'uppercase' }}>
            {item.title || '—'}
          </span>
          <span style={{ marginLeft: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
            {item.company}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
          <span className="label">{item.period}</span>
          <button className="btn-icon" onClick={() => onEdit(item)} title="Edit">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button className="btn-icon" onClick={() => onDelete(item.id)} title="Delete"
            style={{ borderColor: 'transparent', color: 'var(--text-muted)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color='var(--accent-red)'; e.currentTarget.style.borderColor='var(--accent-red)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.borderColor='transparent'; }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
              <path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>
          </button>
        </div>
      </div>
      {item.description && <p style={{ fontSize: '0.79rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{item.description}</p>}
      {tools.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {tools.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
      )}
    </div>
  );
}

/* ── Single row display for Language ── */
function LanguageItem({ item, onEdit, onDelete }) {
  return (
    <div className="card card-accent" style={{ marginBottom: '0.85rem' }}>
      <div className="flex-between">
        <div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', textTransform: 'uppercase' }}>
            {item.language || '—'}
          </span>
          <span style={{ marginLeft: '0.75rem' }} className="tag tag-accent">{item.level}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <button className="btn-icon" onClick={() => onEdit(item)} title="Edit">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button className="btn-icon" onClick={() => onDelete(item.id)} title="Delete"
            style={{ borderColor: 'transparent', color: 'var(--text-muted)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color='var(--accent-red)'; e.currentTarget.style.borderColor='var(--accent-red)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.borderColor='transparent'; }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
              <path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>
          </button>
        </div>
      </div>
      {item.notes && <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>{item.notes}</p>}
    </div>
  );
}

export default function ExtraInfoForm() {
  const { cv, setExtraType, addExtra, updateExtra, deleteExtra } = useCV();
  const type = cv.extra.type;

  const [form, setForm]         = useState(type === 'experience' ? EMPTY_EXP : EMPTY_LANG);
  const [errors, setErrors]   = useState({});
  const [editId, setEditId]   = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleTypeSwitch = (selectedType) => {
    setExtraType(selectedType);
    setForm(selectedType === 'experience' ? EMPTY_EXP : EMPTY_LANG);
    setErrors({});
    setEditId(null);
    setShowForm(false);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = () => {
    const validationErrors = validateExtraInfoForm(form, type);
    
    if (Object.keys(validationErrors).length) { 
      setErrors(validationErrors); 
      return; 
    }
    
    if (editId) updateExtra(editId, form);
    else addExtra(form);
    
    setForm(type === 'experience' ? EMPTY_EXP : EMPTY_LANG);
    setErrors({});
    setEditId(null);
    setShowForm(false);
  };

  const startEdit = (item) => {
    setForm(item);
    setEditId(item.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setForm(type === 'experience' ? EMPTY_EXP : EMPTY_LANG);
    setErrors({});
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="form-section-title">Experience & Languages</div>

      {/* Type switcher */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {['experience', 'languages'].map((t) => (
          <button
            key={t}
            onClick={() => handleTypeSwitch(t)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '0.45rem 1rem',
              border: `1px solid ${type === t ? 'var(--accent)' : 'var(--border-accent)'}`,
              background: type === t ? 'var(--accent-subtle)' : 'transparent',
              color: type === t ? 'var(--accent)' : 'var(--text-secondary)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {t === 'experience' ? 'Experience' : 'Languages'}
          </button>
        ))}
      </div>

      {/* Items list */}
      {cv.extra.items.length === 0 && !showForm && (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}>
          No entries yet.
        </p>
      )}

      {type === 'experience'
        ? cv.extra.items.map((item) => (
            <ExperienceItem key={item.id} item={item} onEdit={startEdit} onDelete={deleteExtra} />
          ))
        : cv.extra.items.map((item) => (
            <LanguageItem key={item.id} item={item} onEdit={startEdit} onDelete={deleteExtra} />
          ))}

      {/* Add button */}
      {!showForm && (
        <button className="btn" onClick={() => setShowForm(true)} style={{ marginTop: '0.5rem' }}>
          + Add {type === 'experience' ? 'Experience' : 'Language'}
        </button>
      )}

      {/* Inline form */}
      {showForm && (
        <div className="card" style={{ borderLeft: '3px solid var(--accent)', marginTop: '1rem' }}>
          <div style={{ marginBottom: '1rem', fontFamily: 'var(--font-display)', fontSize: '1.1rem', textTransform: 'uppercase' }}>
            {editId ? 'Edit Entry' : `New ${type === 'experience' ? 'Experience' : 'Language'}`}
          </div>

          {type === 'experience' ? (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Title / Role *</label>
                  <input className={`form-input${errors.title ? ' error' : ''}`} placeholder="e.g. Frontend Intern"
                    value={form.title} onChange={(e) => handleChange('title', e.target.value)} />
                  {errors.title && <span className="form-error">⚠ {errors.title}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Company / Institution *</label>
                  <input className={`form-input${errors.company ? ' error' : ''}`} placeholder="e.g. Acme Corp"
                    value={form.company} onChange={(e) => handleChange('company', e.target.value)} />
                  {errors.company && <span className="form-error">⚠ {errors.company}</span>}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Period</label>
                <input className="form-input" placeholder="Jan 2024 – May 2024"
                  value={form.period} onChange={(e) => handleChange('period', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Activities / Description</label>
                <textarea className="form-textarea" placeholder="Describe responsibilities, achievements…"
                  value={form.description} onChange={(e) => handleChange('description', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Tools / Technologies</label>
                <input className="form-input" placeholder="React, Figma, Git…"
                  value={form.tools} onChange={(e) => handleChange('tools', e.target.value)} />
              </div>
            </>
          ) : (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Language *</label>
                  <input className={`form-input${errors.language ? ' error' : ''}`} placeholder="e.g. English"
                    value={form.language} onChange={(e) => handleChange('language', e.target.value)} />
                  {errors.language && <span className="form-error">⚠ {errors.language}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Level</label>
                  <select className="form-select" value={form.level} onChange={(e) => handleChange('level', e.target.value)}>
                    {LANG_LEVELS.map((l) => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Notes / Certification</label>
                <input className="form-input" placeholder="TOEFL score, certification, etc."
                  value={form.notes} onChange={(e) => handleChange('notes', e.target.value)} />
              </div>
            </>
          )}

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {editId ? 'Update' : 'Add'}
            </button>
            <button className="btn btn-ghost" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}