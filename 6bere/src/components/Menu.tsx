import { Link } from 'react-router-dom';

export const Menu = () => {
  const handleStartClick = () => {
    localStorage.clear();
  };
  return (
    <>
      <div>
        <h1>6bere!</h1>
        <div>
          <Link to="/botselection" onClick={handleStartClick}>Hrát</Link>
          <Link to="/rules">Pravidla</Link>
        </div>
      </div>
    </>
  );
};

export default Menu;