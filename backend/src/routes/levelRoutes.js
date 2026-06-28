const express = require('express');
const router  = express.Router();
const auth    = require('../middlewares/auth');
const ctrl    = require('../controllers/levelController');

router.get('/world/:worldId', auth, ctrl.getLevelsByWorld);
router.get('/:id/detail',    auth, ctrl.getLevelById);

module.exports = router;
