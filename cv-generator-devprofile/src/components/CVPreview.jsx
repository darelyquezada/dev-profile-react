import React from 'react';
import { useCVPreview } from '../hooks/useCVPreview'; 
import { LEVEL_VALUES } from '../utils/constants';
import { splitTags } from '../utils/formatters';
import { Section, SectionLabel, Card, Bullet, EmptyState } from './CVLayoutElements';
import '../styles/CVPreview.css'; 

export default function CVPreview() {
  const {
    personal,
    skills,
    projects,
    education,
    extra,
    hasExperience,
    hasLanguages,
    isEmpty
  } = useCVPreview();

  if (isEmpty) return <EmptyState />;

  return (
    <div id="cv-preview-root">

      {/* HEADER: Profile picture, name, and bio */}
      <div className={`cv-header ${personal.avatar ? 'has-avatar' : ''}`}>
        {personal.avatar && (
          <div className="cv-avatar-container">
            <img
              src={personal.avatar}
              alt={personal.name || 'avatar'}
              onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
              className="cv-avatar"
            />
          </div>
        )}

        <div>
          {personal.name && <h1 className="cv-name">{personal.name}</h1>}
          {personal.name && <div className="cv-name-divider" />}

          {personal.profession && (
            <div className="cv-profession-badge">{personal.profession}</div>
          )}

          {personal.bio && <p className="cv-bio">{personal.bio}</p>}

          {personal.links && personal.links.length > 0 && (
            <div className="cv-personal-links">
              {personal.links.map((l, i) => l.url && (
                <a key={i} href={l.url} target="_blank" rel="noreferrer" className="cv-link-item">
                  {l.label || l.url}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CONTACT BAR */}
      {(personal.phone || personal.email || personal.location) && (
        <div className="cv-contact-section">
          <div className="cv-contact-title-wrapper">
            <SectionLabel>Contact</SectionLabel>
          </div>
          <Card>
            <div className="cv-contact-links-grid">
              {personal.phone && (
                <span className="cv-contact-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.22 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  {personal.phone}
                </span>
              )}
              {personal.email && (
                <span className="cv-contact-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {personal.email}
                </span>
              )}
              {personal.location && (
                <span className="cv-contact-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                  {personal.location}
                </span>
              )}
            </div>
          </Card>
          <div className="cv-contact-spacer" />
        </div>
      )}

      {/* BODY CONTENT */}
      <div className="cv-body-content">

        {/* EXPERIENCE */}
        {hasExperience && (
          <Section title="Experience">
            <Card>
              {extra.items.map((item) => {
                const tools = splitTags(item.tools); // Uso de la función utilitaria
                return (
                  <div key={item.id} className="cv-experience-item">
                    <p className="cv-exp-title">{item.title}</p>
                    <p className="cv-exp-meta">
                      {[item.company, item.period].filter(Boolean).join('  ·  ')}
                    </p>
                    {item.description && (
                      <p className={`cv-exp-description ${tools.length ? 'has-tools' : ''}`}>
                        {item.description}
                      </p>
                    )}
                    {tools.length > 0 && (
                      <div className="cv-tag-container">
                        {tools.map((t) => (
                          <span key={t} className="cv-tool-tag">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </Card>
          </Section>
        )}

        {/* EDUCATION AND LANGUAGES */}
        {(education.length > 0 || hasLanguages) && (
          <div className={`cv-two-col-grid ${education.length > 0 && hasLanguages ? 'has-both' : ''}`}>
            {education.length > 0 && (
              <div>
                <SectionLabel>Education</SectionLabel>
                <Card>
                  {education.map((e) => (
                    <div key={e.id} className="cv-education-item">
                      <p className="cv-edu-title">
                        {e.program}{e.period ? ` (${e.period})` : ''}
                      </p>
                      <Bullet>{e.institution}</Bullet>
                      {e.description && (
                        <p className="cv-edu-description">{e.description}</p>
                      )}
                      {e.evidenceUrl && (
                        <a href={e.evidenceUrl} target="_blank" rel="noreferrer" className="cv-edu-link">
                          → Certificate
                        </a>
                      )}
                    </div>
                  ))}
                </Card>
              </div>
            )}

            {hasLanguages && (
              <div>
                <SectionLabel>Languages</SectionLabel>
                <Card>
                  {extra.items.map((item) => (
                    <Bullet key={item.id}>
                      <strong>{item.language}</strong>
                      {item.level ? ` - ${item.level}` : ''}
                      {item.notes ? `: ${item.notes}` : ''}
                    </Bullet>
                  ))}
                </Card>
              </div>
            )}
          </div>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <Section title="Skills">
            <Card>
              <div className="cv-skills-grid">
                {skills.map((s) => {
                  const pct = LEVEL_VALUES[s.level] ?? 50;
                  return (
                    <div key={s.id}>
                      <div className="cv-skill-header">
                        <span className="cv-skill-name">{s.name}</span>
                        <span className="cv-skill-level">{s.level}</span>
                      </div>
                      <div className="cv-progress-track">
                        <div className="cv-progress-bar" style={{ width: `${pct}%` }} />
                      </div>
                      {s.description && (
                        <p className="cv-skill-description">{s.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </Section>
        )}

        {/* PROJECTS */}
        {projects.length > 0 && (
          <Section title="Projects">
            <div className="cv-projects-grid">
              {projects.map((p) => {
                const techs = splitTags(p.technologies); // Uso de la función utilitaria
                return (
                  <div key={p.id} className="cv-project-card">
                    {p.image && (
                      <div className="cv-project-image-wrapper">
                        <img
                          src={p.image}
                          alt={p.name}
                          onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
                          className="cv-project-image"
                        />
                      </div>
                    )}

                    <div className="cv-project-body">
                      <p className="cv-project-name">{p.name}</p>

                      {(p.repoUrl || p.deployUrl) && (
                        <div className="cv-project-links">
                          {p.repoUrl && (
                            <a href={p.repoUrl} target="_blank" rel="noreferrer" className="cv-project-btn repo">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.01 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                              </svg>
                              Repository
                            </a>
                          )}
                          {p.deployUrl && (
                            <a href={p.deployUrl} target="_blank" rel="noreferrer" className="cv-project-btn deploy">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                              </svg>
                              Live Demo
                            </a>
                          )}
                        </div>
                      )}

                      <p className={`cv-project-description ${techs.length ? 'has-techs' : ''}`}>
                        {p.description}
                      </p>

                      {techs.length > 0 && (
                        <div className="cv-tag-container">
                          {techs.map((t) => (
                            <span key={t} className="cv-tech-tag">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>
        )}

      </div>

      {/* FOOTER */}
      <div className="cv-footer">
        <span className="cv-footer-text">DevProfile — Generated CV</span>
        <span className="cv-footer-text">{new Date().getFullYear()}</span>
      </div>

    </div>
  );
}