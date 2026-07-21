// Escapes characters that are significant in HTML to prevent HTML/script injection
// when interpolating user-supplied values into HTML (e.g. notification emails).
const escapeHtml = (value) => {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

module.exports = { escapeHtml };
