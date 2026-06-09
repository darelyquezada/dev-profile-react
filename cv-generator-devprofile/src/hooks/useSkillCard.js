import { useState, useCallback } from 'react';
import { useCV } from '../context/CVContext';

/* Custom hook to manage the edit state and delete actions for a skill card.
 Separates UI interactive behavior from the presentation layer.
*/
export function useSkillCard(skillId) {
  const { deleteSkill } = useCV();
  const [editing, setEditing] = useState(false);

  // Memoizes layout toggles to prevent redundant component re-renders
  const handleStartEdit = useCallback(() => setEditing(true), []);
  const handleStopEdit = useCallback(() => setEditing(false), []);
  
  const handleDelete = useCallback(() => {
    deleteSkill(skillId);
  }, [deleteSkill, skillId]);

  return {
    editing,
    handleStartEdit,
    handleStopEdit,
    handleDelete,
  };
}