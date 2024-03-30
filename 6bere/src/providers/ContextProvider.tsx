import { PropsWithChildren, createContext, useState } from "react";
import React from "react";

export type PlayersType = {
    id: number;
    name: string;
    lives: number;
}

export type CardType = {
    id: number;
    value: number;
    lives: number;
}

export type CardsType = CardType[];

type PlayerContextType = {
    players: PlayersType;
    updatePlayers: (newPlayers: PlayersType) => void;
}

export const Context = createContext<PlayerContextType>({
    players: { id: 1, name: 'player', lives: 66 },
    updatePlayers: () => {}
});

const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [players, setPlayers] = useState<PlayersType>({ id: 1, name: 'player', lives: 66 });

    const updatePlayers = (newPlayers: PlayersType) => {
        setPlayers({...players, ...newPlayers});
    }

    return (
        <Context.Provider value={{ players, updatePlayers }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;