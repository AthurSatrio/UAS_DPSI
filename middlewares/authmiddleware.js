const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret'; // Replace with your actual secret key

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['Authorization'];
  if (!authHeader) {
    return res.status(401).send({ message: 'Authentication required' });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded token payload to req.user
    next();
  } catch (error) {
    res.status(401).send({ message: 'Invalid token', error: error.message });
  }
};

module.exports = authMiddleware;
