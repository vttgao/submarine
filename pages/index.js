// pages/index.js (home, pages/.)
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import ThreeScene from '../components/ThreeScene';

export default function Home() {
  return (
    <>
      <Head>
        <title>come again</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        {/* <Link href="/">home</Link>
        <Link href="/portfolio">portfolio</Link>
        <Link href="/about">about</Link>
        <Link href="/contact">contact</Link> */}
      </header>

      <div className={styles.container}>
        <main>
          <h1 className={styles.title}>come again</h1>
          <p className={styles.description}>
            {/**/}
          </p>

          <div style={{ width: '100%', height: '90px', marginTop: '1rem' }}>
            <ThreeScene />
          </div>
        </main>

        <footer>
          <p>2025的vera</p>
        </footer>
      </div>

      <style jsx>{`
        header {
          width: 100%;
          height: 50px;
          background: rgb(209, 204, 204);
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 0 1rem;
        }

        header :global(a) {
          color: black;
          text-decoration: none;
          padding: 0 15px;
        }

        header :global(a):hover {
          text-decoration: underline;
        }

        main {
          padding: 1rem 0;
          flex: 0.7;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          padding-top: 100px;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}