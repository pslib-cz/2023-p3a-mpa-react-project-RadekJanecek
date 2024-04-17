import React from 'react';
import { CardType } from '../providers/ContextProvider';
import styles from './Card.module.css';

type CardProps = {
  card: CardType;
};

const handleClick = () => {
  
};

export const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className={styles.card} style={{backgroundPosition: card.position}} onClick={handleClick}></div>
  );
};

export default Card;