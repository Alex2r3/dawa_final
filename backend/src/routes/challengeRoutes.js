const express = require('express');
const router  = express.Router();
const auth    = require('../middlewares/auth');
const ctrl    = require('../controllers/challengeController');

router.get('/level/:levelId',  auth, ctrl.getChallengesByLevel);
router.post('/:id/answer',     auth, ctrl.answerChallenge);

module.exports = router;
