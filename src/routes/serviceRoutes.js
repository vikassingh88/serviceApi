const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authenticateToken = require('../middlewares/auth');

router.post('/category/:categoryId/service', authenticateToken, serviceController.createService);
router.get('/category/:categoryId/services', authenticateToken, serviceController.getServices);
router.put('/category/:categoryId/service/:serviceId', authenticateToken, serviceController.updateService);
router.delete('/category/:categoryId/service/:serviceId', authenticateToken, serviceController.deleteService);

module.exports = router;
