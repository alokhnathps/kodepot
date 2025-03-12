function runCode() {
  const htmlCode = document.getElementById("htmlCode").value;
  const cssCode = document.getElementById("cssCode").value;
  const scssCode = document.getElementById("scssCode").value;
  const jsCode = document.getElementById("jsCode").value;
  const cssUrl = document.getElementById("cssUrl").value;
  const jsUrl = document.getElementById("jsUrl").value;

  const resultFrame = document.getElementById("resultFrame");

  // Compile SCSS to CSS
  Sass.compile(scssCode, function (result) {
    const compiledCssCode = result.text;

    // Get the document of the iframe
    const iframeDoc =
      resultFrame.contentDocument || resultFrame.contentWindow.document;

    // Open the iframe document to write new content
    iframeDoc.open();

    // Write the combined HTML, CSS, and JS
    iframeDoc.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${cssCode || ""}</style>
        <style>${compiledCssCode || ""}</style>
        <link rel="stylesheet" href="${cssUrl || ""}">
      </head>
      <body>
        ${htmlCode || ""}
        <script src="${jsUrl || ""}"></script>
        <script>
          try {
            ${jsCode || ""}
          } catch (error) {
            document.body.innerHTML = '<h3 style="color: red;">Error: ' + error.message + '</h3>';
          }
        <\/script>
      </body>
      </html>
    `);

    // Close the iframe document to render it
    iframeDoc.close();
  });
}

// Clear the code editors
function clearCode() {
  document.getElementById("htmlCode").value = "";
  document.getElementById("cssCode").value = "";
  document.getElementById("scssCode").value = "";
  document.getElementById("jsCode").value = "";
  document.getElementById("cssUrl").value = "";
  document.getElementById("jsUrl").value = "";
  runCode(); // Clear the iframe content as well
}

// Error handling for JS
function handleJSExecutionError(error) {
  const resultFrame = document.getElementById("resultFrame");
  const iframeDoc =
    resultFrame.contentDocument || resultFrame.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(`<h3 style="color: red;">Error: ${error.message}</h3>`);
  iframeDoc.close();
}

// Make the divider resizable
const resizer = document.getElementById("resizer");
const leftArea = document.getElementById("leftArea");
const rightArea = document.getElementById("rightArea");

let isResizing = false;

// Mouse events for resizing
resizer.addEventListener("mousedown", (e) => {
  isResizing = true;
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", () => {
    isResizing = false;
    document.removeEventListener("mousemove", handleMouseMove);
  });
});

function handleMouseMove(e) {
  if (isResizing) {
    // Get the container width
    const container = document.querySelector(".container");
    if (!container) {
      console.error("Container element not found");
      return;
    }
    const containerWidth = container.offsetWidth;

    // Calculate the new width for the left area
    const leftAreaWidth = (e.clientX / containerWidth) * 100;

    // Set new widths for left and right areas
    leftArea.style.width = `${leftAreaWidth}%`;
    rightArea.style.width = `${100 - leftAreaWidth}%`;
  }
}
