import React, { useState } from 'react';
import styles from './QuizContainer.module.css';
import quizQuestions from '../data/quizQuestions.json';
import StartScreen from '../components/StartScreen';
import ProgressBar from '../components/ProgressBar';
import QuestionManager from '../components/QuestionManager';
import ResultsScreen from '../components/ResultsScreen';

// Handles app stages (start/quiz/results and questions navigation) and stores user's progress and answers.
const QuizContainer = () => {
  const [currentStage, setCurrentStage] = useState('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [furthestQuestionReached, setFurthestQuestionReached] = useState(-1); // -1 at start as no question has been shown yet.
  const [userAnswers, setUserAnswers] = useState(quizQuestions.map(() => ({
    answer: null,
    confirmed: false // For accounting the state of the answer in case user navigates away from question and then returns.
  })));

  const STAGES = {
    START: 'start',
    QUIZ: 'quiz',
    RESULTS: 'results',
  };

  const handleStartClick = () => {
    setCurrentStage(STAGES.QUIZ);
    setFurthestQuestionReached(0);
  };

  const handleFinishQuiz = () => {
    setCurrentStage(STAGES.RESULTS);
  }

  const handleRestart = () => {
    setCurrentStage(STAGES.START);
    setCurrentQuestionIndex(0);
    setFurthestQuestionReached(-1);
    setUserAnswers(quizQuestions.map(() => ({
      answer: null,
      confirmed: false
    })));
  }

  const handleProgressBarNavClick = (index) => {
    if (index <= furthestQuestionReached) {
      setCurrentQuestionIndex(index);
    }
  };

  return (
    <div className={styles.quizContainer}>
      {currentStage !== STAGES.RESULTS && 
        <ProgressBar
          quizQuestions={quizQuestions}
          currentQuestion={currentQuestionIndex}
          furthestQuestionReached={furthestQuestionReached}
          onSquareClick={handleProgressBarNavClick}
      />}
      {currentStage === STAGES.START && 
        <StartScreen onStartClick={handleStartClick} />}
      {currentStage === STAGES.QUIZ && 
        <QuestionManager
          quizQuestions={quizQuestions}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          furthestQuestionReached={furthestQuestionReached}
          setFurthestQuestionReached={setFurthestQuestionReached}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
          handleFinishQuiz={handleFinishQuiz}
      />}
      {currentStage === STAGES.RESULTS &&
        <ResultsScreen 
          quizQuestions={quizQuestions}
          userAnswers={userAnswers}
          handleRestart={handleRestart}/>}
    </div>
  );
};

export default QuizContainer;