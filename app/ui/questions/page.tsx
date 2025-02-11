import { useState } from 'react';
import Link from 'next/link';

// Placeholder for fetching question and answers (to be replaced with server-side fetching)
const getQuestion = async (id) => {
  return {
    id,
    text: `Sample question text for ${id}`,
    answers: [
      { id: 1, text: 'First answer', accepted: false },
      { id: 2, text: 'Accepted answer', accepted: true },
      { id: 3, text: 'Another answer', accepted: false },
    ],
  };
};

export default function QuestionPage({ params }) {
  const { id } = params;
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useState(() => {
    getQuestion(id).then((data) => {
      setQuestion(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{question.text}</h1>
      
      {/* Answer submission form */}
      <textarea className="w-full p-2 border rounded mb-2" placeholder="Write your answer..."></textarea>
      <button className="px-4 py-2 bg-blue-500 text-white rounded">Submit Answer</button>
      
      {/* Answers List */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Answers</h2>
        <ul className="mt-2">
          {[...question.answers].sort((a, b) => b.accepted - a.accepted).map((answer) => (
            <li key={answer.id} className="p-2 border rounded mb-2 flex justify-between items-center">
              <span>{answer.text}</span>
              {answer.accepted ? (
                <span className="text-green-500 font-bold">✔ Accepted</span>
              ) : (
                <button className="px-2 py-1 bg-gray-200 rounded">✔</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
