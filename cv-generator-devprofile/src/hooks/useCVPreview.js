import { useCV } from '../context/CVContext';

// Helper function to determine if the CV is empty by checking all sections for content
function isCVEmpty(cv) {
  const { personal, skills, projects, education, extra } = cv;
  return (
    !personal.name &&
    skills.length === 0 &&
    projects.length === 0 &&
    education.length === 0 &&
    (!extra || !extra.items || extra.items.length === 0)
  );
}

export function useCVPreview() {
  const { cv } = useCV();
  const { personal, skills, projects, education, extra } = cv;

  // Flags to determine if the extra section has experience or languages
  const hasExperience = extra?.type === 'experience' && extra?.items?.length > 0;
  const hasLanguages  = extra?.type === 'languages'  && extra?.items?.length > 0;
  
  // Evaluates if the CV is empty based on all sections being unfilled or having no items
  const isEmpty = isCVEmpty(cv);

  return {
    personal,
    skills,
    projects,
    education,
    extra,
    hasExperience,
    hasLanguages,
    isEmpty
  };
}