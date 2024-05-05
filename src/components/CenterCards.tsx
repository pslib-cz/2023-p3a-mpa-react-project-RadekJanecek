import { useContext } from 'react';
import { Context } from '../providers/ContextProvider.tsx';
import Card from './Card.tsx';
import styles from './CenterCards.module.css';

export const CenterCards = () => {
    const context = useContext(Context);
    const centerCards = context.state.centerCards;
    const player = context.state.players.find(player => player.id === 0);
    const selectedCard = context.state.selectedCards[0];

    const isSmallerThanAllRows = selectedCard && centerCards.every(row => row && row.length > 0 && selectedCard.id < row[row.length - 1].id);

    const handleRowClick = (rowIndex: number) => {
      if (isSmallerThanAllRows && player && selectedCard) {
          context.dispatch({ type: 'SELECT_ROW', playerId: player.id, cardId: selectedCard.id, rowIndex });
      }
    };

    return (
        <div className={styles["rows"]}>
          {centerCards.map((cards, index) => (
            <div key={index} className={styles["row"]}>
            {cards.map((card) => (
                card ? <Card key={card.id} card={card} /> : null
            ))}
            {
              context.state.showArrows && player && (
                <div className={styles["arrow"]} onClick={() => handleRowClick(index)}></div>
              )
            }
          </div>
        ))}
        </div>
    );
};

export default CenterCards;