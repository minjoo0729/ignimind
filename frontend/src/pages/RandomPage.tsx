import React, { useState, useEffect } from 'react';
import api from '../api/axios';

interface Quote {
  id: number;
  content: string;
  author: string | null;
  createdAt: string;
}

const RandomPage: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);

  const fetchRandom = async () => {
    try {
      const res = await api.get<Quote>('/quotes/random');
      setQuote(res.data);
    } catch {
      alert('Failed to fetch random quote');
    }
  };

  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <h2 className="text-3xl mb-6 text-teal-700">Random Quote</h2>
      {quote ? (
        <div className="max-w-lg text-center">
          <p className="text-xl mb-4">“{quote.content}”</p>
          <p className="text-sm text-gray-600 mb-6">{quote.author}</p>
          <button
            onClick={fetchRandom}
            className="px-6 py-2 bg-teal-500 hover:bg-teal-700 text-white rounded"
          >
            Reload
          </button>
        </div>
      ) : (
        <p>Loading…</p>
      )}
    </div>
);
};

export default RandomPage;
