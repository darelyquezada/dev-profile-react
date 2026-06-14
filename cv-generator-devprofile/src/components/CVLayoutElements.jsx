import React from 'react';

export function SectionLabel({ children }) {
  return (
    <div className="cv-section-label-container">
      <span className="cv-section-label">{children}</span>
      <div className="cv-section-line" />
    </div>
  );
}

export function Section({ title, children, className = "" }) {
  return (
    <div className={`cv-section ${className}`}>
      <SectionLabel>{title}</SectionLabel>
      {children}
    </div>
  );
}

export function Card({ children }) {
  return <div className="cv-card">{children}</div>;
}

export function Bullet({ children }) {
  return (
    <div className="cv-bullet">
      <span className="cv-bullet-dot">●</span>
      <span className="cv-bullet-text">{children}</span>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="cv-empty-state">
      <span className="cv-empty-icon">◇</span>
      <p className="cv-empty-text">No data yet — fill in the Editor first</p>
    </div>
  );
}