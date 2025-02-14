const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/api/v1/users/auth/google/callback',
			userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				// Check if user already exists
				let user = await User.findOne({ googleId: profile.id });

				if (!user) {
					// Create new user
					user = await User.create({
						username: profile.displayName,
						googleId: profile.id,
						email: profile.emails[0].value,
					});
				}

				done(null, user);
			} catch (err) {
				done(err);
			}
		}
	)
);
