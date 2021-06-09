import '../styles/global.scss';
import styles from '../styles/pages/app.module.scss';

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.container}>
      <Component {...pageProps} />
    </div>
  );
}
