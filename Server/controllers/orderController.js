const Order = require("../models/Order");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
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
    return next(new ErrorHandler("Order not found"));
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

//get all orders admin => /api/v1/admin/orders
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//update or status of order for admin => /api/v1/admin/orders/:id
exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order has been delivered", 400));
  }

  order.orderItems.forEach(async (item) => {
    const product = await Product.findById(item.product);
    product.stock -= quantity;
    await product.save();
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
    order,
  });
});

//delete order => /api/v1/orders/:id
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found"));
  }
  await order.remove();
  res.status(200).json({
    success: true,
    order,
  });
});
