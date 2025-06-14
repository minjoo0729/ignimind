import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const AuthPage: React.FC = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await api.post('/users/signup', { email, password });
        alert('Signup Successful! You can now log in.');
        setIsSignup(false);
      } else {
        const res = await api.post('/users/login', { email, password });
        login(res.data.access_token);
        navigate('/');
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-80"
      >
        <h2 className="text-2xl mb-6 text-center">
          {isSignup ? 'Sign Up' : 'Login'}
        </h2>
        <input
          type="email"
          placeholder="e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full mb-6 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-700 text-white py-2 rounded"
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isSignup ? 'Already have an account?' : 'No account?'}{' '}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-teal-500 hover:underline"
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </form>
    </div>
);
};

export default AuthPage;
