
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

