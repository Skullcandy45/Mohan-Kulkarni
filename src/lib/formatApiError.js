/**
 * formatApiError — human-readable messages from Qobo Central API error objects.
 * Use wherever api calls can fail to show user-friendly messages.
 *
 * @param {unknown} err — caught error or API error object
 * @returns {string}
 */
export function formatApiError(err) {
  if (!err) return 'An unknown error occurred.';

  // API response error shape: { message: string } or { error: { message: string } }
  if (typeof err === 'string') return err;
  if (err.error?.error?.message) return err.error.error.message;
  if (err.error?.message) return err.error.message;
  if (err.message) return err.message;
  if (err.statusText) return err.statusText;

  return 'Something went wrong. Please try again.';
}
