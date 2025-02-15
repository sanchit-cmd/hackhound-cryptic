const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
	problem: {
		type: String,
		required: function () {
			return !this.imageOnly;
		},
	},
	answer: {
		type: String,
		required: [true, 'Please provide the answer!'],
		lowercase: true,
		select: false,
	},
	hint: {
		type: String,
		required: [true, 'Please provide user hint!'],
	},
	level: {
		type: Number,
		min: 0,
		unique: true,
		required: [true, 'Please provide level number!'],
	},
	image: {
		type: String,
		required: function () {
			return this.imageOnly;
		},
	},
	imageOnly: {
		type: Boolean,
		default: false,
	},
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
