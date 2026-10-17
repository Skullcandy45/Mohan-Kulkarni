/** Parse contact form body (Interest / Deadline / Company + brief). */
export function parseContactFormMessage(raw) {
  const text = String(raw || '').trim();
  if (!text) {
    return { interest: '', deadline: '', company: '', brief: '' };
  }

  const meta = {};
  const briefLines = [];
  let pastMeta = false;

  for (const line of text.split('\n')) {
    const metaMatch = line.match(/^(Interest|Deadline|Company):\s*(.*)$/i);
    if (metaMatch) {
      meta[metaMatch[1].toLowerCase()] = metaMatch[2].trim();
      continue;
    }
    if (!pastMeta && line.trim() === '' && Object.keys(meta).length > 0) {
      pastMeta = true;
      continue;
    }
    if (pastMeta || Object.keys(meta).length === 0) {
      briefLines.push(line);
    }
  }

  const brief = briefLines.join('\n').trim();
  return {
    interest: meta.interest || '',
    deadline: meta.deadline || '',
    company: meta.company || '',
    brief: brief || (Object.keys(meta).length === 0 ? text : ''),
  };
}
