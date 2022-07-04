const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  getLoggedInUserOrder,
} = require("../controllers/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/order/me/orders").get(isAuthenticatedUser, getLoggedInUserOrder);

module.exports = router;
