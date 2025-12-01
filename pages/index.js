// pages/index.js
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import ThreeScene from "../components/ThreeScene";

export default function Home() {
  return (
    <>
      <Head>
        <title>VTTGAO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <div className="page-stack">
          <div className="uniform-width">
            <header className="topnav">
              <nav>
                <Link href="/">
                  <span>[ HOME ]</span>
                </Link>
                <Link href="/about">
                  <span>ABOUT</span>
                </Link>
                <Link href="/portfolio">
                  <span>PORTFOLIO</span>
                </Link>
                {/* <Link href="/proto">
                  <span>PROTOTYPING</span>
                </Link> */}
              </nav>
              <div className="nav-bar"></div>
            </header>

            <div className="mega-block">
              <div className="mega-title">
                <span>V</span>
                <span>T</span>
                <span>T</span>
                <span>G</span>
                <span>A</span>
                <span>O</span>
              </div>

              <div className="mega-bottom-bar"></div>

              {/* <div className="mega-subtitle">( ⏺ ⏺ ⏺ )</div> */}
            </div>
          </div>
        </div>

        <div className="scene-wrapper">
          <ThreeScene />
        </div>
      </main>

      <style jsx>{`
        .page-stack {
          display: flex;
          flex-direction: column;
          width: 100%;
          padding: 2rem 0;
          position: relative;
        }

        .uniform-width {
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .mega-block {
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .topnav {
          width: 100%;
          padding: 1rem 0 0.5rem;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 6;
        }

        nav {
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-family: Arial, sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        nav :global(a) {
          color: inherit;
          text-decoration: none;
        }

        nav :global(a:hover) span {
          color: #79909fff;
          transition: color 0.2s ease;
        }

        .nav-bar {
          width: 100%;
          height: 10px;
          background: #222;
          border-radius: 4px;
        }

        .mega-title {
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-family: "Times New Roman", serif;
          font-weight: 300;
          font-size: clamp(6rem, 17vw, 15rem);
          color: #222;
          line-height: 0.8;
          margin-top: -0.5rem;
        }

        .mega-title span {
          flex: 1;
          text-align: center;
        }

        .mega-bottom-bar {
          width: 100%;
          height: 10px;
          background: #222;
          border-radius: 4px;
          margin-bottom: 0.4rem;
        }

        // .mega-subtitle {
        //   font-family: "Times New Roman", serif;
        //   // font-style: italic;
        //   font-size: 1.3rem;
        //   font-weight: 300;
        //   opacity: 0.75;
        //   text-align: left;
        //   margin-top: 0.2rem;
        //   color: #222;
        // }

        .scene-wrapper {
          position: relative;
          width: 100%;
          height: 300px;
          display: flex;
          justify-content: center;
          z-index: 8;
        }

        .scene-wrapper :global(canvas) {
          position: relative;
          z-index: 8;
          margin-top: -220px;
          pointer-events: none;
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

      <style jsx global>{`
        body {
          background: #f2efe9;
        }
      `}</style>
    </>
  );
}
