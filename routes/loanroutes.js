const express = require('express');
const { borrowBook } = require('../controllers/loancontroller');
const authMiddleware = require('../middlewares/authmiddleware');
const router = express.Router();

router.post('/borrow', authMiddleware('anggota'), borrowBook);

module.exports = router;
