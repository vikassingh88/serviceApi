const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticateToken = require('../middlewares/auth');

router.post('/category', authenticateToken, categoryController.createCategory);
router.get('/categories', authenticateToken, categoryController.getAllCategories);
router.put('/category/:categoryId', authenticateToken, categoryController.updateCategory);
router.delete('/category/:categoryId', authenticateToken, categoryController.deleteCategory);

module.exports = router;
