import { Link } from 'react-router-dom';
import styles from './Rules.module.css';

export const Rules = () => {
  return (
    <div>
      <h1>Pravidla</h1>
      <div className={styles["rules"]}>
        <h2 className={styles["text"]}>Karty:</h2>
        <p className={styles["text"]}>ve hře je celkově 104 karet, obyčejné karty vám seberou 1 život, karty s čísly 5, 15, 20, atd... vám seberou 2 životy, karty s čísly 10, 20, 30, atd... vám seberou 3 životy, karty s čísly 11, 22, 33, atd... vám seberou 5 životů a karta s číslem 55 vám sebere 7 životů.</p>
        <h2 className={styles["text"]}>Průběh hry:</h2>
        <p className={styles["text"]}>Každé kolo máte 10 karet v ruce a snažíte se je pokládat na základě karet které jsou uprostřed. Uprostřed jsou 4 řady karet, když na řadu položíte kartu a bude na 6. pozici, odečtou se vám životy podle karet které byly před vaší. Když si vyberete nižší kartu než jsou všechny poslední karty v řadách, tak si vyberete jednu z řad a přijdete o životy na základě karet které byly v dané řadě.</p>
        <h2 className={styles["text"]}>Konec hry:</h2>
        <p className={styles["text"]}>Když některý z hráčů dosáhne 0 životů, nebo méně, tak hra skončí a vyhrává ten, komu zbylo nejvíce životů.</p>
        <Link className={styles["button"]} to="/">Zpět</Link>
      </div>
    </div>
  );
};

export default Rules;