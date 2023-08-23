const express = require('express');
const router = express.Router();
const PasswordController = require('../controllers/password');
const authenticateToken = require('../middleware/authentication');

router.get('/:id', authenticateToken, PasswordController.getPassword);
router.post('/update', authenticateToken, PasswordController.setPassword);

module.exports = router;