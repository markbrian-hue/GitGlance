import html2canvas from 'html2canvas';

export const exportDossierToImage = async (elementId: string, username: string): Promise<boolean> => {
  const element = document.getElementById(elementId);
  if (!element) return false;

  try {
    // We configure html2canvas to use our exact dark-mode background 
    // and increase the scale for a high-retina (2x) image resolution.
    const canvas = await html2canvas(element, {
      backgroundColor: '#050505',
      scale: 2,
      useCORS: true, // CRUCIAL: Allows GitHub avatar images to be drawn without cross-origin security errors
      logging: false,
    });

    // Convert the canvas to a base64 PNG URL
    const dataUrl = canvas.toDataURL('image/png');

    // Create a fake anchor tag to trigger the browser's download behavior
    const link = document.createElement('a');
    link.download = `${username}-gitglance-report.png`;
    link.href = dataUrl;
    link.click();
    
    return true;
  } catch (error) {
    console.error('Export failed:', error);
    return false;
  }
};