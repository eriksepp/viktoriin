import React from 'react';
import styles from './ResultsScreen.module.css';
import resultMessages from '../data/resultMessages.json';
import ActionButton from './ActionButton';

// Handles showing quiz results in the end of the quiz.
const ResultsScreen = ({ quizQuestions, userAnswers, handleRestart }) => {
  const score = userAnswers.filter((answerData, index) => 
    answerData.answer === quizQuestions[index].correctAnswer).length;

  // To create a div for a question including the correct answer and if user 
  // answered wrong then to also show it with strike-through styling.
  const getAnswerDiv = (index, question) => {
    return (
      <div className={styles.answerWrapper}>
        {userAnswers[index].answer !== question.correctAnswer &&
        <div className={styles.wrongAnswer}>{userAnswers[index].answer}</div>}
        <div className={styles.correctAnswer}>{question.correctAnswer}</div>
      </div>
    )
  }
  
  return (
    <div className={styles.resultsContainer}>
      <h1>SINU TULEMUS ON {score}/{quizQuestions.length}</h1>
      <h3>{resultMessages[score]}</h3>
      <div className={styles.questionsContainer}>
        {quizQuestions.map((question, index) => (
          <div key={index} className={styles.questionWrapper}>
            <div className={styles.questionAnswerText}>
              <span>{question.question}</span>
              {getAnswerDiv(index, question)}
            </div>
            <div className={`${styles.checkBox}
                ${userAnswers[index].answer === question.correctAnswer ? 
                    styles.correctCheckbox : styles.wrongCheckbox}`}
            />
          </div>
        ))}
      </div>
      <ActionButton 
        text={'Tagasi algusesse'}
        onClick={handleRestart}
      />
    </div>
  );
};

export default ResultsScreen;