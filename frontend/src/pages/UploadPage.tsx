import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const UploadPage: React.FC = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (!token) navigate('/auth');
  }, [token, navigate]);

  const handleUpload = async () => {
    try {
      await api.post('/quotes', { content, author });
      alert('정상적으로 업로드되었습니다');
      setContent('');
      setAuthor('');
    } catch (err: any) {
      alert(err.response?.data?.message || '업로드 실패');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <h2 className="text-3xl mb-6 text-teal-700">Upload</h2>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Quote 내용"
        className="w-full max-w-lg h-32 p-2 border rounded mb-4"
      />
      <input
        value={author}
        onChange={e => setAuthor(e.target.value)}
        placeholder="Author (선택)"
        className="w-full max-w-lg p-2 border rounded mb-6"
      />
      <button
        onClick={handleUpload}
        className="px-6 py-2 bg-teal-500 hover:bg-teal-700 text-white rounded"
      >
        Upload
      </button>
    </div>
);
};

export default UploadPage;
