import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Rules from './pages/Rules';
import Leaderboard from './pages/Leaderboard';
import Layout from './components/Layout';
import AdminQuestion from './pages/AdminQuestion';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/admin/question' element={<AdminQuestion />} />
				<Route element={<Layout />}>
					<Route path='/' element={<Home />} />
					<Route path='/rules' element={<Rules />} />
					<Route path='/leaderboard' element={<Leaderboard />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
