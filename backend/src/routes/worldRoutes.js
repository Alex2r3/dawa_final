const express = require('express');
const router  = express.Router();
const auth    = require('../middlewares/auth');
const ctrl    = require('../controllers/worldController');

router.get('/',    auth, ctrl.getWorlds);
router.get('/:id', auth, ctrl.getWorldById);

module.exports = router;
