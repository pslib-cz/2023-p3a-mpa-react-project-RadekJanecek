import { PropsWithChildren, createContext, useEffect, useReducer } from "react";
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
    image: string;
    playerId?: number;
}

type Action =
    { type: 'DEAL_CARDS' }
  | { type: 'SELECT_CARD'; playerId: number; cardId: number }
  | { type: 'PLAY_CARD'; playerId: number; cardId: number; selectedRowIndex: number}
  | { type: 'ADD_BOT' }
  | { type: 'REMOVE_BOT' }
  | { type: 'SELECT_ROW'; playerId: number; cardId: number; rowIndex: number}
  | { type: 'CHECK_GAME_OVER' }
  | { type: 'RESET' }
  | { type: 'LOAD_STATE'; payload: GameState };

type GameState = {
    deck: CardType[];
    players: PlayersType[];
    centerCards: CardType[][];
    selectedCards: CardType[];
    showArrows: boolean;
    gameOver: boolean;
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
const numBots = JSON.parse(localStorage.getItem('numBots') || '0');
const storedState = JSON.parse(localStorage.getItem('gameState') || '{}');

const initialState: GameState = storedState.gameState || {
    deck: cards,
    players: [
      {id: 0, name: 'Player', lives: 66, cards: []},
      {id: 1, name: 'Bot1', lives: 66, cards: []},
      ...Array.from({ length: numBots }, (_, i) => ({ id: i + 1, name: `Bot${i + 1}`, lives: 66, cards: [] })).slice(1),],
    centerCards: [],
    selectedCards: [],
    showArrows: false,
    gameOver: false
};

const gameReducer = (state: GameState, action: Action): GameState => {
        const newState: GameState = JSON.parse(JSON.stringify(state));
        switch (action.type) {
          case 'DEAL_CARDS': {
            shuffle(newState.deck);
            const numCardsPerPlayer = 10;
            const numCenterCards = 4;
            for (let i = 0; i < numCenterCards; i++) {
              newState.centerCards[i] = newState.deck.splice(0, 1);
            }
            newState.players.forEach((player) => {
                player.cards = newState.deck.splice(0, numCardsPerPlayer);
            });
            newState.deck = cards;
            return newState;
        }
            case 'SELECT_CARD': {
                const player = newState.players[action.playerId];
                if (player) {
                    const cardIndex = player.cards.findIndex(card => card.id === action.cardId);
                    if (cardIndex !== -1) {
                        const [card] = player.cards.splice(cardIndex, 1);
                        newState.selectedCards.push({ ...card, playerId: action.playerId });
                    }
                }
                newState.selectedCards.sort((a, b) => a.id - b.id);
                return newState;
            }
            case 'PLAY_CARD': {
                const player = newState.players[action.playerId];
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
              
                  if (closestCenterIndex !== -1) {
                    if (!newState.showArrows) {
                      newState.centerCards[closestCenterIndex].push(card);
                      newState.selectedCards = newState.selectedCards.filter(c => c.id !== card.id);
                    }

                    if (newState.centerCards[closestCenterIndex].length === 6) {
                      const lastCard = newState.centerCards[closestCenterIndex].slice(-1)[0].playerId;
                      if (lastCard !== undefined) {
                        newState.centerCards[closestCenterIndex].splice(0, 5).forEach(card => {
                          newState.players[lastCard].lives -= card.lives;
                        });
                      }
                    }
                  } else {
                    if (player.name.includes("Bot")) {
                      let minLivesLost = Infinity;
                      let rowIndexToSelect = -1;
              
                      newState.centerCards.forEach((centerCards, index) => {
                        const livesLost = centerCards.reduce((sum, card) => sum + card.lives, 0);
                        if (livesLost < minLivesLost) {
                          minLivesLost = livesLost;
                          rowIndexToSelect = index;
                        }
                      });
              
                      if (rowIndexToSelect !== -1) {
                        newState.centerCards[rowIndexToSelect].forEach(card => {
                          player.lives -= card.lives;
                        });
                        newState.centerCards[rowIndexToSelect] = [card];
                        newState.selectedCards = newState.selectedCards.filter(c => c.id !== card.id);
                        return newState;
                      }
                    } else {
                      newState.showArrows = true;
                    }
                  }
                });
                localStorage.setItem('gameState', JSON.stringify(newState));
                return newState;
              }
            case 'SELECT_ROW': {
                const cardIndex = newState.selectedCards.findIndex(card => card.id === action.cardId);
                const player = newState.players[0];
                if (cardIndex !== -1 && player) {
                    const [card] = newState.selectedCards.splice(cardIndex, 1);
                    newState.centerCards[action.rowIndex].forEach(card => {
                        player.lives -= card.lives;
                    });
                    newState.centerCards[action.rowIndex] = [card];
                    newState.showArrows = false;
                    newState.selectedCards = newState.selectedCards.splice(cardIndex, newState.selectedCards.length - cardIndex);
                    if (newState.centerCards[cardIndex].length === 6) {
                      newState.centerCards[cardIndex].splice(0, 5).forEach(card => {
                        player.lives -= card.lives;
                      });
                    }
                    return newState;
                }
                return newState;
            }
            case 'ADD_BOT': {
              if (newState.players.length < 10) {
                const newBot = { id: newState.players.length, name: `Bot${newState.players.length}`, lives: 66, cards: [] };
                newState.players.push(newBot);
                localStorage.setItem('numBots', JSON.stringify(newState.players.length - 1));
              return newState;
              }
              return newState;
          }
          case 'REMOVE_BOT': {
              if (newState.players.length > 2) {
                newState.players.pop();
                localStorage.setItem('numBots', JSON.stringify(newState.players.length - 1));
                  return newState;
              }
              return newState;
          }
          case 'CHECK_GAME_OVER': {
            let anyPlayerDead = false;
            newState.players.forEach(player => {
              if (player.lives <= 0) {
                anyPlayerDead = true;
              }
            });
          
            if (anyPlayerDead) {
              newState.players.sort((a, b) => b.lives - a.lives);
              newState.gameOver = true;
            }
          
            return newState;
          }
          case 'RESET':
            return initialState;
          default:
            return newState;
          case 'LOAD_STATE': {
            return action.payload;
          }
        }
        return newState;
};

const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, storedState);

    useEffect(() => {
      localStorage.setItem('gameState', JSON.stringify(state));
    }, [state]);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;