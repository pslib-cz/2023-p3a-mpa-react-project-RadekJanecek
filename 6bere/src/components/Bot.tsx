import { useContext, useEffect} from 'react';
import { Context } from '../providers/ContextProvider';

export const Bot = () => {
  const context = useContext(Context);

  useEffect(() => {
    if (context.state.selectedCards.length > 1) {
        const botCard = context.state.players[1].cards[0];
        context.dispatch({ type: 'PLAY_CARD', playerId: 1, cardId: botCard.id, selectedRowIndex: 0 });
        console.log(context.state.selectedCards);
      }
    }, [context.state.players[0].cards]);

  return (
    <></>
  );
}

export default Bot;