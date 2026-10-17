/** Stable team member image URL with avatar fallback */
export function getMemberImageUrl(member) {
  const url = member?.image || member?.image_url;
  if (url && String(url).trim()) return String(url).trim();
  const name = member?.name || 'Team Member';
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4A3565&color=fff&size=600&bold=true`;
}
