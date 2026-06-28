const express = require('express');
const router  = express.Router();
const auth    = require('../middlewares/auth');
const ctrl    = require('../controllers/rankingController');

router.get('/', auth, ctrl.getRanking);

module.exports = router;
