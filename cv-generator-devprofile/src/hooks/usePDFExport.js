import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCV, CVContext } from '../context/CVContext';
import { exportToPDF } from '../utils/pdfGenerator';

export function usePDFExport() {
  const { cv } = useCV();
  const [exporting, setExporting] = useState(false);
  const navigate = useNavigate();

  const goToEditor = () => { 
    navigate('/editor'); 
  };

  const hasData = cv.personal.name || cv.skills.length > 0;

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportToPDF(cv.personal.name);
    } catch (err) {
      alert("Could not build the PDF document. Please verify image assets.");
    } finally {
      setExporting(false);
    }
  };

  // Exponemos las variables y los manejadores limpios para la vista
  return {
    cv,
    exporting,
    hasData,
    goToEditor,
    handleExport
  };
}