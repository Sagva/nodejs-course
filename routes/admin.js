const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct)
router.post('/edit-product/', adminController.postEditProduct) //for post requests data can be enclosed in the request we are sending, that's why we dont need dynamic segment here (/:productid) 

module.exports = router;
