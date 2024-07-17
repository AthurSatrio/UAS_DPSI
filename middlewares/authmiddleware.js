const jwt = require('jsonwebtoken');

const authMiddleware = (role) => {
  return (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).send({ message: 'No token provided' });
    }
    try {
      const decoded = jwt.verify(token, 'your_jwt_secret');
      req.user = decoded;
      if (role && decoded.role !== role) {
        return res.status(403).send({ message: 'Forbidden' });
      }
      next();
    } catch (error) {
      res.status(401).send({ message: 'Invalid token' });
    }
  };
};

module.exports = authMiddleware;
