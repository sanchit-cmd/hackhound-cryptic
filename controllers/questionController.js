const Question = require('../models/questionModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createQuestion = catchAsync(async (req, res, next) => {
  // Create question data object
  const questionData = {
    problem: req.body.problem,
    answer: req.body.answer.toLowerCase(),
    hint: req.body.hint,
    level: req.body.level
  };

  // Add image if uploaded
  if (req.file) {
    questionData.image = req.file.path;
  }

  // Create question
  const question = await Question.create(questionData);

  // Send response
  res.status(201).json({
    status: 'success',
    data: {
      question: {
        level: question.level,
        problem: question.problem,
        hint: question.hint,
        image: question.image
      }
    }
  });
});

exports.updateQuestion = catchAsync(async (req, res, next) => {
	const questionId = req.params.id;
	const updateData = { ...req.body };

	if (!updateData.problem && !req.file && !updateData.image) {
		return next(
			new AppError('A question must have either text or image', 400)
		);
	}

	if (req.file) {
		// Delete old image if exists
		const oldQuestion = await Question.findById(questionId);
		if (oldQuestion.image) {
			const publicId = oldQuestion.image.split('/').pop().split('.')[0];
			await cloudinary.uploader.destroy(`cryptic-hunt/${publicId}`);
		}

		updateData.image = req.file.path;
		if (!updateData.problem) {
			updateData.imageOnly = true;
		}
	}

	const question = await Question.findByIdAndUpdate(questionId, updateData, {
		new: true,
		runValidators: true,
	});

	if (!question) {
		return next(new AppError('No question found with that ID', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			question,
		},
	});
});
