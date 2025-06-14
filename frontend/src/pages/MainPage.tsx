import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const MainPage: React.FC = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-6 text-teal-700">Ignimind</h1>
      <p className="mb-8 text-center text-gray-700 max-w-md">
        설명...
      </p>
      <div className="space-x-4">
        {token ? (
          <>
            <Link
              to="/upload"
              className="px-4 py-2 bg-teal-500 hover:bg-teal-700 text-white rounded"
            >
              Quote Upload
            </Link>
            <Link
              to="/random"
              className="px-4 py-2 bg-teal-500 hover:bg-teal-700 text-white rounded"
            >
              Random Quote
            </Link>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="px-4 py-2 bg-teal-500 hover:bg-teal-700 text-white rounded"
          >
            Login / Signup
          </Link>
        )}
      </div>
    </div>
);
};

export default MainPage;
