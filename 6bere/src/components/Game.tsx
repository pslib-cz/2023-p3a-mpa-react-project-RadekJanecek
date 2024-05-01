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

  const botIds = context.state.players.map((player, index) => index).slice(1);
  
  return (
    <div>
      <h1>Game</h1>
      <div>
        <CenterCards />
        <PlayerCards />
        <Link to="/">Zpět</Link>
        {botIds.map(botId => <Bot key={botId} botId={botId} />)}
      </div>
    </div>
  );
}

export default Game;