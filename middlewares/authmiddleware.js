const jwt = require('jsonwebtoken');

const authMiddleware = (role) => {
  return (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).send({ message: 'Authentication required' });
    }
    try {
      const decoded = jwt.verify(token, 'your_jwt_secret'); // replace 'your_jwt_secret' with your secret key
      req.user = decoded;
      if (role && req.user.role !== role) {
        return res.status(403).send({ message: 'Access denied' });
      }
      next();
    } catch (error) {
      res.status(401).send({ message: 'Invalid token', error: error.message });
    }
  };
};

module.exports = authMiddleware;
