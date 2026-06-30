const express = require('express');
const router  = express.Router();
const auth    = require('../controllers/authController');

router.post('/register', auth.registerValidation, auth.register);
router.post('/login',    auth.loginValidation,    auth.login);
router.post('/google',   auth.googleLogin);

// Protected
const authMiddleware = require('../middlewares/auth');
router.get('/me',       authMiddleware, auth.getMe);
router.put('/profile',  authMiddleware, auth.updateProfile);

module.exports = router;
