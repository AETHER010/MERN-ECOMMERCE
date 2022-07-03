const Order = require("../models/Order");
const Product = require("../models/product");
const errorHandler = require("../utils/errorHandler");
const catchAsync = require("../middlewares/catchAsyncErrors");

//Create a new Order => /api/v1/order/new
exports.newOrder = catchAsync(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    totalPrice,
    taxPrice,
    shippingPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    totalPrice,
    taxPrice,
    shippingPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});
