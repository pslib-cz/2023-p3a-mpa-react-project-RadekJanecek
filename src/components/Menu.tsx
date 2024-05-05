import { Link } from 'react-router-dom';
import styles from './Menu.module.css';
import { useContext } from 'react';
import { Context } from '../providers/ContextProvider';

export const Menu = () => {
  const context = useContext(Context);
  const handleNewGameClick = () => {
    context.dispatch({ type: 'RESET' });
    localStorage.removeItem('gameState');
    localStorage.removeItem('numBots');
  };
  const handleContinueClick = () => {
    const storedState = JSON.parse(localStorage.getItem('gameState') || '{}');
    context.dispatch({ type: 'LOAD_STATE', payload: storedState });
  };
  return (
    <>
      <div>
        <h1>6bere!</h1>
        <div className={styles["buttons"]}>
          <Link className={styles["button"]} to="/botselection" onClick={(handleNewGameClick)}>Nová hra</Link>
          <Link className={styles["button"]} to="/game" onClick={handleContinueClick}>Pokračovat</Link>
          <Link className={styles["button"]} to="/rules">Pravidla</Link>
        </div>
      </div>
    </>
  );
};

export default Menu;