import React from 'react';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
	const dummyData = [
		{ rank: 1, team: 'Crypto Kings', points: 500, level: 5 },
		{ rank: 2, team: 'Puzzle Masters', points: 400, level: 4 },
		{ rank: 3, team: 'Code Breakers', points: 300, level: 3 },
	];

	return (
		<div className='leaderboard-container'>
			<h1 className='leaderboard-title'>Leaderboard</h1>
			<table className='leaderboard-table'>
				<thead>
					<tr>
						<th>Rank</th>
						<th>Team</th>
						<th>Points</th>
						<th>Level</th>
					</tr>
				</thead>
				<tbody>
					{dummyData.map(team => (
						<tr key={team.rank}>
							<td>{team.rank}</td>
							<td>{team.team}</td>
							<td>{team.points}</td>
							<td>{team.level}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Leaderboard;
