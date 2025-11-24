// pages/about.js
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function About() {
  return (
    <>
      <Head>
        <title>VTTGAO | ABOUT</title>
      </Head>

      <main className={styles.container}>
        <div className="page-stack">
          <div className="uniform-width">
            <header className="topnav">
              <nav>
                <Link href="/">
                  <span>HOME:</span>
                </Link>
                <Link href="/about">
                  <span>[ ABOUT ]</span>
                </Link>
                <Link href="/portfolio">
                  <span>PORTFOLIO</span>
                </Link>
                <Link href="/proto">
                  <span>PROTOTYPING</span>
                </Link>
              </nav>
              <div className="nav-bar"></div>
            </header>

            {/* --- TITLE BLOCK LIKE HOME PAGE --- */}
            <div className="mega-block">
              <div className="mega-title">
                <span>A</span>
                <span>B</span>
                <span>O</span>
                <span>U</span>
                <span>T</span>
                <span>!</span>
              </div>

              <div className="mega-bottom-bar"></div>
            </div>
          </div>
        </div>

        {/* --- CONTENT --- */}
        <section className="about-content">
          <p>
            i'm vera, a second year cs and ece student at purdue university. i'm
            interested in pcbs, semiconductor manufacturing, chip design,
            software engineering and embedded systems engineering.
          </p>

          <p>
            i like technical builds that feel a bit whimsical. this site is
            basically a playground for that — somewhere to put projects, photos,
            3d models, and other digital tchotchkes.
          </p>

          <p>
            if you want to see more, check the portfolio page for my work, the
            rx100 page for my photography, or the prototyping page for what i'm
            currently working on. contact me at{" "}
            <a className="email" href="mailto:gao820@purdue.edu">
              gao820 [at] purdue [dot] edu
            </a>
            .
          </p>
        </section>
      </main>

      <style jsx>{`
        /* --- SAME PAGE STRUCTURE AS INDEX PAGE --- */
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
          background: white;
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
        }

        /* --- ABOUT CONTENT --- */
        .about-content {
          max-width: 800px;
          margin: 3rem auto 5rem;
          padding: 0 1rem;
          font-size: 1.1rem;
          line-height: 1.55;
          color: #222;
        }

        .email {
          color: inherit;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s ease, color 0.2s ease;
        }

        .email:hover {
          border-color: #79909fff;
          color: #79909fff;
        }

        p {
          margin-bottom: 1.3rem;
        }
      `}</style>
    </>
  );
}
