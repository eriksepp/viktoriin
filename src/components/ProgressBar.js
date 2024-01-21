import styles from './ProgressBar.module.css';

// ProgressBar is shown during the start and quiz stage, with current and previous
// questions square shown as black to display the user's progress.
// ProgressBar can be used during quiz to navigate between current and previous questions.
const ProgressBar = ({
  quizQuestions, 
  currentQuestion, 
  furthestQuestionReached, 
  onSquareClick 
}) => {
  const totalSquares = quizQuestions.length;

  return (
      <div className={styles.progressBarContainer}>
        {[...Array(totalSquares)].map((_, index) => (
          <div
            key={index}
            className={
              styles.progressSquare +
              // Show square as black if user has reached it.
              (index <= furthestQuestionReached ?
                ` ${styles.progressSquareBlack}` : 
                ` ${styles.progressSquareWhite}`) +
              // Add pointer cursor and hover effect to black square except when
              // according question is displayed at the moment.
              (index <= furthestQuestionReached && index !== currentQuestion ? 
                ` ${styles.progressSquareClickable}` : '')
            }
            onClick={() => onSquareClick(index)}
            data-number={'0' + (index + 1)} // Use by CSS to show in content.
          >
          </div>
      ))}
      </div>
  );
}

export default ProgressBar;

