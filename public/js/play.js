document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('answerForm');
	const input = document.getElementById('answerInput');

	if (!form || !input) return;

	const showMessage = (type, text) => {
		const existingMessage = document.querySelector('.message');
		if (existingMessage) existingMessage.remove();

		const message = document.createElement('div');
		message.className = `message ${type}-message`;
		message.textContent = text;
		form.insertAdjacentElement('afterend', message);

		if (type === 'success') {
			setTimeout(() => {
				window.location.reload();
			}, 1500);
		}
	};

	form.addEventListener('submit', async e => {
		e.preventDefault();
		const button = form.querySelector('.game-button');
		button.classList.add('loading');
		button.disabled = true;

		try {
			const response = await fetch('/api/v1/play', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					answer: input.value.toLowerCase().trim(),
				}),
				credentials: 'include',
			});

			const data = await response.json();

			if (data.status === 'success') {
				showMessage(
					'success',
					data.message || 'Correct! Loading next level...'
				);
			} else {
				showMessage(
					'error',
					data.message || 'Incorrect answer. Try again!'
				);
				input.value = '';
				input.focus();
			}
		} catch (err) {
			showMessage('error', 'Something went wrong. Please try again.');
		} finally {
			button.classList.remove('loading');
			button.disabled = false;
		}
	});

	// Auto focus input on page load
	input.focus();
});
