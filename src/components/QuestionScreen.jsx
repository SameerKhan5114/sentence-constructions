import React, { useEffect, useState, useRef } from 'react';

const QuestionScreen = ({ question, onNext, onQuit, currentQuestionIndex, questions }) => {
  const [timer, setTimer] = useState(30);
  const blanksCount = (question.question.match(/_____________/g) || []).length;

  const [selectedWords, setSelectedWords] = useState(Array(blanksCount).fill(null));
  const [availableOptions, setAvailableOptions] = useState([...question.options]);
  const hasSubmitted = useRef(false); // 🔐 prevent double calls to onNext

  useEffect(() => {
    setTimer(30);
    setSelectedWords(Array(blanksCount).fill(null));
    setAvailableOptions([...question.options]);
    hasSubmitted.current = false;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          if (!hasSubmitted.current) {
            hasSubmitted.current = true;
            onNext(selectedWords); // ⏱ auto-submit on timeout
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [question]);

  const handleSelect = (word) => {
    const index = selectedWords.findIndex((w) => w === null);
    if (index === -1) return;

    const updatedSelected = [...selectedWords];
    updatedSelected[index] = word;
    setSelectedWords(updatedSelected);

    const updatedOptions = availableOptions.filter((opt) => opt !== word);
    setAvailableOptions(updatedOptions);
  };

  const handleUnselect = (index) => {
    const word = selectedWords[index];
    if (!word) return;

    const updatedSelected = [...selectedWords];
    updatedSelected[index] = null;
    setSelectedWords(updatedSelected);

    setAvailableOptions([...availableOptions, word]);
  };

  const renderSentence = () => {
    const parts = question.question.split('_____________');
    const elements = [];

    for (let i = 0; i < parts.length; i++) {
      elements.push(<span key={`text-${i}`}>{parts[i]}</span>);

      if (i < parts.length - 1) {
        elements.push(
          <span
            key={`blank-${i}`}
            onClick={() => handleUnselect(i)}
            className="inline-block min-w-[100px] px-2 py-1 border-b border-gray-700 mx-1 cursor-pointer text-center text-blue-700 font-medium"
          >
            {selectedWords[i] || ''}
          </span>
        );
      }
    }

    return elements;
  };

  const allFilled = selectedWords.every(word => word !== null);

  const handleManualNext = () => {
    if (allFilled && !hasSubmitted.current) {
      hasSubmitted.current = true;
      onNext(selectedWords);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold text-gray-700">⏱ {timer}s</div>
        <button onClick={onQuit} className="text-red-600 hover:underline font-medium">
          Quit
        </button>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-1 mb-6">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${
              index <= currentQuestionIndex ? 'bg-yellow-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <p className="text-center font-medium text-gray-700 mb-6">
        Select the missing words in the correct order
      </p>

      {/* Sentence with Blanks */}
      <div className="text-lg leading-relaxed text-center mb-8">
        {renderSentence()}
      </div>

      {/* Word Options */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {availableOptions.map((word, index) => (
          <button
            key={index}
            onClick={() => handleSelect(word)}
            className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          onClick={handleManualNext}
          disabled={!allFilled}
          className="bg-indigo-600 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionScreen;
