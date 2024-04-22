import { Link } from 'react-router-dom';
import { useContext, useEffect} from 'react';
import { Context } from '../providers/ContextProvider.tsx';
import { PlayerCards } from './PlayerCards.tsx';
import { CenterCards } from './CenterCards.tsx';

export const Game = () => {
  const context = useContext(Context);

  useEffect(() => {
    context.dispatch({ type: 'DEAL_CARDS' });
  }, []);
  return (
    <div>
      <h1>Game</h1>
      <div>
        <CenterCards />
        <PlayerCards />
        <Link to="/">Zpět</Link>
      </div>
    </div>
  );
}

export default Game;