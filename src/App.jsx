import React, { useEffect, useState } from 'react';
import IntroScreen from './components/IntroScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  const [screen, setScreen] = useState('intro');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    fetch('/data/questions.json')
      .then(res => res.json())
      .then(data => {
        setQuestions(data.data.questions);
      })
      .catch(err => console.error('Failed to load questions:', err));
  }, []);

  const handleStart = () => {
    setScreen('quiz');
    setCurrentIndex(0);
    setUserAnswers([]); // Reset answers
  };

  const handleNext = (selectedWords) => {
    if (!Array.isArray(selectedWords)) {
      console.error('Invalid answer:', selectedWords);
      return;
    }

    const joinedUserAnswer = selectedWords.join(' ');
    const currentQ = questions[currentIndex];

    const correctAnswerStr = Array.isArray(currentQ.correctAnswer)
      ? currentQ.correctAnswer.join(' ')
      : currentQ.correctAnswer;

    const isCorrect = joinedUserAnswer.trim().toLowerCase() === correctAnswerStr.trim().toLowerCase();

    const newAnswer = {
      questionId: currentQ.questionId,
      prompt: currentQ.question,
      correctAnswer: correctAnswerStr,
      userAnswer: joinedUserAnswer,
      isCorrect
    };

    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setScreen('result');
    }
  };

  const handleQuit = () => {
    setScreen('intro');
  };

  return (
    <>
      {screen === 'intro' && <IntroScreen onStart={handleStart} />}
      {screen === 'quiz' && questions.length > 0 && (
        <QuestionScreen
          question={questions[currentIndex]}
          onNext={handleNext}
          onQuit={handleQuit}
          currentQuestionIndex={currentIndex}
          questions={questions}
        />
      )}
      {screen === 'result' && (
        <ResultScreen userAnswers={userAnswers} onRestart={handleStart} />
      )}
    </>
  );
}

export default App;
