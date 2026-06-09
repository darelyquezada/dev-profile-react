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

/* Editor Page Constants */

/*
 Static configuration for the editor view tab navigation links.
 Defines unique identifiers, display names, and design system counter indices.
*/

export const EDITOR_TABS = [
  { id: 'personal', label: 'Personal', index: '01' },
  { id: 'skills', label: 'Skills', index: '02' },
  { id: 'projects', label: 'Projects', index: '03' },
  { id: 'education', label: 'Education', index: '04' },
  { id: 'extra', label: 'Experience', index: '05' },
];

/* useFormValidation Constants */

/*
 Storage configuration constants for the draft persistence layer.
 Centralizes the Unique LocalStorage Namespace Keys.
*/

export const LOCAL_STORAGE_KEYS = {
  PERSONAL_DRAFT: 'devprofile_personal_draft',
  SKILLS_DRAFT: 'devprofile_skills_draft',
  PROJECTS_DRAFT: 'devprofile_projects_draft',
  EDUCATION_DRAFT: 'devprofile_education_draft',
  EXTRA_DRAFT: 'devprofile_extra_draft',
};

/* UI Mapping weights for skill proficiency classification calculations */
export const LEVEL_VALUES = { 
  Basic: 25, 
  Intermediate: 50, 
  Advanced: 75, 
  Expert: 100 
};

/* Project Form Constants */

export const EMPTY_PROJECT = {
  name: '',
  description: '',
  technologies: '',
  repoUrl: '',
  deployUrl: '',
  image: '',
};

/* Skill Form Constants */

/* Static array collection to populate the skill category dropdown menu */
export const CATEGORIES = [
  'Programming', 
  'Databases', 
  'Web Design', 
  'Languages', 
  'Dev Tools', 
  'Soft Skills', 
  'Other'
];

/* Proficiency level classifications for the custom button group selection */
export const LEVELS = ['Basic', 'Intermediate', 'Advanced', 'Expert'];

/* Initial empty structure used to reset skill form fields to baseline defaults */
export const EMPTY_SKILL = { 
  name: '', 
  category: 'Programming', 
  level: 'Intermediate', 
  description: '' 
};