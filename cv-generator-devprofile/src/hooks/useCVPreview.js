import { useCV, CVContext } from '../context/CVContext';

// Helper function to determine if the CV is empty by checking all sections for content
function isCVEmpty(cv) {
  const { personal, skills, projects, education, extra } = cv;
  const expCount = extra?.items?.filter((i) => i.kind === 'experience').length || 0;
  const langCount = extra?.items?.filter((i) => i.kind === 'languages').length || 0;
  return (
    !personal.name &&
    skills.length === 0 &&
    projects.length === 0 &&
    education.length === 0 &&
    expCount === 0 &&
    langCount === 0
  );
}

export function useCVPreview() {
  const { cv } = useCV();
  const { personal, skills, projects, education, extra } = cv;

  const experienceItems =
    extra?.items?.filter((i) => i.kind === 'experience' || (i.kind === undefined && Boolean(i.title))) || [];
  const languageItems =
    extra?.items?.filter((i) => i.kind === 'languages' || (i.kind === undefined && Boolean(i.language))) || [];

  const hasExperience = experienceItems.length > 0;
  const hasLanguages = languageItems.length > 0;

  const isEmpty = isCVEmpty(cv);

  return {
    personal,
    skills,
    projects,
    education,
    extra,
    experienceItems,
    languageItems,
    hasExperience,
    hasLanguages,
    isEmpty,
  };
}