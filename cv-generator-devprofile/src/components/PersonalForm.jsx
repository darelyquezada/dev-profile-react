import { usePersonalHook } from '../hooks/useFormValidation';

export default function PersonalForm() {
  // Consuming the form state controller abstraction layer.
  // This custom hook isolates input validation rules, dynamic array handling, and data context mutations.
  const {
    form,
    errors,
    saved,
    handleChange,
    handleLinkChange,
    addLink,
    removeLink,
    handleSubmit,
  } = usePersonalHook();

  return (
    <div>
      <div className="form-section-title">Personal Info</div>

      {/* Primary Identity Row */}
      <div className="form-row">
        {/* Full Name Input Bound with Required Condition Styling flags */}
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            className={`form-input${errors.name ? ' error' : ''}`}
            placeholder="e.g. Alex Rivera"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          {errors.name && <span className="form-error">⚠ {errors.name}</span>}
        </div>

        {/* Professional Title Input Designation */}
        <div className="form-group">
          <label className="form-label">Profession / Career</label>
          <input
            className="form-input"
            placeholder="e.g. Full-Stack Developer"
            value={form.profession}
            onChange={(e) => handleChange('profession', e.target.value)}
          />
        </div>
      </div>

      {/* Communications Channels Mapping Section */}
      <div className="form-row">
        {/* Email Identification Input Bound to Structural Format Constraints */}
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className={`form-input${errors.email ? ' error' : ''}`}
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          {errors.email && <span className="form-error">⚠ {errors.email}</span>}
        </div>

        {/* Contact Phone Parameter Target */}
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input
            className="form-input"
            placeholder="+52 449 000 0000"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>
      </div>

      {/* Location Parameters Context Selection Field */}
      <div className="form-group">
        <label className="form-label">City / Location</label>
        <input
          className="form-input"
          placeholder="e.g. Aguascalientes, MX"
          value={form.location}
          onChange={(e) => handleChange('location', e.target.value)}
        />
      </div>

      {/* Biography and Description Block */}
      {/* Monitors character limitation bounds dynamically using immediate string length properties */}
      <div className="form-group">
        <label className="form-label">
          Professional Bio
          <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
            ({form.bio ? form.bio.length : 0}/500)
          </span>
        </label>
        <textarea
          className={`form-textarea${errors.bio ? ' error' : ''}`}
          placeholder="Brief professional description..."
          value={form.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
          style={{ minHeight: '110px' }}
        />
        {errors.bio && <span className="form-error">⚠ {errors.bio}</span>}
      </div>
      
      {/* Professional Links Sub-Collection Manager */}
      {/* Uses sequential grid mapping to handle concurrent repository, profile, or social link fields */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div
          className="flex-between"
          style={{ marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}
        >
          <span className="label">Professional Links</span>
          <button className="btn btn-sm" onClick={addLink}>+ Add Link</button>
        </div>

        {/* Safe structural fallback message rendered conditionally when the links collection array remains empty */}
        {form.links.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            No links added yet.
          </p>
        )}

        {/* Iterating links using explicit index references to safely map input nodes to state elements */}
        {form.links.map((link, idx) => (
          <div
            key={idx}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr auto',
              gap: '0.75rem',
              alignItems: 'start',
              marginBottom: '0.75rem',
            }}
          >
            {/* Custom Label Descriptor Segment */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <input
                className="form-input"
                placeholder="Label (GitHub…)"
                value={link.label}
                onChange={(e) => handleLinkChange(idx, 'label', e.target.value)}
              />
            </div>
            {/* Endpoint Reference Path Target tracking validation error indices reactively */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <input
                className={`form-input${errors[`link_${idx}`] ? ' error' : ''}`}
                placeholder="https://github.com/you"
                value={link.url}
                onChange={(e) => handleLinkChange(idx, 'url', e.target.value)}
              />
              {errors[`link_${idx}`] && (
                <span className="form-error">⚠ {errors[`link_${idx}`]}</span>
              )}
            </div>
            {/* Direct array index deletion triggers mapped to clean target elements in real-time */}
            <button
              className="btn-icon btn-danger"
              style={{ marginTop: '0' }}
              onClick={() => removeLink(idx)}
              title="Remove link"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Form Submission Action Row */}
      {/* Evaluates boolean flags to feed immediate persistent context save confirmations back to the interface */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Save Personal Info
        </button>
        {saved && (
          <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
            ✓ SAVED
          </span>
        )}
      </div>
    </div>
  );
}