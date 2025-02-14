const util = require('util');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// 3. Auth middleware for protected routes
exports.protect = catchAsync(async (req, res, next) => {
	if (!req.isAuthenticated()) {
		throw new AppError('Please login to access!', 400);
	}
	next();
});

// 3A. Auth middleware to check if user is logged in
exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		res.locals.user = req.user;
	}
	next();
};

// 4. Auth middleware for user roles
exports.restrictTo = (...roles) => {
	return catchAsync(async (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			throw new AppError(
				'You do not have permission to perform this action.',
				403
			);
		}
		next();
	});
};

// 5. Logout users
exports.logout = (req, res) => {
	req.logout();
	res.redirect('/login');
};
