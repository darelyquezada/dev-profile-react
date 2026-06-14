import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

/* DEFAULT EMPTY STATE */
const defaultCV = {
  personal: {
    name: '',
    profession: '',
    location: '',
    email: '',
    phone: '',
    bio: '',
    links: [],
    avatar: '',
  },
  skills: [],
  projects: [],
  education: [],
  extra: {
    type: 'experience', // 'experience' | 'languages'
    items: [],
  },
};

/* CONTEXT */
export const CVContext = createContext(null);

export function CVProvider({ children }) {
  const [cv, setCV] = useLocalStorage('cv', defaultCV);
  const [theme, setTheme] = useState('dark');

  /* Theme */
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  /* Personal */
  const updatePersonal = (data) =>
    setCV((prev) => ({ ...prev, personal: { ...prev.personal, ...data } }));

  /* Skills */
  const addSkill    = (skill)  => setCV((prev) => ({ ...prev, skills: [...prev.skills, { ...skill, id: Date.now() }] }));
  const updateSkill = (id, data) =>
    setCV((prev) => ({ ...prev, skills: prev.skills.map((s) => (s.id === id ? { ...s, ...data } : s)) }));
  const deleteSkill = (id) =>
    setCV((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));

  /* Projects */
  const addProject    = (proj)    => setCV((prev) => ({ ...prev, projects: [...prev.projects, { ...proj, id: Date.now() }] }));
  const updateProject = (id, data) =>
    setCV((prev) => ({ ...prev, projects: prev.projects.map((p) => (p.id === id ? { ...p, ...data } : p)) }));
  const deleteProject = (id) =>
    setCV((prev) => ({ ...prev, projects: prev.projects.filter((p) => p.id !== id) }));

  /* Education */
  const addEducation    = (edu)     => setCV((prev) => ({ ...prev, education: [...prev.education, { ...edu, id: Date.now() }] }));
  const updateEducation = (id, data) =>
    setCV((prev) => ({ ...prev, education: prev.education.map((e) => (e.id === id ? { ...e, ...data } : e)) }));
  const deleteEducation = (id) =>
    setCV((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));

  /* Extra (Experience / Languages) */
  const setExtraType = (type)  => setCV((prev) => ({ ...prev, extra: { ...prev.extra, type } }));
  const addExtra     = (item)  => setCV((prev) => ({ ...prev, extra: { ...prev.extra, items: [...prev.extra.items, { ...item, id: Date.now() }] } }));
  const updateExtra  = (id, data) =>
    setCV((prev) => ({
      ...prev,
      extra: { ...prev.extra, items: prev.extra.items.map((i) => (i.id === id ? { ...i, ...data } : i)) },
    }));
  const deleteExtra  = (id) =>
    setCV((prev) => ({
      ...prev,
      extra: { ...prev.extra, items: prev.extra.items.filter((i) => i.id !== id) },
    }));

  return (
    <CVContext.Provider
      value={{
        cv,
        theme,
        toggleTheme,
        updatePersonal,
        addSkill, updateSkill, deleteSkill,
        addProject, updateProject, deleteProject,
        addEducation, updateEducation, deleteEducation,
        setExtraType, addExtra, updateExtra, deleteExtra,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const ctx = useContext(CVContext);
  if (!ctx) throw new Error('useCV must be used within CVProvider');
  return ctx;
}