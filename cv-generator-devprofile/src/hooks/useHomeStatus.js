import { useCV, CVContext } from '../context/CVContext';

/*
 Custom hook to abstract and compute CV state metrics for the Home dashboard view.
 Encapsulates data validation and formatting logic.
*/
export function useHomeStatus() {
  const { cv } = useCV();

  // Computes whether the user has started filling out the profile
  const hasData = Boolean(cv.personal?.name || (cv.skills && cv.skills.length > 0));

  // Human-readable status label for the bottom bar
  const statusLabel = hasData 
    ? `● ${cv.personal?.name || 'Profile in progress'}` 
    : '○ No data yet';

  // Destructure array lengths safely with default fallbacks
  const metrics = {
    skillsCount: cv.skills?.length || 0,
    projectsCount: cv.projects?.length || 0,
    educationCount: cv.education?.length || 0,
  };

  return {
    statusLabel,
    metrics,
    hasData
  };
}