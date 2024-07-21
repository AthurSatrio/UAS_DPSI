const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret'; // Replace with your actual secret key

const authMiddleware = (req, res, next) => {
  // Log the headers for debugging
  console.log('Headers:', req.headers);

  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).send({ message: 'Authorization header is missing' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ message: 'Token is missing or malformed' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded token payload to req.user
    next();
  } catch (error) {
    res.status(401).send({ message: 'Invalid token', error: error.message });
  }
};

module.exports = authMiddleware;
