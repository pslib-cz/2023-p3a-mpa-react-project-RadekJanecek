import { useContext} from 'react';
import { Context } from '../providers/ContextProvider.tsx';
import Card from './Card.tsx';
import styles from './PlayerCards.module.css';

export const PlayerCards = () => {
    const context = useContext(Context);
    const player = context.state.players.find(player => player.id === 0);

    return (
        <div className={styles["cards"]}>
          {player && player.cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
    );
};

export default PlayerCards;