// Global regular expression to enforce uniform URL schemas across forms
export const URL_REGEX = /^https?:\/\/.+/;
export const IMAGE_SOURCE_REGEX = /^(https?:\/\/.+|data:image\/[a-zA-Z]+;base64,[A-Za-z0-9+/=]+)$/;

/*
 Validates the personal data section including nested social/professional links.
 Checks for mandatory identity fields, standardized email notation, and character ceilings.
*/
export const validatePersonalForm = (form) => {
  const e = {};
  
  if (!form.name?.trim()) e.name = 'Name is required';
  
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    e.email = 'Enter a valid email address';
  }
  
  if (form.bio && form.bio.length > 500) {
    e.bio = 'Bio must be under 500 characters';
  }
  
  // Scans through dynamic custom links to ensure correct protocol formatting
  if (Array.isArray(form.links)) {
    form.links.forEach((l, i) => {
      if (l.url && !URL_REGEX.test(l.url)) {
        e[`link_${i}`] = 'URL must start with http:// or https://';
      }
    });
  }
  
  return e;
};

/*
 Validates individual skill assets to prevent duplicates in the dashboard.
 Ensures descriptions remain within constraints for appropriate metric positioning.
*/
export const validateSkillForm = (form, editTarget, existingSkills) => {
  const e = {};
  
  if (!form.name?.trim()) {
    e.name = 'Skill name is required';
  } else if (form.name.length > 60) {
    e.name = 'Name must be under 60 characters';
  }
  
  // Enforces unique naming constraints only when creating new records
  if (!editTarget && Array.isArray(existingSkills)) {
    const dup = existingSkills.some(
      (s) => s.name?.trim().toLowerCase() === form.name?.trim().toLowerCase()
    );
    if (dup) e.name = 'This skill already exists';
  }
  
  if (!form.description?.trim()) {
    e.description = 'Add a brief description';
  } else if (form.description.length > 200) {
    e.description = 'Description must be under 200 characters';
  }
  
  return e;
};

/*
 Validates software project entries ensuring valid repository links.
 Guarantees that descriptions fit properly within the preview layout bounds.
*/
export const validateProjectForm = (form, editTarget, existingProjects) => {
  const e = {};
  
  if (!form.name?.trim()) {
    e.name = 'Project name is required';
  } else if (form.name.length > 80) {
    e.name = 'Name must be under 80 characters';
  }
  
  // Duplicate verification safety layer for new project uploads
  if (!editTarget && Array.isArray(existingProjects)) {
    const dup = existingProjects.some(
      (p) => p.name?.trim().toLowerCase() === form.name?.trim().toLowerCase()
    );
    if (dup) e.name = 'A project with this name already exists';
  }
  
  if (!form.description?.trim()) {
    e.description = 'Description is required';
  } else if (form.description.length > 400) {
    e.description = 'Max 400 characters';
  }
  
  // External deployment, version control and showcase image link validation
  if (form.repoUrl && !URL_REGEX.test(form.repoUrl)) {
    e.repoUrl = 'Must be a valid URL (https://...)';
  }
  if (form.deployUrl && !URL_REGEX.test(form.deployUrl)) {
    e.deployUrl = 'Must be a valid URL (https://...)';
  }
  if (form.image && !IMAGE_SOURCE_REGEX.test(form.image)) {
    e.image = 'Must be a valid URL (https://...) or an uploaded image';
  }
  
  return e;
};

/*
 Validates formal education records and certification instances.
 Verifies proof of credentials URLs and limits length for optimal document compilation.
*/
export const validateEducationForm = (form) => {
  const errors = {};
  
  if (!form.institution?.trim()) {
    errors.institution = 'Institution is required';
  }
  
  if (!form.program?.trim()) {
    errors.program = 'Program / course name is required';
  }
  
  if (form.evidenceUrl && !URL_REGEX.test(form.evidenceUrl)) {
    errors.evidenceUrl = 'Must start with http:// or https://';
  }
  
  if (form.description && form.description.length > 300) {
    errors.description = 'Max 300 characters';
  }
  
  return errors;
};

/*
 Handles validation for polymorphic blocks (Work Experience vs Language proficiency).
 Uses a type discriminator string to toggle specific field requirement validation rules.
*/
export const validateExtraInfoForm = (form, type) => {
  const e = {};
  
  if (type === 'experience') {
    if (!form.title?.trim()) {
      e.title = 'Title/role is required';
    }
    if (!form.company?.trim()) {
      e.company = 'Company/institution is required';
    }
  } else {
    if (!form.language?.trim()) {
      e.language = 'Language name is required';
    }
  }
  
  return e;
};