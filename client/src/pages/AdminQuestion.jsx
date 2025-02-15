import { useState } from 'react';
import axios from 'axios';

const AdminQuestion = () => {
	const [formData, setFormData] = useState({
		problem: '',
		answer: '',
		hint: '',
		level: '',
	});
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleImageChange = e => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess('');

		try {
			const form = new FormData();
			Object.keys(formData).forEach(key => {
				form.append(key, formData[key]);
			});
			if (image) {
				form.append('image', image);
			}

			const response = await axios.post('/api/v1/questions', form, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			setSuccess('Question created successfully!');
			setFormData({
				problem: '',
				answer: '',
				hint: '',
				level: '',
			});
			setImage(null);
		} catch (err) {
			setError(err.response?.data?.message || 'Something went wrong!');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
			<div className='relative py-3 sm:max-w-xl sm:mx-auto'>
				<div className='relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10'>
					<div className='max-w-md mx-auto'>
						<div className='divide-y divide-gray-200'>
							<div className='py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
								<h2 className='text-2xl font-bold mb-8 text-center'>
									Add New Question
								</h2>
								{error && (
									<div className='text-red-500 text-sm mb-4'>
										{error}
									</div>
								)}
								{success && (
									<div className='text-green-500 text-sm mb-4'>
										{success}
									</div>
								)}

								<form
									onSubmit={handleSubmit}
									className='space-y-4'
								>
									<div>
										<label className='block text-sm font-medium text-gray-700'>
											Problem
										</label>
										<textarea
											name='problem'
											value={formData.problem}
											onChange={handleChange}
											className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
											rows='3'
										/>
									</div>

									<div>
										<label className='block text-sm font-medium text-gray-700'>
											Answer
										</label>
										<input
											type='text'
											name='answer'
											value={formData.answer}
											onChange={handleChange}
											className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
											required
										/>
									</div>

									<div>
										<label className='block text-sm font-medium text-gray-700'>
											Hint
										</label>
										<input
											type='text'
											name='hint'
											value={formData.hint}
											onChange={handleChange}
											className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
											required
										/>
									</div>

									<div>
										<label className='block text-sm font-medium text-gray-700'>
											Level
										</label>
										<input
											type='number'
											name='level'
											value={formData.level}
											onChange={handleChange}
											className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
											required
										/>
									</div>

									<div>
										<label className='block text-sm font-medium text-gray-700'>
											Image
										</label>
										<input
											type='file'
											onChange={handleImageChange}
											accept='image/*'
											className='mt-1 block w-full'
										/>
									</div>

									<button
										type='submit'
										disabled={loading}
										className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400'
									>
										{loading
											? 'Creating...'
											: 'Create Question'}
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminQuestion;
