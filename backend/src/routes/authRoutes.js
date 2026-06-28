const express = require('express');
const router  = express.Router();
const auth    = require('../controllers/authController');

router.post('/register', auth.registerValidation, auth.register);
router.post('/login',    auth.loginValidation,    auth.login);

// Protected
const authMiddleware = require('../middlewares/auth');
router.get('/me', authMiddleware, auth.getMe);

module.exports = router;
