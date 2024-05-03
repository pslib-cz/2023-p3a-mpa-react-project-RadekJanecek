import { Link } from 'react-router-dom';
import { useContext, useEffect} from 'react';
import { Context } from '../providers/ContextProvider.tsx';
import { PlayerCards } from './PlayerCards.tsx';
import { CenterCards } from './CenterCards.tsx';
import { Bot } from './Bot.tsx';
import { cards } from '../data/cards.ts';

export const Game = () => {
  const context = useContext(Context);

  useEffect(() => {
    if (context.state.players[0].cards.length === 0 && context.state.selectedCards.length === 0) {
      context.state.deck = cards;
      context.dispatch({ type: 'DEAL_CARDS' });
    }
  }, [context.state.players[0].cards]);
  useEffect(() => {
    if (context.state.selectedCards.length === context.state.players.length) {
      context.dispatch({ type: 'PLAY_CARD', playerId: context.state.selectedCards[0].playerId ?? 0, cardId: context.state.selectedCards[0].id, selectedRowIndex: 0 });
    }
  }, [context.state.selectedCards]);
  
  return (
    <div>
      <h1>Game</h1>
      <div>
        <CenterCards />
        <PlayerCards />
        <Link to="/">Zpět</Link>
        <Bot botId={1} />
      </div>
    </div>
  );
}

export default Game;