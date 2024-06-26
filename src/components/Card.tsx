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
      context.dispatch({type: 'SELECT_CARD', playerId: 0, cardId: card.id});
    }
  };

  return (
    <div className={styles.card} style={{backgroundImage: `url(${card.image})`}} onClick={playCard}></div>
  );
};

export default Card;