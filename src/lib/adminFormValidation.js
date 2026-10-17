/** Client-side validation for admin forms (storefront + admin). */

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export function validateRating(rating) {
  const n = Number(rating);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n < 1 || n > 5) {
    return 'Rating must be a whole number from 1 to 5.';
  }
  return null;
}

export function validateTestimonialForm(data) {
  const errors = {};
  if (!isNonEmptyString(data?.name)) errors.name = 'Client name is required.';
  if (!isNonEmptyString(data?.role)) errors.role = 'Role / company is required.';
  if (!isNonEmptyString(data?.review)) errors.review = 'Review is required.';
  const ratingError = validateRating(data?.rating);
  if (ratingError) errors.rating = ratingError;
  const message = Object.values(errors)[0] || '';
  return { valid: message === '', errors, message };
}

export function validateServiceForm(data) {
  const errors = {};
  if (!isNonEmptyString(data?.title)) errors.title = 'Service title is required.';
  if (!isNonEmptyString(data?.description)) errors.description = 'Description is required.';
  const message = Object.values(errors)[0] || '';
  return { valid: message === '', errors, message };
}

export function validateTeamMemberForm(data) {
  const errors = {};
  if (!isNonEmptyString(data?.name)) errors.name = 'Name is required.';
  if (!isNonEmptyString(data?.role)) errors.role = 'Role / title is required.';
  const message = Object.values(errors)[0] || '';
  return { valid: message === '', errors, message };
}

export function validateHeroSectionForm(data) {
  const errors = {};
  if (!isNonEmptyString(data?.title)) errors.title = 'Title is required.';
  const message = Object.values(errors)[0] || '';
  return { valid: message === '', errors, message };
}

export function validateGalleryForm(data) {
  const errors = {};
  if (!isNonEmptyString(data?.image_url)) errors.image_url = 'Gallery image is required.';
  const message = Object.values(errors)[0] || '';
  return { valid: message === '', errors, message };
}
