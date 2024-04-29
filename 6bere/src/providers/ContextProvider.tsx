import { PropsWithChildren, createContext, useReducer } from "react";
import React from "react";
import { cards } from "../data/cards";

export type PlayersType = {
    id: number;
    name: string;
    lives: number;
    cards: CardType[];
}

export type CardType = {
    id: number;
    lives: number;
    position: string;
}

type Action =
    { type: 'DEAL_CARDS' }
  | { type: 'PLAY_CARD'; playerId: number; cardId: number; selectedRowIndex: number}
  | { type: 'ADD_BOT' }
  | { type: 'REMOVE_BOT' }
  | { type: 'SELECT_ROW'; playerId: number; cardId: number; rowIndex: number}

type GameState = {
    deck: CardType[];
    players: PlayersType[];
    centerCards: CardType[][];
    selectedCards: CardType[];
    showArrows: boolean;
};

interface IContext {
    state: GameState;
    dispatch: (action: Action) => void;
}

const shuffle = (deck: CardType[]): CardType[] => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};

export const Context = createContext<IContext>({} as IContext);

const initialState: GameState = {
    deck: cards,
    players: [
        { id: 0, name: 'Player', lives: 66, cards: [] },
        { id: 1, name: 'Bot', lives: 66, cards: [] }
    ],
    centerCards: [],
    selectedCards: [],
    showArrows: false
};

const gameReducer = (state: GameState, action: Action): GameState => {
        const newState: GameState = JSON.parse(JSON.stringify(state));
        switch (action.type) {
            case 'DEAL_CARDS': {
                shuffle(newState.deck);
                newState.players.forEach((player) => {
                    player.cards = newState.deck.splice(0, 10);
                });
                for (let i = 0; i < 4; i++) newState.centerCards[i] = newState.deck.splice(0, 1);
                return newState;
            }
            case 'PLAY_CARD': {
                const player = newState.players[action.playerId];
                if (player) {
                    const cardIndex = player.cards.findIndex(card => card.id === action.cardId);
                    if (cardIndex !== -1) {
                        const [card] = player.cards.splice(cardIndex, 1);
                        newState.selectedCards.push(card);
                    }
                }
                newState.selectedCards.sort((a, b) => a.id - b.id);
                newState.selectedCards.forEach(card => {
                    let closestCenterIndex = -1;
                    let smallestDifference = Infinity;
            
                    newState.centerCards.forEach((centerCards, index) => {
                        const lastCardId = centerCards[centerCards.length - 1].id;
                        if (card.id > lastCardId && card.id - lastCardId < smallestDifference) {
                            smallestDifference = card.id - lastCardId;
                            closestCenterIndex = index;
                        }
                    });
            
                    if (closestCenterIndex === -1) {
                            state.showArrows = true;
                            return newState;
                        } else {
                            newState.centerCards[closestCenterIndex].push(newState.selectedCards[0]);
                            newState.showArrows = false;
                            newState.selectedCards.splice(0, 1);
                        }

                    if (newState.centerCards[closestCenterIndex].length === 6) {
                        newState.centerCards[closestCenterIndex].splice(0, 5).forEach(card => {
                            player.lives -= card.lives;
                        });
                    }
                });
            
                console.log(newState.selectedCards);
                return newState;
            }
            case 'ADD_BOT': {
                if (newState.players.length < 10) {
                    newState.players.push({id: newState.players.length, name: 'Bot' + newState.players.length, lives: 66, cards: []});
                return newState;
                }
                return newState;
            }
            case 'REMOVE_BOT': {
                if (newState.players.length > 2) {
                    newState.players.splice(newState.players.length - 1, 1);
                    return newState;
                }
                return newState;
            }
            case 'SELECT_ROW': {
                const cardIndex = newState.selectedCards.findIndex(card => card.id === action.cardId);
                const player = newState.players.find(player => player.id === action.playerId);
                if (cardIndex !== -1 && player) {
                    const [card] = newState.selectedCards.splice(cardIndex, 1);
                    newState.centerCards[action.rowIndex].forEach(card => {
                        player.lives -= card.lives;
                    });
                    newState.centerCards[action.rowIndex] = [card];
                    newState.players[0].lives = player.lives;
                    newState.showArrows = false;
                    newState.selectedCards = newState.selectedCards.splice(cardIndex, 1);
                }
                return newState;
            }
        }
        return newState;
};

const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;