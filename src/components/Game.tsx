import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect} from 'react';
import { Context } from '../providers/ContextProvider.tsx';
import { PlayerCards } from './PlayerCards.tsx';
import { CenterCards } from './CenterCards.tsx';
import { Bot } from './Bot.tsx';
import styles from './Game.module.css';
import Styles from './Styles.module.css';

export const Game = () => {
  const context = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    context.dispatch({ type: 'CHECK_GAME_OVER' });
    if (context.state.gameOver) {
      navigate('/leaderboard')
    }
  }, [context.state.players[0].cards.length === 0 && context.state.selectedCards.length === 0]);
  useEffect(() => {
    if (context.state.players[0].cards.length === 0 && context.state.selectedCards.length === 0) {
      context.dispatch({ type: 'DEAL_CARDS' });
    }
  }, [context.state.players[0].cards]);
  useEffect(() => {
    if (context.state.selectedCards.length >= context.state.players.length) {
      context.dispatch({ type: 'PLAY_CARD', playerId: context.state.selectedCards[0].playerId ?? 0, cardId: context.state.selectedCards[0].id, selectedRowIndex: 0 });
    }
  }, [context.state.selectedCards]);
  
  const botIds = context.state.players.map((_, index) => index).slice(1);

  return (
    <div className={styles["board"]}>
      <div className={styles["players"]}>
      {context.state.players.map((player) => (
          <div className={styles["players__player"]}>
            <span>{player.name}</span>
            <span>lives: {player.lives}</span>
          </div>
        ))}
      </div>
        <CenterCards />
        <PlayerCards />
        <Link className={Styles["button"]} to="/">Zpět</Link>
        {botIds.map(botId => <Bot key={botId} botId={botId} />)}
    </div>
  );
}

export default Game;