import { useContext } from 'react';
import React from 'react';
import { CardType, Context } from '../providers/ContextProvider';
import styles from './Card.module.css';

type CardProps = {
  card: CardType;
};

export const Card: React.FC<CardProps> = ({ card }) => {
  const context = useContext(Context);

  const playCard = () => {
    const selectedCard = context.state.selectedCards[0];
    if (!context.state.showArrows || (selectedCard && selectedCard.id === card.id)) {
      context.dispatch({type: 'PLAY_CARD', playerId: 1, cardId: card.id, selectedRowIndex: 0});
    }
  };

  return (
    <div className={styles.card} style={{backgroundPosition: card.position}} onClick={playCard}></div>
  );
};

export default Card;