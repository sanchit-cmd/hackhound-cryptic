import React from 'react';
import '../styles/Home.css';

function Home() {
	return (
		<div className='home-container'>
			<div className='question-container'>
				<h2 className='question-title'>Current Question</h2>
				<p>Question text goes here...</p>
				<form className='answer-form'>
					<input
						type='text'
						className='answer-input'
						placeholder='Enter your answer'
					/>
					<button type='submit' className='submit-button'>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default Home;
