import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { NAV_LINKS } from '../utils/constants'; // Importing the standalone static configuration array from constants utility file 

export default function Navbar() {
  /*
    menuOpen (boolean): Controls the visibility of the full-screen mobile menu overlay.
    setMenuOpen (function): Toggles the state between true and false when clicking the hamburger/close icons.
  */
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Main Navigation Container 
        Uses fixed positioning to stay at the top of the viewport during scroll.
        CSS variables (like var(--bg), var(--border)) are utilized to support dynamic Theme Changes.
      */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 'var(--nav-height)',
          zIndex: 1000, // Ensures the Navbar stays on top of all other content layers
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 2rem',
          gap: '2rem',
        }}
      >
        {/* Logo Section 
          Uses NavLink to return to the root route ('/').
          flexShrink: 0 prevents the logo from compressing when space is restricted.
        */}
        <NavLink
          to="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            flexShrink: 0,
          }}
        >
          {/* Pencil Tool SVG Icon
            Uses 'stroke="var(--accent)"' to draw the outline directly with theme's accent color.
            Uses 'fill="none"' to maintain a minimalist outline-based design system uniform with the other utility icons.
          */}
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="var(--accent)" 
            strokeWidth="2" 
            strokeLinecap="round" 
      
            style={{ flexShrink: 0 }}
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>

          {/* Application Branding Text */}
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              letterSpacing: '0.12em',
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
            }}
          >
            DevProfile
          </span>
        </NavLink>

        {/* Structural Visual Separator (Vertical Line) */}
        <div style={{ width: '1px', height: '24px', background: 'var(--border)', flexShrink: 0 }} />

        {/* Desktop Navigation Menu
          flex: 1 allows this container to grow and occupy available horizontal space.
          The class "nav-desktop" is used by external media queries to hide this container on mobile viewports.
        */}
        <div
          className="nav-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            flex: 1,
          }}
        >
          {/* Dynamic rendering of main navigation links */}
          {NAV_LINKS.map(({ to, label, index }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'} // Ensures the 'Home' link matches strictly on exact root path matching
              
              /*
                Dynamic Styling callback provided by React Router's NavLink.
                Destructures 'isActive' to apply distinct styling states (active vs inactive) automatically.
              */
              style={({ isActive }) => ({
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                background: isActive ? 'var(--accent-subtle)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease', // Smooth transition effect for hover and active state toggles
              })}
            >
              {/* Monospaced design numeric counter prefix */}
              <span style={{ color: 'var(--text-muted)', fontSize: '0.58rem' }}>{index}</span>
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right Utilities Bar
          Pushed to the far right using marginLeft: 'auto'. 
          Houses global application utilities like dark/light mode toggling and the mobile menu trigger.
        */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' }}>
          {/* Independent component that handles application theme switching logic */}
          <ThemeToggle />

          {/* Mobile Menu Trigger Button
            Swaps internal SVG structures depending on the state of 'menuOpen' (hamburger icon vs close 'X' icon).
            Managed globally via media queries inside the stylesheet to keep layout conditional rules out of inline styles.
          */}
          <button
            className="btn-icon nav-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)} // Toggles menu overlay visibility state on click
            aria-label="Toggle menu" // Accessibility descriptor for screen readers
          >
            {menuOpen ? (
              /* Close Icon SVG (Rendered when mobile menu is active) */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              /* Three Line Icon SVG (Rendered when mobile menu is collapsed) */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <line x1="3" y1="6"  x2="21" y2="6"  />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Full-Screen Overlay
        Conditional rendering statement: Only mounts to the DOM if 'menuOpen' is true.
        Positioned fixed exactly below the layout's predefined header height (var(--nav-height)).
      */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--nav-height)',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--bg)',
            zIndex: 999, // Placed slightly under the root navigation container to keep layout aesthetics clean
            display: 'flex',
            flexDirection: 'column',
            padding: '3rem 2rem',
            gap: '0.5rem',
            borderTop: '1px solid var(--border)',
            animation: 'fadeIn 0.2s ease', // Triggers CSS keyframe animation for entrance transition
          }}
        >
          {/* Map through the same link array structure to enforce architectural reusability */}
          {NAV_LINKS.map(({ to, label, index }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)} // UX Consideration: Automatically closes the navigation drawer when a link is clicked
              style={({ isActive }) => ({
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem', // Oversized bold typography targeted for mobile user touch targets
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--border)',
              })}
            >
              {/* Mobile view subtext design layout index */}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {index}
              </span>
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}