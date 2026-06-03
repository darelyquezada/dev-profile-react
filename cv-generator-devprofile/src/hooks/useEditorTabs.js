import { useState } from 'react';

/*
 Custom hook managing the user interface workflow transitions for the CV Editor.
 Centralizes active tab settings and modal/form insertion toggle states.
*/
export function useEditorTabs() {
  const [activeTab, setActiveTab] = useState('personal');
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);

  return {
    activeTab,
    setActiveTab,
    showSkillForm,
    setShowSkillForm,
    showProjectForm,
    setShowProjectForm,
  };
}