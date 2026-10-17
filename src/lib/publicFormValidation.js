/** Client-side validation for public storefront forms. */

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidEmail(email) {
  const value = String(email || '').trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  return digits.length >= 10;
}

export function validateContactForm(form) {
  const errors = {};
  if (!isNonEmptyString(form?.name) || form.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }
  if (!isValidEmail(form?.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!isValidPhone(form?.phone)) {
    errors.phone = 'Please enter a valid phone number (at least 10 digits).';
  }
  if (!isNonEmptyString(form?.subject)) {
    errors.subject = 'Please select a topic.';
  }
  if (!isNonEmptyString(form?.message) || form.message.trim().length < 10) {
    errors.message = 'Please enter a message (at least 10 characters).';
  }
  const message = Object.values(errors)[0] || '';
  return { valid: message === '', errors, message };
}

export function validateAppointmentForm(form) {
  const errors = {};
  if (!isNonEmptyString(form?.name) || form.name.trim().length < 2) {
    errors.name = 'Please enter your full name (at least 2 characters).';
  }
  if (!isValidEmail(form?.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!isValidPhone(form?.phone)) {
    errors.phone = 'Please enter a valid phone number (at least 10 digits).';
  }
  if (!isNonEmptyString(form?.date)) {
    errors.date = 'Please choose a preferred date.';
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const picked = new Date(`${form.date}T00:00:00`);
    if (Number.isNaN(picked.getTime()) || picked < today) {
      errors.date = 'Please choose today or a future date.';
    }
  }
  if (!isNonEmptyString(form?.time)) {
    errors.time = 'Please select a preferred time.';
  }
  const message = Object.values(errors)[0] || '';
  return { valid: message === '', errors, message };
}
