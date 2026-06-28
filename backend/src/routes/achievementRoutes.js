const express = require('express');
const router  = express.Router();
const auth    = require('../middlewares/auth');
const ctrl    = require('../controllers/achievementController');

router.get('/', auth, ctrl.getAchievements);

module.exports = router;
