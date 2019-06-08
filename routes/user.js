const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/user');

router.get('/:userId', getProfile);

module.exports = router;