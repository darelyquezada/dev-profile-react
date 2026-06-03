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