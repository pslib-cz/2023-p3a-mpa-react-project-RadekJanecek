import { useContext, useEffect} from 'react';
import { Context } from '../providers/ContextProvider';

export const Bot = () => {
  const context = useContext(Context);

  useEffect(() => {
    const botCard = context.state.players[0].cards[0];
      context.dispatch({ type: 'PLAY_CARD', playerId: 1, cardId: botCard.id, selectedRowIndex: 0 });
      console.log(context.state.selectedCards);
  }, [context.state.players[0].cards]);

  return (
    <></>
  );
}

export default Bot;