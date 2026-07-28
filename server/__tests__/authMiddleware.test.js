const jwt = require('jsonwebtoken');
const { requireAuth } = require('../middleware/auth');

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    next = jest.fn();
    process.env.JWT_SECRET = 'test-secret';
  });

  it('should return 500 if JWT_SECRET is missing', () => {
    delete process.env.JWT_SECRET;

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Server authentication is not configured.'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if authorization header is missing or malformed', () => {
    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Authentication required.'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid or expired', () => {
    req.headers.authorization = 'Bearer invalid-token';

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Invalid or expired token.'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should attach user payload to req and call next if token is valid', () => {
    const payload = { userId: '123', role: 'admin' };
    const validToken = jwt.sign(payload, process.env.JWT_SECRET);
    req.headers.authorization = `Bearer ${validToken}`;

    requireAuth(req, res, next);

    expect(req.user).toBeDefined();
    expect(req.user.userId).toBe('123');
    expect(next).toHaveBeenCalled();
  });
});
