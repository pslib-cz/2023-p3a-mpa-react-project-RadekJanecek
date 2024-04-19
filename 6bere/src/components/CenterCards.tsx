import { useContext } from 'react';
import { Context } from '../providers/ContextProvider.tsx';
import Card from './Card.tsx';
import styles from './CenterCards.module.css';

export const CenterCards = () => {
    const context = useContext(Context);
    const centerCards = context.state.centerCards;
    const player = context.state.players.find(player => player.id === 1);
    const selectedCard = context.state.selectedCards[0];

    const isSmallerThanAllRows = selectedCard && centerCards.every(row => selectedCard.id < row[row.length - 1].id);

    const handleRowClick = (rowIndex: number) => {
      if (isSmallerThanAllRows && player) {
          context.dispatch({ type: 'SELECT_ROW', playerId: player.id, cardId: selectedCard.id, rowIndex });
      }
  };

    return (
        <div>
          {centerCards.map((cards, index) => (
            <div key={index} className={styles.flex}>
            {cards.map((card) => (
                <Card key={card.id} card={card} />
            ))}
            {
              context.state.showArrows && player && (
                <div className={styles.arrow} onClick={() => handleRowClick(index)}>
                  arrow
                </div>
              )
            }
          </div>
        ))}
        </div>
    );
};

export default CenterCards;