const express = require('express');
const router = express.Router();

const {getProducts,
     newProducts,
      getSingleProduct,
       updateProduct,
        deleteProduct } = require('../controllers/productcontroller');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/new').post(newProducts);

router.route('/admin/product/:id').put(updateProduct);
router.route('/admin/product/:id').delete(deleteProduct);

module.exports=router;