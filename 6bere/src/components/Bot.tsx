import { useContext, useEffect, useState} from 'react';
import { Context } from '../providers/ContextProvider';

export const Bot = ({botId}: {botId: number}) => {
  const context = useContext(Context);
  const [botHasPlayed, setBotHasPlayed] = useState(false);

  useEffect(() => {
    setBotHasPlayed(false);
    if (context.state.players[botId].cards.length > 0 && !botHasPlayed) {
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

      const isSmallerThanAllRows = context.state.centerCards.every(row => closestCard.id < row[row.length - 1].id);
      let selectedRowIndex = 0;

      if (isSmallerThanAllRows) {
        let minLives = Infinity;
        context.state.centerCards.forEach((row, index) => {
          const totalLives = row.reduce((sum, card) => sum + card.lives, 0);
          if (totalLives < minLives) {
            minLives = totalLives;
            selectedRowIndex = index;
            context.dispatch({ type: 'PLAY_CARD', playerId: botId, cardId: closestCard.id, selectedRowIndex });
            context.dispatch({ type: 'SELECT_ROW', playerId: botId, cardId: closestCard.id, rowIndex: selectedRowIndex })
          }
        });
      }
      else {
        context.dispatch({ type: 'PLAY_CARD', playerId: botId, cardId: closestCard.id, selectedRowIndex: 0});
      }
      console.log(context.state.selectedCards);
      setBotHasPlayed(true);
    }
  }, [context.state.players[0].cards.length > 0]);

  return (
    <></>
  );
}

export default Bot;