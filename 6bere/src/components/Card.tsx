import React from 'react';
import { CardType } from '../providers/ContextProvider';
import styles from './Card.module.css';

type CardProps = {
  card: CardType;
};

export const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className={styles.card} style={{backgroundPosition: card.position}}></div>
  );
};

export default Card;