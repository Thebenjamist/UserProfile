import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome</h1>
        <h1>
          <Link href="/login">Login</Link>
        </h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reset App
        </a>
      </footer>
    </div>
  );
}
