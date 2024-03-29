import { PropsWithChildren, createContext, useState } from "react";
import React from "react";

export type PlayersType = {
    id: number;
    name: string;
    lives: number;
}

type PlayerContextType = {
    players: PlayersType;
    updatePlayers: (newPlayers: PlayersType) => void;
}

export const PlayerContext = createContext<PlayerContextType>({
    players: { id: 1, name: 'player', lives: 66 },
    updatePlayers: () => {}
});

const PlayerProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [players, setPlayers] = useState<PlayersType>({ id: 1, name: 'player', lives: 66 });

    const updatePlayers = (newPlayers: PlayersType) => {
        setPlayers({...players, ...newPlayers});
    }

    return (
        <PlayerContext.Provider value={{ players, updatePlayers }}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerProvider;