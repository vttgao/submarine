import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ThreeScene from '../components/ThreeScene';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>come again</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>come again</h1>
        <p className={styles.description}>
          {/* your subtitle or description here */}
        </p>

        {/* Shadow circle below the title/description */}
        <div className={styles.shadowCircle}></div>

        {/* 3D scene */}
        <div style={{ width: '100%', height: '500px', marginTop: '2rem' }}>
          <ThreeScene />
        </div>
      </main>

      <footer>
        <p>2025的vera</p>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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
        /* Shadow circle styles */
        .shadowCircle {
          width: 100px;
          height: 30px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 50%;
          margin: 1.5rem auto 0 auto; /* smaller margin-top */
          filter: blur(8px);
          position: relative;
          top: 20;
          z-index: 0;
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
    </div>
  );
}
