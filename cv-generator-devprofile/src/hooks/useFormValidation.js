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

/* Manages form state, validation, and submission for technical skills */
export function useSkillHook(editTarget, EMPTY, onDone) {
  const { addSkill, updateSkill, cv } = useCV();
  
  // Saves the skill form data draft in local storage
  const [storedData, setStoredData] = useLocalStorage(LOCAL_STORAGE_KEYS.SKILLS_DRAFT, editTarget || EMPTY);
  const [form, setForm] = useState(storedData);
  const [errors, setErrors] = useState({});

  // Syncs skill form state changes to local storage
  useEffect(() => {
    setStoredData(form);
  }, [form, setStoredData]);

  /* Changes a skill field value and clears its validation error */
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  /* Validates the skill data, assigns a numerical value to the level, and updates or adds the skill */
  const handleSubmit = () => {
    const e = validateSkillForm(form, editTarget, cv.skills);
    if (Object.keys(e).length) { setErrors(e); return; }
    
    if (editTarget) {
      updateSkill(editTarget.id, form);
    } else {
      // Maps the selected skill level string to its numeric value using the constant mapping
      addSkill({ ...form, levelValue: LEVEL_VALUES[form.level] });
    }
    
    const resetValue = EMPTY;
    setForm(resetValue);
    setStoredData(resetValue);
    setErrors({});
    if (onDone) onDone();
  };

  return { form, errors, handleChange, handleSubmit, levelValues: LEVEL_VALUES };
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

/* Manages form state, list interactions, and editing for education items */
export function useEducationHook(EMPTY) {
  const { cv, addEducation, updateEducation, deleteEducation } = useCV();
  
  // Saves the education form data draft in local storage
  const [storedData, setStoredData] = useLocalStorage(LOCAL_STORAGE_KEYS.EDUCATION_DRAFT, EMPTY);
  const [form, setForm] = useState(storedData);
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Syncs education form state changes to local storage
  useEffect(() => {
    setStoredData(form);
  }, [form, setStoredData]);

  /* Changes an education field value and clears its validation error */
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  /* Validates education data and submits it to update an existing item or add a new one */
  const handleSubmit = () => {
    const e = validateEducationForm(form);
    if (Object.keys(e).length) { setErrors(e); return; }
    if (editId) updateEducation(editId, form);
    else addEducation(form);
    handleCancel();
  };

  /* Loads an existing education item into the form state and opens the form for editing */
  const startEdit = (item) => {
    const itemData = { 
      institution: item.institution, 
      program: item.program, 
      period: item.period, 
      description: item.description, 
      evidenceUrl: item.evidenceUrl 
    };
    setForm(itemData);
    setEditId(item.id);
    setShowForm(true);
  };

  /* Resets the form state, clears errors, sets editing mode to null, and hides the form */
  const handleCancel = () => {
    const resetValue = EMPTY;
    setForm(resetValue);
    setStoredData(resetValue);
    setErrors({});
    setEditId(null);
    setShowForm(false);
  };

  return { cv, form, errors, editId, showForm, setShowForm, handleChange, handleSubmit, startEdit, handleCancel, deleteEducation };
}

/* Manages dynamic sub-forms for multiple categories like work experience or languages */
export function useExtraInfoHook(EMPTY_EXP, EMPTY_LANG) {
  const { cv, setExtraType, addExtra, updateExtra, deleteExtra } = useCV();
  const type = cv.extra.type;

  // Saves the experience or language form data draft based on the current selected type
  const [storedData, setStoredData] = useLocalStorage(LOCAL_STORAGE_KEYS.EXTRA_DRAFT, type === 'experience' ? EMPTY_EXP : EMPTY_LANG);
  const [form, setForm] = useState(storedData);
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Syncs extra info form state changes to local storage
  useEffect(() => {
    setStoredData(form);
  }, [form, setStoredData]);

  /* Switches between experience and language modes, resetting form fields and errors to avoid cross-contamination */
  const handleTypeSwitch = (t) => {
    setExtraType(t);
    const targetEmpty = t === 'experience' ? EMPTY_EXP : EMPTY_LANG;
    setForm(targetEmpty);
    setStoredData(targetEmpty);
    setErrors({});
    setEditId(null);
    setShowForm(false);
  };

  /* Changes an extra info field value and clears its validation error */
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  /* Validates the data based on the current section type and saves the changes or adds a new entry */
  const handleSubmit = () => {
    const e = validateExtraInfoForm(form, type);
    if (Object.keys(e).length) { setErrors(e); return; }
    if (editId) updateExtra(editId, form);
    else addExtra(form);
    handleCancel();
  };

  /* Loads the selected extra info item into the form state and displays the form layout */
  const startEdit = (item) => {
    setForm(item);
    setEditId(item.id);
    setShowForm(true);
  };

  /* Clears the form inputs, resets validation errors, exits edit mode, and hides the form module */
  const handleCancel = () => {
    const resetValue = type === 'experience' ? EMPTY_EXP : EMPTY_LANG;
    setForm(resetValue);
    setStoredData(resetValue);
    setErrors({});
    setEditId(null);
    setShowForm(false);
  };

  return { cv, type, form, errors, editId, showForm, setShowForm, handleTypeSwitch, handleChange, handleSubmit, startEdit, handleCancel, deleteExtra };
}