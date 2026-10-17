/** Admin list + modal status for contact_messages (matches DB enum: new, read, replied). */
export const CONTACT_MESSAGE_STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'replied', label: 'Replied' },
];

/** Map legacy DB rows (read) to the admin UI workflow. */
export function normalizeContactMessageStatus(status) {
  if (status === 'read') return 'in_progress';
  return status || 'new';
}

/** Map admin UI status to the value stored in the API/DB. */
export function contactMessageStatusToApi(status) {
  const ui = normalizeContactMessageStatus(status);
  if (ui === 'in_progress') return 'read';
  return ui;
}

export function contactMessageStatusVariant(status) {
  const s = normalizeContactMessageStatus(status);
  if (s === 'in_progress') return 'in_progress';
  if (s === 'replied') return 'featured';
  return 'new';
}

export function contactMessageStatusLabel(status) {
  const s = normalizeContactMessageStatus(status);
  const row = CONTACT_MESSAGE_STATUSES.find((item) => item.value === s);
  return row?.label || 'New';
}
