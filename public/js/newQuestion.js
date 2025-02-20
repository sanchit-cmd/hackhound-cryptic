document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('questionForm');
	const fileInput = document.getElementById('image');
	const fileText = document.querySelector('.file-input-text');

	if (fileInput) {
		fileInput.addEventListener('change', () => {
			fileText.textContent =
				fileInput.files[0]?.name || 'Choose an image...';
		});
	}

	form.addEventListener('submit', async e => {
		e.preventDefault();
		const button = form.querySelector('.admin-button');
		button.disabled = true;
		button.textContent = 'Creating...';

		try {
			const formData = new FormData();
			formData.append('problem', form.problem.value);
			formData.append('answer', form.answer.value.toLowerCase());
			formData.append('hint', form.hint.value);
			formData.append('level', form.level.value);

			if (fileInput.files[0]) {
				formData.append('image', fileInput.files[0]);
			}

			const response = await fetch('/api/v1/questions', {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();

			if (data.status === 'success') {
				showMessage('success', 'Question created successfully!');
				form.reset();
				fileText.textContent = 'Choose an image...';
			} else {
				showMessage(
					'error',
					data.message || 'Failed to create question'
				);
			}
		} catch (err) {
			showMessage('error', 'Something went wrong. Please try again.');
		} finally {
			button.disabled = false;
			button.textContent = 'Add Question';
		}
	});

	function showMessage(type, text) {
		const existingMessage = document.querySelector('.message');
		if (existingMessage) existingMessage.remove();

		const message = document.createElement('div');
		message.className = `message ${type}-message`;
		message.textContent = text;
		form.insertAdjacentElement('beforebegin', message);

		setTimeout(() => {
			message.style.opacity = '0';
			setTimeout(() => message.remove(), 300);
		}, 3000);
	}
});
