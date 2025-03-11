function runCode() {
    const htmlCode = document.getElementById('htmlCode').value;
    const cssCode = document.getElementById('cssCode').value;
    const jsCode = document.getElementById('jsCode').value;
  
    const resultFrame = document.getElementById('resultFrame');
    
    // Get the document of the iframe
    const iframeDoc = resultFrame.contentDocument || resultFrame.contentWindow.document;
    
    // Open the iframe document to write new content
    iframeDoc.open();
    
    // Write the combined HTML, CSS, and JS
    iframeDoc.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${cssCode || ''}</style>
      </head>
      <body>
        ${htmlCode || ''}
        <script>${jsCode || ''}<\/script>
      </body>
      </html>
    `);
    
    // Close the iframe document to render it
    iframeDoc.close();
  }
  
  // Make the divider resizable
  const resizer = document.getElementById('resizer');
  const leftArea = document.getElementById('leftArea');
  const rightArea = document.getElementById('rightArea');
  
  let isResizing = false;
  
  // Mouse events for resizing
  resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
      isResizing = false;
      document.removeEventListener('mousemove', handleMouseMove);
    });
  });
  
  function handleMouseMove(e) {
    if (isResizing) {
      // Get the mouse movement and adjust left and right area widths
      const containerWidth = document.querySelector('.container').offsetWidth;
      const leftAreaWidth = e.clientX / containerWidth * 100;
      
      // Set new widths for left and right areas
      leftArea.style.width = `${leftAreaWidth}%`;
      rightArea.style.width = `${100 - leftAreaWidth}%`;
    }
  }
  