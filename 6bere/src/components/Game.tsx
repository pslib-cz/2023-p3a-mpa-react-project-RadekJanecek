import { Link } from 'react-router-dom';
import styles from './Game.module.css';

export const Game = () => {
  return (
    <div>
      <h1>Game</h1>
      <div>
        <Link to="/">Zpět</Link>
      </div>
    </div>
  );
}

export default Game;