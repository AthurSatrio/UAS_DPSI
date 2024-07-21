const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createUser, getUserByEmail } = require('../models/usermodel');

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret'; // Replace with your actual secret key

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the user
    const userId = await createUser({ name, email, password: hashedPassword, role });
    
    // Send success response
    res.status(201).send({ message: 'User registered successfully', userId });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send({ message: 'Internal server error', error: error.message });
  }
};

// Login an existing user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Retrieve user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    
    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    
    // Generate a JWT token
    const token = jwt.sign({ userId: user.userId, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    
    // Send the token as response
    res.send({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send({ message: 'Internal server error', error: error.message });
  }
};

module.exports = { register, login };
