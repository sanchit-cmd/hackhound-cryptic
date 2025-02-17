import React, { useState, useEffect } from 'react';
import api, { apiClient } from '../services/api';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
    // Update leaderboard every 30 seconds
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await apiClient.get(api.getLeaderboard);
      setLeaderboard(response.data.users);
    } catch (err) {
      console.error('Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='leaderboard-container'>
      <h1 className='leaderboard-title'>Leaderboard</h1>
      <table className='leaderboard-table'>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={player._id}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
