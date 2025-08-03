import './page.css';
import styles from './page.module.css';
import Bar from './components/Bar/Bar';
import CenterBlock from './components/CenterBlock/CenterBlock';
import Navigation from './components/Navigation/Navigation';
import Sidebar from './components/Sidebar/Sidebar';


export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />

          <CenterBlock />

          <Sidebar />
        </main>

        <Bar />

        <footer className="footer"></footer>
      </div>
    </div>
  );
}
