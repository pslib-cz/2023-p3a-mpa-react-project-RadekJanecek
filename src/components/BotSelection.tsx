import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../providers/ContextProvider.tsx';
import styles from './BotSelection.module.css';
import Styles from './Styles.module.css';

export const BotSelection = () => {
  const context = useContext(Context);
  return (
    <>
      <h1>BotSelection</h1>
      <div className={styles["bots"]}>
        <button className={Styles["button"]} onClick={() => {context.dispatch({type: 'REMOVE_BOT'});}}>-</button>
        <p>{context.state.players.length -1}</p>
        <button className={Styles["button"]} onClick={() => {context.dispatch({type: 'ADD_BOT'});}}>+</button>
      </div>
      <div className={styles["buttons"]}>
        <Link className={Styles["button"]} to="/game">Start</Link>
        <Link className={Styles["button"]} to="/">Zpět</Link>
      </div>
    </>
  );
}

export default BotSelection;