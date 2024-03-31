import { Link } from 'react-router-dom';
import styles from './Game.module.css';
import { useContext } from 'react';
import { Context } from '../providers/ContextProvider.tsx';

export const Game = () => {
  const context = useContext(Context);
  return (
    <div>
      <h1>Game</h1>
      <div>
        <button onClick={() => {context.dispatch({type: 'DEAL_CARDS'}); console.log(context)}}>Deal cards</button>
        <button onClick={() => {context.dispatch({type: 'ADD_BOT'}); console.log(context)}}>Add bot</button>
        <button onClick={() => {context.dispatch({type: 'REMOVE_BOT'}); console.log(context)}}>Remove bot</button>
        <button onClick={() => {context.dispatch({type: 'PLAY_CARD', playerId: 1, cardId: 1}); console.log(context)}}>Play card</button>
        <pre>{JSON.stringify(context.state.players, null, 2)}</pre>
        <Link to="/">Zpět</Link>
      </div>
    </div>
  );
}

export default Game;