const express = require('express');
const { addMember } = require('../controllers/membercontroller');
const authMiddleware = require('../middlewares/authmiddleware');
const router = express.Router();

router.post('/members', authMiddleware('pustakawan'), addMember);

module.exports = router;
