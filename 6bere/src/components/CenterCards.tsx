import { useContext } from 'react';
import { Context } from '../providers/ContextProvider.tsx';
import Card from './Card.tsx';

export const CenterCards = () => {
    const context = useContext(Context);
    const centerCards = context.state.centerCards;
    return (
        <div>
          {centerCards.map((cards) => (
            cards.map((card) => (
                <Card key={card.id} card={card} />
            )
          )))}
        </div>
    );
};

export default CenterCards;