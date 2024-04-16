import { Link } from 'react-router-dom';
import styles from './Game.module.css';
import { useContext} from 'react';
import { Context } from '../providers/ContextProvider.tsx';
import Card from './Card.tsx';

export const Game = () => {
  const context = useContext(Context);
  const player = context.state.players.find(player => player.id === 1);
  return (
    <div>
      <h1>Game</h1>
      <div>
        <button onClick={() => {context.dispatch({type: 'DEAL_CARDS'}); console.log(context)}}>Deal cards</button>
        <div className={styles["cards"]}>
          {player && player.cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
        <Link to="/">Zpět</Link>
      </div>
    </div>
  );
}

export default Game;