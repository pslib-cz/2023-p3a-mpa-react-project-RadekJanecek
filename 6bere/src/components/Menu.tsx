import { Link } from 'react-router-dom';
import styles from './Menu.module.css';

export const Menu = () => {
  const handleStartClick = () => {
    localStorage.clear();
  };
  return (
    <>
      <div>
        <h1>6bere!</h1>
        <div className={styles["buttons"]}>
          <Link className={styles["button"]} to="/botselection" onClick={handleStartClick}>Hrát</Link>
          <Link className={styles["button"]} to="/rules">Pravidla</Link>
        </div>
      </div>
    </>
  );
};

export default Menu;