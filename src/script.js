// DOM Elements
const markdownInput = document.getElementById('markdown-input');
const previewOutput = document.getElementById('preview-output');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');
const pasteBtn = document.getElementById('paste-btn');
const downloadBtn = document.getElementById('download-btn');
const toast = document.getElementById('toast');

// Configure Marked options
marked.use({
  breaks: true, // Enable GFM line breaks
  gfm: true, // Enable GFM
});

// Function to update preview
const updatePreview = () => {
  const rawMarkdown = markdownInput.value;
  const htmlContent = marked.parse(rawMarkdown);
  previewOutput.innerHTML = htmlContent;
};

// Event Listener for Input
markdownInput.addEventListener("input", updatePreview);

// Copy Functionality
const copyToClipboard = async () => {
  if (!previewOutput.innerHTML.trim()) {
    showToast("Nothing to copy!");
    return;
  }

  try {
    // We select the actual HTML content to copy it as rich text
    // This is the standard way to copy renderable HTML
    const content = previewOutput.innerHTML;

    // Use the Clipboard API with 'text/html' and 'text/plain'
    const blobHtml = new Blob([content], { type: "text/html" });
    const blobText = new Blob([previewOutput.innerText], {
      type: "text/plain",
    });

    const data = [
      new ClipboardItem({
        "text/html": blobHtml,
        "text/plain": blobText,
      }),
    ];

    await navigator.clipboard.write(data);
    showToast("Copied HTML to clipboard!");
  } catch (err) {
    console.error("Failed to copy via Clipboard API:", err);

    // Fallback method: Select and execCommand
    try {
      const range = document.createRange();
      range.selectNode(previewOutput);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      showToast("Copied HTML to clipboard (fallback)!");
    } catch (fallbackErr) {
      console.error("Fallback copy failed:", fallbackErr);
      showToast("Failed to copy. See console.");
    }
  }
};

// Toast Notification Helper
const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
};

// Event Listener for Copy Button
copyBtn.addEventListener('click', copyToClipboard);

// Clear Functionality
clearBtn.addEventListener('click', () => {
    markdownInput.value = '';
    updatePreview();
    showToast('Cleared!');
});

// Paste Functionality
pasteBtn.addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText();
        if (text) {
            // Optional: Insert at cursor position or replace? 
            // For simplicity, we'll append if empty, or insert at cursor
            const start = markdownInput.selectionStart;
            const end = markdownInput.selectionEnd;
            const originalText = markdownInput.value;
            
            markdownInput.value = originalText.substring(0, start) + text + originalText.substring(end);
            updatePreview();
            showToast('Pasted from clipboard!');
        } else {
            showToast('Clipboard is empty!');
        }
    } catch (err) {
        console.error('Failed to read clipboard:', err);
        showToast('Failed to paste. unexpected error.');
    }
});

// Download Functionality
downloadBtn.addEventListener('click', () => {
    if (!previewOutput.innerHTML.trim()) {
        showToast('Nothing to download!');
        return;
    }

    const content = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Confluence Export</title>
<style>
/* Inline basic confluence styles for the standalone file */
body { font-family: sans-serif; color: #172b4d; padding: 2em; }
table { border-collapse: collapse; width: 100%; margin: 1.5rem 0; border: 1px solid #dfe1e6; }
th, td { padding: 8px 12px; border: 1px solid #dfe1e6; text-align: left; }
th { background-color: #f4f5f7; font-weight: 600; }
a { color: #0052cc; text-decoration: none; }
pre { background-color: #f4f5f7; padding: 1rem; border-radius: 4px; overflow-x: auto; }
blockquote { background-color: #e3fcef; border-left: 4px solid #006644; padding: 1rem; margin: 1rem 0; }
</style>
</head>
<body>
${previewOutput.innerHTML}
</body>
</html>`;

    const now = new Date();
    const yyyy = now.getFullYear();
    const MM = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const timestamp = `${yyyy}${MM}${dd}_${hh}${mm}${ss}`;

    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${timestamp}_confluence-content.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Download started!');
});

// Initial placeholder render
markdownInput.value = `# Welcome to MD2Confluence

This tool converts your **Markdown** into *Confluence-ready* formatted text.

## Features
- Preserves headers
- Handles lists
- **Enhanced Table Support**

## Example Table

| Feature | Support | Notes |
| :------ | :-----: | :---- |
| Tables  | ✅      | Styled for Confluence |
| Images  | ❌      | Manual upload required |
| Code    | ✅      | Syntax highlighting blocks |

> **Note:** Just paste this into Confluence!
`;
updatePreview();
