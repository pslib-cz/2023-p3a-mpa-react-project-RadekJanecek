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
            {
              context.state.showArrows && (
                <div className={styles.arrow} onClick={() => context.dispatch({ type: 'SELECT_ROW'})}>
                  {'<'}
                </div>
              )
            }
          </div>
        ))}
        </div>
    );
};

export default CenterCards;