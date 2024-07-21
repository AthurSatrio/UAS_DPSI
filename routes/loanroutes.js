const express = require('express');
const { borrowBook,getLoans } = require('../controllers/loancontroller');
const authMiddleware = require('../middlewares/authmiddleware');
const router = express.Router();

router.post('/borrow', authMiddleware('anggota'), borrowBook);
router.get('/loans', authMiddleware('pustakawan'), getLoans); // Added route for getting all loans

module.exports = router;
