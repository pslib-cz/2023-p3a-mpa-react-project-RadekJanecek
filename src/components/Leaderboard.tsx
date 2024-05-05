import { useContext, useEffect } from "react";
import { Context } from "../providers/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import Styles from "./Styles.module.css";

export const Leaderboard = () => {
    const context = useContext(Context);
    const navigate = useNavigate();
    const { players } = context.state;

    useEffect(() => {
        context.dispatch({ type: 'CHECK_GAME_OVER' });
        if (!context.state.gameOver) {
          navigate('/')
        }
      }, []);
    return (
        <div>
            <h1>Leaderboard</h1>
            {players.map((player, index) => (
                <div key={player.id}>
                    <h2>{index + 1}. {player.name}</h2>
                    <p>Lives: {player.lives}</p>
                </div>
            ))}
            <Link className={Styles["button"]} to="/">Menu</Link>
        </div>
    );
}

export default Leaderboard;