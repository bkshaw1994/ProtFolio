const { escapeHtml } = require('../utils/escapeHtml');

describe('escapeHtml Utility', () => {
  it('returns empty string for null or undefined', () => {
    expect(escapeHtml(null)).toBe('');
    expect(escapeHtml(undefined)).toBe('');
  });

  it('escapes special HTML characters properly', () => {
    const raw = '<script>alert("xss & \'hello\'");</script>';
    const expected = '&lt;script&gt;alert(&quot;xss &amp; &#39;hello&#39;&quot;);&lt;/script&gt;';
    expect(escapeHtml(raw)).toBe(expected);
  });

  it('converts non-string primitives to string and escapes them', () => {
    expect(escapeHtml(12345)).toBe('12345');
    expect(escapeHtml(true)).toBe('true');
  });
});
