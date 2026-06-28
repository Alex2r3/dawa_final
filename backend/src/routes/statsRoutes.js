const express = require('express');
const router  = express.Router();
const auth    = require('../middlewares/auth');
const ctrl    = require('../controllers/statsController');

router.get('/', auth, ctrl.getStats);

module.exports = router;
