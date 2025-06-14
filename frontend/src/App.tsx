import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import UploadPage from './pages/UploadPage';
import RandomPage from './pages/RandomPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/random" element={<RandomPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
