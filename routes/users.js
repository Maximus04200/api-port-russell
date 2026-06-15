const express = require('express');
const router = express.Router();
const service = require('../services/users');

router.post('/register', service.register);
router.post('/login', service.login);

module.exports = router;