import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../providers/ContextProvider.tsx';

export const BotSelection = () => {
  const context = useContext(Context);
  return (
    <div>
      <h1>BotSelection</h1>
      <div>
        <button onClick={() => {context.dispatch({type: 'ADD_BOT'}); console.log(context)}}>Add bot</button>
        <button onClick={() => {context.dispatch({type: 'REMOVE_BOT'}); console.log(context)}}>Remove bot</button>
        <Link to="/game">Start</Link>
        <Link to="/">Zpět</Link>
        <p>Number of oponents: {context.state.players.length -1}</p>
      </div>
    </div>
  );
}

export default BotSelection;