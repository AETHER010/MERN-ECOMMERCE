const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productcontroller");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProducts);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router;
