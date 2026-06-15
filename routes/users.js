const express = require('express');
const router = express.Router();
const service = require('../services/users');
const { protect } = require('../middlewares/jwt');

router.post('/login', service.login);
router.get('/logout', service.logout);

router.get('/', protect, service.getAll);
router.get('/:email', protect, service.getByEmail);
router.post('/', protect, service.register);
router.put('/:email', protect, service.update);
router.delete('/:email', protect, service.remove);

module.exports = router;