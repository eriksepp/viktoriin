import ActionButton from './ActionButton';
import styles from './StartScreen.module.css'

// To show introductory view at the start of the quiz. 
const StartScreen = ({ onStartClick }) => {
  return (
    <div className={styles.container}>
      <h1>VIKTORIIN</h1>
      <div className={styles.instructionsWrapper}>
        <p>Tere tulemast mängima viktoriini!</p>
        <p>Viktoriin koosneb viiest valikvastustega küsimusest ning vastamine võtab aega umbes 2 minutit.</p>
        <p>Peale vajutamist nupule "Kinnita vastus" enam vastust muuta ei saa.</p>
      </div>
      <ActionButton text='Alusta' onClick={onStartClick}/>
    </div>
  );
}

export default StartScreen;