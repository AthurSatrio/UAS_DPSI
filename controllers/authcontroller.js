const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createUser, getUserByEmail } = require('../models/usermodel');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userId = await createUser({ name, email, password, role });
  res.status(201).send({ message: 'User registered successfully', userId });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(401).send({ message: 'Invalid email or password' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send({ message: 'Invalid email or password' });
  }
  const token = jwt.sign({ userId: user.userId, role: user.role }, 'your_jwt_secret');
  res.send({ token });
};

module.exports = { register, login };
