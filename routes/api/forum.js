const express = require ('express');
const { createForum, getForum, getAllForums, updateForum } = require('../../controllers/forums');
const router = express.Router();

router.post('/', passport.authenticate('jwt', {session: false}), createForum);
router.get('/:id', passport.authenticate('jwt', {session: false}), getForum);
router.get('/', passport.authenticate('jwt', {session: false}), getAllForums);
router.put('/', passport.authenticate('jwt', {session: false}), updateForum);

module.exports = router;