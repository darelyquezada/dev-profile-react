import { useState, useEffect } from 'react';
import { useCV } from '../context/CVContext';
import { useLocalStorage } from './useLocalStorage';
import { LOCAL_STORAGE_KEYS, LEVEL_VALUES } from '../utils/constants';
import { 
  validatePersonalForm, 
  validateSkillForm, 
  validateProjectForm, 
  validateEducationForm, 
  validateExtraInfoForm
} from '../utils/validations';

/* Empty link structure for contact and professional social networks */
const EMPTY_LINK = { label: '', url: '' };

/* Manages form state, validation, and local storage for personal information */
export function usePersonalHook() {
  const { cv, updatePersonal } = useCV();
  
  // Saves the personal form data draft in local storage using the central key
  const [storedData, setStoredData] = useLocalStorage(LOCAL_STORAGE_KEYS.PERSONAL_DRAFT, cv.personal);
  const [form, setForm] = useState(storedData);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  // Automatically syncs form state changes to local storage
  useEffect(() => {
    setStoredData(form);
  }, [form, setStoredData]);

  /* Changes a form field value and clears its validation error */
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSaved(false);
  };

  /* Updates a specific item inside the links array by its index */
  const handleLinkChange = (idx, field, value) => {
    const updated = form.links.map((l, i) => (i === idx ? { ...l, [field]: value } : l));
    setForm((prev) => ({ ...prev, links: updated }));
    setSaved(false);
  };

  /* Adds a new empty link object to the form state */
  const addLink = () => setForm((prev) => ({ ...prev, links: [...prev.links, { ...EMPTY_LINK }] }));
  
  /* Removes a link object from the form state by its index */
  const removeLink = (idx) => setForm((prev) => ({ ...prev, links: prev.links.filter((_, i) => i !== idx) }));

  /* Validates the form data and saves it to the global CV context if there are no errors */
  const handleSubmit = () => {
    const e = validatePersonalForm(form);
    if (Object.keys(e).length) { setErrors(e); return; }
    updatePersonal(form);
    setSaved(true);
  };

  return { form, errors, saved, handleChange, handleLinkChange, addLink, removeLink, handleSubmit };
}

/* Manages form state, validation, and submission for projects */
export function useProjectHook(editTarget, EMPTY, onDone) {
  const { addProject, updateProject, cv } = useCV();
  
  // Saves the project form data draft in local storage to prevent data loss
  const [storedData, setStoredData] = useLocalStorage(LOCAL_STORAGE_KEYS.PROJECTS_DRAFT, editTarget || EMPTY);
  const [form, setForm] = useState(storedData);
  const [errors, setErrors] = useState({});

  // Syncs project form state changes to local storage
  useEffect(() => {
    setStoredData(form);
  }, [form, setStoredData]);

  /* Changes a project field value and clears its validation error */
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  /* Validates the project data and updates an existing project or adds a new one */
  const handleSubmit = () => {
    const e = validateProjectForm(form, editTarget, cv.projects);
    if (Object.keys(e).length) { setErrors(e); return; }
    
    if (editTarget) updateProject(editTarget.id, form);
    else addProject(form);
    
    const resetValue = EMPTY;
    setForm(resetValue);
    setStoredData(resetValue);
    setErrors({});
    if (onDone) onDone();
  };

  return { form, errors, handleChange, handleSubmit };
}