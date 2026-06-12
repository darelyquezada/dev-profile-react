import { useMemo } from 'react';
import { useCV } from '../context/CVContext';
import { LEVEL_VALUES } from '../utils/constants';

export function useDashboardStats() {
  const { cv } = useCV();
  const { skills = [], projects = [], education = [], extra = { items: [] }, personal = {} } = cv;

  // Cache complex aggregations to block heavy array operations on unrelated state updates
  const { topSkill, categories, stats } = useMemo(() => {
    
    // Sort skills descending based on numerical weight mapping to catch the highest proficiency
    const sortedSkills = [...skills].sort(
      (a, b) => (LEVEL_VALUES[b.level] ?? 0) - (LEVEL_VALUES[a.level] ?? 0)
    );
    const top = sortedSkills[0] || null;

    // Use a Set to strip out duplicate category strings for unique grouping counters
    const uniqueCategories = [...new Set(skills.map((s) => s.category))];

    // Format the payload used directly to map the high-level dashboard metric cards
    const dashboardStats = [
      { 
        label: 'Skills', 
        value: skills.length, 
        sub: `${uniqueCategories.length} categories` 
      },
      { 
        label: 'Projects', 
        value: projects.length, 
        sub: `${projects.filter(p => p.deployUrl).length} deployed` 
      },
      { 
        label: 'Education', 
        value: education.length, 
        sub: 'certifications & degrees' 
      },
      { 
        label: 'Extra', 
        value: extra.items?.length || 0, 
        // Dynamic subtitle depends on the context structure chosen by the user
        sub: extra.type === 'experience' ? 'experience entries' : 'languages' 
      },
    ];

    return {
      topSkill: top,
      categories: uniqueCategories,
      stats: dashboardStats
    };
  }, [skills, projects, education, extra]);

  return {
    personal,
    skills,
    topSkill,
    categories,
    stats
  };
}