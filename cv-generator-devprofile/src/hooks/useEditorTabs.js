import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

/*
 Custom hook managing the user interface workflow transitions for the CV Editor.
 Centralizes active tab settings and modal/form insertion toggle states.
*/
export function useEditorTabs() {
  // Sets the 'personal' module as the core initialization landmark for the workspace router
  const [activeTab, setActiveTabInternal] = useLocalStorage('editor-active-tab', 'personal');
  
  // Toggles the insertion/modification form interface for professional skills records
  const [showSkillForm, setShowSkillForm] = useState(false);
  
  // Toggles the transactional operational layout wrapper for project description models
  const [showProjectForm, setShowProjectForm] = useState(false);

  /*
   Intercepts tab switching operations to enforce data view sanitization routines.
   Resets active subform states when transitioning between main collection nodes.
  */
  const setActiveTab = useCallback((tabId) => {
    setActiveTabInternal(tabId);
    
    // Automatically dismisses secondary nested subform visibility vectors 
    // to prevent background rendering overhead or accidental context cross-pollution
    setShowSkillForm(false);
    setShowProjectForm(false);
  }, []);

  return {
    activeTab,
    setActiveTab,
    showSkillForm,
    setShowSkillForm,
    showProjectForm,
    setShowProjectForm,
  };
}