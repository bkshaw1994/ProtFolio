const jwt = require('jsonwebtoken');

// Verifies a Bearer JWT signed with JWT_SECRET and attaches the payload to req.user.
// Fails closed: if JWT_SECRET is not configured the route is treated as misconfigured
// rather than open.
const requireAuth = (req, res, next) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error('JWT_SECRET is not configured; refusing to authorize request.');
    return res.status(500).json({
      success: false,
      message: 'Server authentication is not configured.'
    });
  }

  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.'
    });
  }

  try {
    req.user = jwt.verify(token, secret);
    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.'
    });
  }
};

module.exports = { requireAuth };
