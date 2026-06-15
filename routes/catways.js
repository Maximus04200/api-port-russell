const express = require('express');
const router = express.Router();
const service = require('../services/catways');
const { protect } = require('../middlewares/jwt');

router.use(protect);

router.get('/', service.getAll);
router.get('/:id', service.getById);
router.post('/', service.create);
router.put('/:id', service.update);
router.delete('/:id', service.remove);

module.exports = router;