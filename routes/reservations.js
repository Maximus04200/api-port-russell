const express = require('express');
const router = express.Router({ mergeParams: true });
const service = require('../services/reservations');
const { protect } = require('../middlewares/jwt');

router.use(protect);

router.get('/', service.getAll);
router.get('/:idReservation', service.getById);
router.post('/', service.create);
router.delete('/:idReservation', service.remove);

module.exports = router;