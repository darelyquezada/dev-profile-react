import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function exportToPDF(userName) {
  const element = document.getElementById('cv-preview-root');
  
  if (!element) {
    console.error("Element #cv-preview-root not found in DOM.");
    return;
  }

  // Sanitize the filename structure
  const formattedName = userName && userName.trim() 
    ? userName.trim().replace(/\s+/g, '_') 
    : 'Developer';
  const fileName = `CV_${formattedName}.pdf`;

  try {
    // Capture the HTML component as a high-resolution canvas snapshot
    const canvas = await html2canvas(element, {
      scale: 2,             // High resolution density enhancement
      useCORS: true,        // Asset URL context safety 
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);

    // Initialize jsPDF with explicit US Letter dimensions (612pt x 792pt)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'letter'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();   // 612 pt
    const pageHeight = pdf.internal.pageSize.getHeight(); // 792 pt

    // Calculate strict proportional single-page scaling
    const canvasRatio = canvas.width / canvas.height;
    const pageRatio = pageWidth / pageHeight;

    let imgWidth = pageWidth;
    let imgHeight = pageHeight;

    // Constrain by width or height depending on aspect ratio to guarantee it fits on ONE page
    if (canvasRatio > pageRatio) {
      // The canvas is wider proportional to the page
      imgHeight = pageWidth / canvasRatio;
    } else {
      // The canvas is taller proportional to the page (standard CV scenario)
      imgWidth = pageHeight * canvasRatio;
    }

    // Centering alignment offsets inside the 612x792 canvas viewport
    const offsetX = (pageWidth - imgWidth) / 2;
    const offsetY = (pageHeight - imgHeight) / 2;

    // Single-render operation (No loops, no pdf.addPage())
    pdf.addImage(imgData, 'JPEG', offsetX, offsetY, imgWidth, imgHeight);

    // Stream download trigger
    pdf.save(fileName);

  } catch (error) {
    console.error('Direct single-page PDF generation failed:', error);
    throw error;
  }
}