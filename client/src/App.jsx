import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { apiClient } from './services/api';
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
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await apiClient.get('/api/v1/users/isLoggedIn');
      setIsAuthenticated(response.data.isLoggedIn);
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated === null) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route 
          path="/auth/callback" 
          element={
            <Login />
          } 
        />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
          <Route path="/" element={<Home />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
        <Route path="/admin/question" element={<AdminQuestion />} />
      </Routes>
    </Router>
  );
}

export default App;
