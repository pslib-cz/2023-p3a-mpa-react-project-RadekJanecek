import { Link } from 'react-router-dom';

export const Menu = () => {
  return (
    <>
      <div>
        <h1>6bere!</h1>
        <div>
          <Link to="/game">Hrát</Link>
          <Link to="/rules">Pravidla</Link>
        </div>
      </div>
    </>
  );
};

export default Menu;