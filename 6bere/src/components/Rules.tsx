import { Link } from 'react-router-dom';
import styles from './Rules.module.css';

export const Rules = () => {
  return (
    <div>
      <h1>Pravidla</h1>
      <div>
        <Link to="/">Zpět</Link>
      </div>
    </div>
  );
};

export default Rules;