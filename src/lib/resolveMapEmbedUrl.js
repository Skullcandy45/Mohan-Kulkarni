/**
 * Accept Google Maps embed as a bare URL or full <iframe> paste from "Share → Embed a map".
 */
export function resolveMapEmbedUrl(raw) {
  if (raw == null) return '';

  const value = String(raw).trim();
  if (!value) return '';

  const iframeMatch = value.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  if (iframeMatch?.[1]) {
    return iframeMatch[1].trim();
  }

  const srcMatch = value.match(/\bsrc=["']([^"']+)["']/i);
  if (srcMatch?.[1] && /google\.com\/maps\/embed/i.test(srcMatch[1])) {
    return srcMatch[1].trim();
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return '';
}
