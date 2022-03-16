const express = require('express');
const router = express.Router();

const {getProducts, newProducts} = require('../controllers/productcontroller');

router.route('/products').get(getProducts);
router.route('/product/new').post(newProducts);

module.exports=router;