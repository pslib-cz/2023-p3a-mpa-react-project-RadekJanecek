import { Link } from 'react-router-dom';
import styles from './Menu.module.css';

export const Menu = () => {
  return (
    <>
      <div>
        <h1>6bere!</h1>
        <div>
          <Link to="/botselect">Hrát</Link>
          <Link to="/rules">Pravidla</Link>
        </div>
      </div>
    </>
  );
};

export default Menu;