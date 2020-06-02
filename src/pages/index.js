import { Link } from 'umi';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './index.css';

export default function () {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            { formatMessage({ id: 'home'}) }
          </a>
          <br />
          <Link to='/authentication'>Go authentication page</Link>
        </li>
      </ul>
    </div>
  );
}
