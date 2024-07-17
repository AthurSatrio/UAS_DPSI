const express = require('express');
const { addBook } = require('../controllers/bookcontroller');
const authMiddleware = require('../middlewares/authmiddleware');
const router = express.Router();

router.post('/books', authMiddleware('pustakawan'), addBook);

module.exports = router;
