// Compress and encode content for URL sharing
export function encodeContentForShare(content: string): string {
  try {
    // Use base64 encoding with URI-safe characters
    const encoded = btoa(encodeURIComponent(content));
    return encoded;
  } catch {
    return '';
  }
}

export function decodeSharedContent(encoded: string): string {
  try {
    const decoded = decodeURIComponent(atob(encoded));
    return decoded;
  } catch {
    return '';
  }
}

export function generateShareUrl(content: string): string {
  const encoded = encodeContentForShare(content);
  const baseUrl = window.location.origin;
  return `${baseUrl}/preview?content=${encoded}`;
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
