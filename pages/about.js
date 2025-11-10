// pages/about.js
import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>VTTGAO | ABOUT</title>
      </Head>

      <main className="about-container">
        <header className="topnav">
          <nav>
            <Link href="/">
              <span>HOME:</span>
            </Link>
            <Link href="/about">
              <span>ABOUT</span>
            </Link>
            <Link href="/portfolio">
              <span>PORTFOLIO</span>
            </Link>
            <Link href="/rx100">
              <span>RX100</span>
            </Link>
            <Link href="/proto">
              <span>PROTOTYPING</span>
            </Link>
          </nav>
          <div className="nav-bar"></div>
        </header>

        <div className="title-wrap">
          <h1 className="title">ABOUT</h1>
          <div className="big-wo">我</div>
        </div>

        <section className="content">
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
        .about-container {
          width: 100%;
          padding: 2rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .topnav {
          width: 100%;
          background: white;
          padding: 1rem 0 0.5rem;
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

        .title-wrap {
          width: 100%;
          max-width: 1200px;
          padding-left: 1rem;
          position: relative;
          margin: 2rem 0 1.5rem;
        }

        .title {
          font-family: "Times New Roman", serif;
          font-size: 4rem;
          text-align: left;
          position: relative;
          z-index: 3;
        }

        .big-wo {
          position: absolute;
          top: 40px;
          left: 0;
          font-family: "Times New Roman", serif;
          font-size: clamp(10rem, 30vw, 20rem);
          line-height: 1;
          color: #222;
          opacity: 0.08;
          pointer-events: none;
          z-index: 1;
        }

        .content {
          max-width: 800px;
          padding: 2rem;
          font-size: 1.1rem;
          line-height: 1.55;
          color: #222;
          position: relative;
          z-index: 4;
        }

        p {
          margin-bottom: 1.2rem;
        }

        .email {
          color: inherit;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: color 0.2s ease, border-color 0.2s ease;
        }

        .email:hover {
          color: #79909fff;
          border-color: #79909fff;
        }
      `}</style>
    </>
  );
}
