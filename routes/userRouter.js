const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');

const router = express.Router();

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

module.exports = router;
