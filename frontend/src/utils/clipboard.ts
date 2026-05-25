/**
 * Copy text to clipboard using modern API with fallback for non-HTTPS environments.
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('Modern clipboard API failed, trying fallback...', err);
    }
  }

  // Fallback for HTTP / non-secure contexts
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Fallback copy failed', err);
    return false;
  }
};

/**
 * Paste text from clipboard using modern API.
 * Returns null if blocked or unavailable.
 */
export const pasteFromClipboard = async (): Promise<string | null> => {
  if (navigator.clipboard && navigator.clipboard.readText) {
    try {
      const text = await navigator.clipboard.readText();
      return text;
    } catch (err) {
      console.warn('Clipboard read failed/denied:', err);
      return null;
    }
  }
  return null;
};
