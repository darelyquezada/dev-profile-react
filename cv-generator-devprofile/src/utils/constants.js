/* Navbar Constants */

/*
  Static configuration array for navigation items.
  Keeping this data outside the component avoids unnecessary re-creations
  on every render and keeps the JSX code clean and scalable.
*/

export const NAV_LINKS = [
  { to: '/', label: 'Home', index: '00' },
  { to: '/editor', label: 'Editor', index: '01' },
  { to: '/preview', label: 'Preview', index: '02' },
  { to: '/dashboard', label: 'Dashboard', index: '03' },
  { to: '/about', label: 'About', index: '04' },
];

/* Home Page Constants */

/*
 Static configuration array for the features grid shown on the landing page.
 Keeps structural content separate from the presentation logic.
*/

export const HOME_FEATURES = [
  { index: '01', label: 'Dynamic Editor', desc: 'Capture and update every section of your CV in real time.' },
  { index: '02', label: 'Skills Chart', desc: 'Visualise your proficiency with live-updating graphs.' },
  { index: '03', label: 'Web Preview', desc: 'Inspect the final layout before exporting to PDF.' },
  { index: '04', label: 'PDF Export', desc: 'Generate a clean, professional PDF with a single click.' },
  { index: '05', label: 'Dark / Light', desc: 'Switch themes without losing a single character.' },
  { index: '06', label: 'Persistent Data', desc: 'Your work is saved locally and survives page reloads.' },
];

/* Static routing configurations for the quick access footer links */
export const QUICK_ACCESS_LINKS = [
  { to: '/editor', label: 'Editor' },
  { to: '/preview', label: 'Preview' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'About' },
];