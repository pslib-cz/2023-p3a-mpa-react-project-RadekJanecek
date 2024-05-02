import { useContext, useEffect, useState} from 'react';
import { Context } from '../providers/ContextProvider';

export const Bot = ({botId}: {botId: number}) => {
  const context = useContext(Context);
  const [botHasPlayed, setBotHasPlayed] = useState(false);

  useEffect(() => {
    if (context.state.selectedCards.length > 0 && !botHasPlayed) {
      const lastCenterCardId = context.state.centerCards[context.state.centerCards.length - 1][0].id;
      let closestCard = context.state.players[botId].cards[0];
      let smallestDifference = Math.abs(closestCard.id - lastCenterCardId);

      context.state.players[botId].cards.forEach(card => {
        const difference = Math.abs(card.id - lastCenterCardId);
        if (difference < smallestDifference) {
          smallestDifference = difference;
          closestCard = card;
        }
      });

      context.dispatch({ type: 'PLAY_CARD', playerId: botId, cardId: closestCard.id, selectedRowIndex: 0 });
      console.log(context.state.selectedCards);
      setBotHasPlayed(true);
    }
  }, [context.state.players[0].cards]);

  return (
    <></>
  );
}

export default Bot;