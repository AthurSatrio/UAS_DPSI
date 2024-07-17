const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authroutes');
const memberRoutes = require('./routes/memberroutes');
const bookRoutes = require('./routes/bookroutes');
const loanRoutes = require('./routes/loanroutes');

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: '*', // Updated origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
dotenv.config();

// all routes here
app.use('/api/auth', authRoutes);
app.use('/api', memberRoutes);
app.use('/api', bookRoutes);
app.use('/api', loanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
