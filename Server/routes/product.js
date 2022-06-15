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

router
  .route("/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getProducts);
router.route("/product/:id").get(getSingleProduct);

router.route("/admin/product/new").post(isAuthenticatedUser, newProducts);

router.route("/admin/product/:id").put(isAuthenticatedUser, updateProduct);
router.route("/admin/product/:id").delete(isAuthenticatedUser, deleteProduct);

module.exports = router;
