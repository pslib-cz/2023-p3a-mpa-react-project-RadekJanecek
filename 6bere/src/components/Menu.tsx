import styles from './Menu.module.css';

export const Menu = () => {
  return (
    <>
      <div>
        <h1>6bere!</h1>
        <div>
          <a href="/game">Hrát</a>
          <a href="/rules">Pravidla</a>
        </div>
      </div>
    </>
  );
};

export default Menu;