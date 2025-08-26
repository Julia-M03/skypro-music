import styles from "./layout.module.css";
import Bar from "@/components/Bar/Bar";
import Navigation from "@/components/Navigation/Navigation";
import Sidebar from "@/components/Sidebar/Sidebar";


type MusicLayoutProps = {
  children: React.ReactNode;
};

export default function MusicLayout({ children }: MusicLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />

          {children}

          <Sidebar />
        </main>

        <Bar />

        <footer className="footer" />
      </div>
    </div>
  )
}
