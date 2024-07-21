const express = require('express');
const { addBook,getBooks } = require('../controllers/bookcontroller');
const authMiddleware = require('../middlewares/authmiddleware');
const router = express.Router();

router.post('/books', authMiddleware('pustakawan'), addBook);
router.get('/books', authMiddleware(), getBooks); // Added route for getting all books

module.exports = router;
