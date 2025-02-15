import React from 'react';
import '../styles/Rules.css';

function Rules() {
	return (
		<div className='rules-container'>
			<h1 className='rules-title'>Game Rules</h1>
			<ul className='rules-list'>
				<li className='rule-item'>
					Rule 1: Answer format should be in lowercase without spaces.
				</li>
				<li className='rule-item'>
					Rule 2: Do not share answers with other participants.
				</li>
				<li className='rule-item'>
					Rule 3: Multiple attempts are allowed.
				</li>
			</ul>
		</div>
	);
}

export default Rules;
