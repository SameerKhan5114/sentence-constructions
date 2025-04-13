// import React from 'react';

// const ResultScreen = ({ userAnswers, onRestart }) => {
//   const correct = userAnswers.filter(ans => ans.isCorrect).length;
//   const incorrect = userAnswers.length - correct;
//   const percentage = Math.round((correct / userAnswers.length) * 100);

//   return (
//     <div className="p-6 max-w-4xl mx-auto text-center">
//       <div className="mb-6">
//         <div className="text-5xl font-bold text-green-600">{percentage}</div>
//         <div className="text-lg font-semibold text-gray-700">Overall Score</div>
//         <p className="text-sm text-gray-500 mt-2">
//           You got {correct} correct and {incorrect} incorrect out of {userAnswers.length} questions.
//         </p>
//       </div>

//       <button
//         onClick={onRestart}
//         className="px-6 py-2 bg-indigo-600 text-white rounded shadow mb-8"
//       >
//         Go to Dashboard
//       </button>

//       <div className="space-y-6">
//         {userAnswers.map((answer, idx) => (
//           <div
//             key={idx}
//             className={`p-4 rounded border ${
//               answer.isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
//             }`}
//           >
//             <p className="font-semibold text-left mb-2">Prompt:</p>
//             <p className="text-gray-800 text-left mb-2">{answer.prompt}</p>

//             <p className="text-left">
//               <span className="font-medium">Your response: </span>
//               <span className={answer.isCorrect ? 'text-green-600' : 'text-red-600'}>
//                 {answer.userAnswer}
//               </span>
//             </p>

//             {!answer.isCorrect && (
//               <p className="text-left">
//                 <span className="font-medium">Correct answer: </span>
//                 <span className="text-green-700">{answer.correctAnswer}</span>
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ResultScreen;
import React from 'react';

const ResultScreen = ({ userAnswers, onRestart }) => {
  const correct = userAnswers.filter(ans => ans.isCorrect).length;
  const incorrect = userAnswers.length - correct;
  const percentage = Math.round((correct / userAnswers.length) * 100);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Score Summary */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-2">
          <span className="text-3xl font-bold text-green-600">{percentage}</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Overall Score</h2>
        <p className="text-sm text-gray-500 text-center mt-2 max-w-md">
          While you correctly formed several sentences, there are a couple of areas where improvement is needed. Pay close attention to sentence structure and word placement to ensure clarity and correctness. Review your responses below for more details.
        </p>
      </div>

      {/* Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={onRestart}
          className="px-6 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition"
        >
          Go to Dashboard
        </button>
      </div>

      {/* Answer Review */}
      <div className="space-y-6">
        {userAnswers.map((answer, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-xl shadow-sm border ${
              answer.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}
          >
            <p className="text-xs font-semibold text-gray-500 mb-1">Prompt</p>
            <p className="text-gray-800 mb-4">{answer.prompt}</p>

            <p className="text-sm mb-2">
              <span className="font-medium text-gray-700">Your response: </span>
              <span className={answer.isCorrect ? 'text-green-700' : 'text-red-600'}>
                {answer.userAnswer}
              </span>
            </p>

            {!answer.isCorrect && (
              <p className="text-sm">
                <span className="font-medium text-gray-700">Correct answer: </span>
                <span className="text-green-700">{answer.correctAnswer}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultScreen;
