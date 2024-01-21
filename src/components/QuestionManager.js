import React, { useState, useEffect } from 'react';
import ActionButton from './ActionButton';
import styles from './QuestionManager.module.css'

// Handles showing quiz questions and after confirming the answer, the question result.
const QuestionManager = ({
  quizQuestions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  furthestQuestionReached,
  setFurthestQuestionReached,
  userAnswers,
  setUserAnswers,
  handleFinishQuiz
}) => {
  const [revealAnswer, setRevealAnswer] = useState(false)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [isQuizFinished, setIsQuizFinished] = useState(false)

  // Check if user has confirmed their answer, if yes then check if 
  // their answer was correct and reveal results for the question.
  useEffect(() => {
    const alreadyAnswered = userAnswers[currentQuestionIndex].confirmed;
    if (alreadyAnswered) {
      setIsAnswerCorrect(userAnswers[currentQuestionIndex].answer === 
        quizQuestions[currentQuestionIndex].correctAnswer);
    }
    setRevealAnswer(alreadyAnswered);
  }, [quizQuestions, currentQuestionIndex, userAnswers]);

  // Update answers array when user selects some answer
  const handleAnswerChange = (answer, index) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = { ...newAnswers[index], answer };
    setUserAnswers(newAnswers);
  };

  // When user confirms answer, check if correct answer, reveal result, 
  // update answers array and check if this was the last question.
  const handleConfirmAnswer = () => {
    const isCorrect = userAnswers[currentQuestionIndex].answer === 
      quizQuestions[currentQuestionIndex].correctAnswer;
    setIsAnswerCorrect(isCorrect);

    setRevealAnswer(true);
  
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex].confirmed = true;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex + 1 >= quizQuestions.length) {
      setIsQuizFinished(true)
    };
  };

  // Handle click on "Next question" button.
  const handleNextQuestion = () => {
    setRevealAnswer(false);
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < quizQuestions.length) { // Ensure that there are more questions.
      setCurrentQuestionIndex(nextQuestionIndex);

      // If this was newly answered question and user wasn't just navigating
      // from older questions, update FurthestQuestionReached.
      if (nextQuestionIndex > furthestQuestionReached) {
        setFurthestQuestionReached(nextQuestionIndex);
      }
    }
  };
  
  // Func for logic to decide the styling for checkbox given the answer option.
  const getCheckboxClass = (answer) => {
    // During the answering phase show checkbox always as choosable.
    if (!revealAnswer) return styles.defaultCheckbox;

    // In question results phase:
    // If user chose this answer apply correct or wrong answer styling.
    if (userAnswers[currentQuestionIndex].answer === answer) {
      return isAnswerCorrect ? styles.correctCheckbox : styles.wrongCheckbox;
    }
    // If user didn't pick this answer, but it was correct, add a correct answer styling.
    return answer === quizQuestions[currentQuestionIndex].correctAnswer ? 
      styles.correctCheckbox : styles.defaultCheckbox;
  };

  // To show the result text next to user chosen answer on question result phase.
  const getFeedbackText = (answer) => {
    return revealAnswer && answer === userAnswers[currentQuestionIndex].answer
      ? <><span>&nbsp;</span>- {isAnswerCorrect ? 
        'Vastasid õigesti!' : 'Vale vastus!'}</>
      : '';
  };

  return (
    <div className={styles.container}>
      <h1>KÜSIMUS 0{currentQuestionIndex+1}</h1>
      <div className={styles.question}>
        {quizQuestions[currentQuestionIndex].question}
      </div>
      <div className={styles.optionsWrapper}>
        {quizQuestions[currentQuestionIndex].answerOptions.map(
          (answer, answerIndex) => (
            <label
              key={answerIndex}
              style={{ cursor: revealAnswer ||                // Show pointer cursor over answer label
                userAnswers[currentQuestionIndex].answer ===  // except when question results are shown or 
                  answer ? 'default' : 'pointer' }}           // this answer already selected.
            >
              <input
                className={getCheckboxClass(answer)}
                type='checkbox'
                name='answer'
                value={answer}
                checked={userAnswers[currentQuestionIndex].answer === answer}
                onChange={() => handleAnswerChange(answer, currentQuestionIndex)}
                disabled={revealAnswer}
              />
              {answer}
              {getFeedbackText(answer)}
            </label>
        ))}
      </div>
      <ActionButton 
        text={isQuizFinished ? 'Vaata tulemusi' : 
          (revealAnswer ? 'Järgmine küsimus' : 'Kinnita vastus')}
        inactive={userAnswers[currentQuestionIndex].answer === null} 
        onClick={isQuizFinished ? handleFinishQuiz : 
          (revealAnswer ? handleNextQuestion : handleConfirmAnswer)}
      />
    </div>
  );
};

export default QuestionManager;