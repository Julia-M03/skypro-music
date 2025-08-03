import Navigation from '@/components/Navigation/Navigation';
import './page.css';
import styles from './page.module.css';
import CenterBlock from '@/components/CenterBlock/CenterBlock';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';


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
  )
}
