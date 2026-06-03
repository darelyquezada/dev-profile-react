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

/* Baseline schema structure defining an empty contact or professional dynamic hyperlink node */
const EMPTY_LINK = { label: '', url: '' };

/* Orchestrates real-time state mutation tracking for core identities and multi-link dynamic arrays */
export function usePersonalHook() {
  const { cv, updatePersonal } = useCV();
  
  // Utilizing the centralized storage key constant for the personal draft context
  const [storedData, setStoredData] = useLocalStorage(LOCAL_STORAGE_KEYS.PERSONAL_DRAFT, cv.personal);
  const [form, setForm] = useState(storedData);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  // Synchronizing component state changes back into the local storage layer reactively
  useEffect(() => {
    setStoredData(form);
  }, [form, setStoredData]);

  /* Modifies a top-level schema field value and flushes any legacy validation errors attached to it */
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSaved(false);
  };

  /* Dispatches structural updates to specific indices inside the multi-link nested array wrapper */
  const handleLinkChange = (idx, field, value) => {
    const updated = form.links.map((l, i) => (i === idx ? { ...l, [field]: value } : l));
    setForm((prev) => ({ ...prev, links: updated }));
    setSaved(false);
  };

  /* Appends an uninitialized structural hyperlink template node into the form collection array */
  const addLink = () => setForm((prev) => ({ ...prev, links: [...prev.links, { ...EMPTY_LINK }] }));
  
  /* Evicts a targeted hyperlink record from the collection matrix via transactional index filtering */
  const removeLink = (idx) => setForm((prev) => ({ ...prev, links: prev.links.filter((_, i) => i !== idx) }));

  /* Evaluates dataset integrity via centralized rules engines before committing mutations to global context boundaries */
  const handleSubmit = () => {
    const e = validatePersonalForm(form);
    if (Object.keys(e).length) { setErrors(e); return; }
    updatePersonal(form);
    setSaved(true);
  };

  return { form, errors, saved, handleChange, handleLinkChange, addLink, removeLink, handleSubmit };
}