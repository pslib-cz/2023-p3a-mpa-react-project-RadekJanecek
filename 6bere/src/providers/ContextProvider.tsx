import { PropsWithChildren, createContext, useReducer, useState } from "react";
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
  | { type: 'PLAY_CARD'; playerId: number; cardId: number }
  | { type: 'GET_COWS'; playerId: number; cardId: number; CardLives: number }
  | { type: 'ADD_BOT' }
  | { type: 'REMOVE_BOT' }

type GameState = {
    deck: CardType[];
    players: PlayersType[];
    centerCards: CardType[];
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
    centerCards: []
};

const gameReducer = (state: GameState, action: Action): GameState => {
        const newState: GameState = JSON.parse(JSON.stringify(state));
        switch (action.type) {
            case 'DEAL_CARDS': {
                shuffle(newState.deck);
                newState.players.forEach((player) => {
                    player.cards = newState.deck.splice(0, 10);
                });
                newState.centerCards = newState.deck.splice(0, 4);
                return newState;
            }
            case 'PLAY_CARD': {
                newState.players[action.playerId].cards.splice(action.cardId, 1);
                return newState;
            }
            case 'GET_COWS': {
                newState.players[action.playerId].lives -= newState.deck[action.cardId].lives;
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