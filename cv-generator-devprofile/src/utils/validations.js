export const URL_REGEX = /^https?:\/\/.+/;

export const validatePersonalForm = (form) => {
  const e = {};
  if (!form.name.trim()) e.name = 'Name is required';
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    e.email = 'Enter a valid email address';
  if (form.bio && form.bio.length > 500)
    e.bio = 'Bio must be under 500 characters';
  
  form.links.forEach((l, i) => {
    if (l.url && !URL_REGEX.test(l.url))
      e[`link_${i}`] = 'URL must start with http:// or https://';
  });
  return e;
};

export const validateSkillForm = (form, editTarget, existingSkills) => {
  const e = {};
  if (!form.name.trim()) e.name = 'Skill name is required';
  if (form.name.length > 60) e.name = 'Name must be under 60 characters';
  
  if (!editTarget) {
    const dup = existingSkills.some((s) => s.name.trim().toLowerCase() === form.name.trim().toLowerCase());
    if (dup) e.name = 'This skill already exists';
  }
  
  if (!form.description.trim()) e.description = 'Add a brief description';
  if (form.description.length > 200) e.description = 'Description must be under 200 characters';
  return e;
};

export const validateProjectForm = (form, editTarget, existingProjects) => {
  const e = {};
  if (!form.name.trim()) e.name = 'Project name is required';
  if (form.name.length > 80) e.name = 'Name must be under 80 characters';
  
  if (!editTarget) {
    const dup = existingProjects.some((p) => p.name.trim().toLowerCase() === form.name.trim().toLowerCase());
    if (dup) e.name = 'A project with this name already exists';
  }
  
  if (!form.description.trim()) e.description = 'Description is required';
  if (form.description.length > 400) e.description = 'Max 400 characters';
  if (form.repoUrl && !URL_REGEX.test(form.repoUrl)) e.repoUrl = 'Must be a valid URL (https://...)';
  if (form.deployUrl && !URL_REGEX.test(form.deployUrl)) e.deployUrl = 'Must be a valid URL (https://...)';
  if (form.image && !URL_REGEX.test(form.image)) e.image = 'Must be a valid URL (https://...)';
  return e;
};
