document.addEventListener('DOMContentLoaded', () => {
  const leaderboardBody = document.getElementById('leaderboardBody');
  
  const updateLeaderboard = async () => {
    try {
      const response = await fetch('/api/v1/play/dashboard');
      const data = await response.json();
      
      if (data.status === 'success' && data.data.users) {
        const html = data.data.users.map((user, index) => `
          <tr class="${user._id === data.currentUser ? 'current-user' : ''}">
            <td class="rank-cell">
              <span class="rank">${index + 1}</span>
              ${index < 3 ? `<span class="trophy trophy-${index + 1}">🏆</span>` : ''}
            </td>
            <td class="name-cell">${user.username}</td>
            <td class="level-cell">${user.level}</td>
          </tr>
        `).join('');
        
        leaderboardBody.innerHTML = html;
      }
    } catch (err) {
      console.error('Failed to update leaderboard:', err);
    }
  };

  updateLeaderboard();
  setInterval(updateLeaderboard, 30000);
});
