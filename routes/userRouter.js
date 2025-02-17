const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');

const router = express.Router();
const frontend_url = process.env.FRONTEND_URL || 'http://localhost:5173';

// Google OAuth routes
router.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/login',
		successRedirect: '/play',
	})
);

router.route('/logout').get(userController.logout);
router.get('/isLoggedIn', userController.isLoggedInUser);

module.exports = router;
