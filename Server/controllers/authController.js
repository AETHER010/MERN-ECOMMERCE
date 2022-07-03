const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//register a user

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "me/profile12",
      url: "https://exploringbits.com/wp-content/uploads/2021/12/anime-boy-pfp-2.jpg?ezimgfmt=rs:352x365/rscb3/ng:webp/ngcb3",
    },
  });

  sendToken(user, 200, res);
});

//login user => /api/v1/auth/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //1. check if email and password exist
  if (!email || !password) {
    return next(new ErrorHandler("please provide email and password", 400));
  }

  //2. check if user exists
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  //3. check if password is correct
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Email or Password is Invalid", 401));
  }

  //3. generate token and send to client
  sendToken(user, 200, res);
  // const token = user.getJwtToken();

  // res.status(200).json({
  //   success: true,
  //   token,
  //   user,
  // });
});

//forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("No user with this email", 404));
  }

  //get token
  const resetToken = user.getResetPasswordToken();

  //save token to user
  await user.save({ validateBeforeSave: false });

  //create reset password  url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  //send email to user
  const message = `your password reset token is as follows: ${resetUrl} \n\n if you have not send this request then ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Token sent to email : ${user.email}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler("Error sending the email", 500));
  }
});

//reset Password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //hash url token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Password reset token is invalid", 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  //setting new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

//Get current logged user detail => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//update/change password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select(`+password`);

  //previous password
  const isMatch = await user.comparePassword(req.body.oldPassword);
  if (!isMatch) {
    return next(new ErrorHandler("Previous Password is incorrect", 400));
  }
  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
});

//update logged in user => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  //update profile pic or avtar
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

//logout user => /api/v1/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged out",
  });
});

//ADMIN ROUTES
//get all user => /api/v1/admin/users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// get user details => /api/v1/admin/users/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findbyID(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exits with id : ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});
