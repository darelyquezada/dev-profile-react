import { useState, useCallback } from 'react';
import { useCV } from '../context/CVContext';

/* 
 Custom hook to manage the edit state and delete actions for a project card.
 Keeps the UI logic separate from the visual component.
*/
export function useProjectCard(projectId) {
  const { deleteProject } = useCV();
  const [editing, setEditing] = useState(false);

  // Memoizes functions to avoid unnecessary re-renders
  const handleStartEdit = useCallback(() => setEditing(true), []);
  const handleStopEdit = useCallback(() => setEditing(false), []);
  
  const handleDelete = useCallback(() => {
    deleteProject(projectId);
  }, [deleteProject, projectId]);

  return {
    editing,
    handleStartEdit,
    handleStopEdit,
    handleDelete,
  };
}