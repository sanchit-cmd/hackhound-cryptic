const rateLimit = require('express-rate-limit');

// General limiter for all routes
const globalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000, // Limit each IP to 1000 requests per windowMs
	message: 'Too many requests from this IP, please try again later.',
	standardHeaders: true,
	legacyHeaders: false,
});

// Strict limiter for game submissions
const gameLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 50, // Limit each IP to 10 submissions per minute
	message: 'Too many answer attempts, please wait before trying again.',
	standardHeaders: true,
	legacyHeaders: false,
});

// Auth route limiter
const authLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 100, // Limit each IP to 50 auth requests per hour
	message: 'Too many authentication attempts, please try again later.',
	standardHeaders: true,
	legacyHeaders: false,
});

module.exports = { globalLimiter, gameLimiter, authLimiter };
