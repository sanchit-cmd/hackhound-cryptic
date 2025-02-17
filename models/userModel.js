const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: false,
	},
	googleId: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user',
	},
	level: {
		type: Number,
		default: 0,
	},
	lastSolved: {
		type: Date,
		default: Date.now(),
	},
});

const User = mongoose.model('User', userSchema);
module.exports = User;
