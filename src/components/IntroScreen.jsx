import React from 'react';

const IntroScreen = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl font-bold">Sentence Construction</h1>
      <p className="text-gray-500">Select the correct words to complete the sentence by arranging the provided options in the right order.</p>
      <div className="border p-4 rounded-md flex gap-6">
        <div>Time Per Question: <strong>30 sec</strong></div>
        <div>Total Questions: <strong>10</strong></div>
        <div>Coins: <strong>🟡 0</strong></div>
      </div>
      <div className="flex gap-4">
        <button className="px-4 py-2 border rounded" disabled>Back</button>
        <button onClick={onStart} className="px-4 py-2 bg-indigo-600 text-white rounded">Start</button>
      </div>
    </div>
  );
};

export default IntroScreen;
