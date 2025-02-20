const express = require('express');
const userController = require('../controllers/userController');
const questionController = require('../controllers/questionController');
const { upload } = require('../config/cloudinary');

const router = express.Router();

router.post(
	'/',
	userController.protect,
	userController.restrictTo('admin'),
	upload.single('image'), // Add this middleware for image upload
	questionController.createQuestion
);

module.exports = router;
