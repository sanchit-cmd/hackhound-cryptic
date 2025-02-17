import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
const FRONTEND_URL = 'http://localhost:5173'; // Add frontend URL (assuming Vite's default port)

const api = {
	// Auth endpoints
	googleAuth: `${BASE_URL}/api/v1/users/auth/google?redirect_url=${FRONTEND_URL}`,
	googleCallback: `${BASE_URL}/api/v1/users/auth/google/callback?redirect_url=${FRONTEND_URL}`,
	checkAuth: `${BASE_URL}/api/v1/users/isLoggedIn`,
	logout: `${BASE_URL}/auth/logout`,

	// Game endpoints
	getQuestion: `${BASE_URL}/play`,
	submitAnswer: `${BASE_URL}/api/v1/game/submit`,
	getLeaderboard: `${BASE_URL}/leaderboard`,

	// Admin endpoints
	addQuestion: `${BASE_URL}/newQuestion`,
};

export const apiClient = axios.create({
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default api;
