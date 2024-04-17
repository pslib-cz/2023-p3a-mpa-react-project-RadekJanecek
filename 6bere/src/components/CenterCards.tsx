import { useContext } from 'react';
import { Context } from '../providers/ContextProvider.tsx';
import Card from './Card.tsx';
import styles from './CenterCards.module.css';

export const CenterCards = () => {
    const context = useContext(Context);
    const centerCards = context.state.centerCards;
    return (
        <div>
          {centerCards.map((cards, index) => (
            <div key={index} className={styles.flex}>
            {cards.map((card) => (
                <Card key={card.id} card={card} />
            ))}
          </div>
        ))}
        </div>
    );
};

export default CenterCards;