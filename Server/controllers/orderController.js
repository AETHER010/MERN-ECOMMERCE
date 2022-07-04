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

//get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new Error("Order not found"));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//Get Loggined user order => /api/v1/order/me
exports.getLoggedInUserOrder = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});
