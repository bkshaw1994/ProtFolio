const upload = require('../middleware/upload');

describe('Upload Middleware', () => {
  it('should export profileImage, resume and uploadBoth middlewares', () => {
    expect(upload.uploadProfileImage).toBeDefined();
    expect(upload.uploadResume).toBeDefined();
    expect(upload.uploadBoth).toBeDefined();
    expect(typeof upload.uploadProfileImage).toBe('function');
  });
});
