import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { apiClient } from '../services/api';
import '../styles/Home.css';

function Home() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await apiClient.get(api.getQuestion);
      setQuestion(response.data.question);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post(api.submitAnswer, { answer });
      setAnswer('');
      fetchQuestion();
    } catch (err) {
      setError('Incorrect answer! Try again.');
    }
  };

  return (
    <div className='home-container'>
      {question && (
        <div className='question-container'>
          <h2 className='question-title'>Level {question.level}</h2>
          <p>{question.problem}</p>
          {question.image && (
            <img src={question.image} alt="Question hint" className="question-image" />
          )}
          <form className='answer-form' onSubmit={handleSubmit}>
            <input
              type='text'
              className='answer-input'
              placeholder='Enter your answer'
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button type='submit' className='submit-button'>
              Submit
            </button>
          </form>
          {error && <div className="error-message">{error}</div>}
        </div>
      )}
    </div>
  );
}

export default Home;
