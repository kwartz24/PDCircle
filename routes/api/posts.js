const express = require('express');
const router = express.Router();

// @route GET api/Posts/test
// @des Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Post Works"}));

module.exports = router;