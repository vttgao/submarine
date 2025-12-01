// pages/proto.js
import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>VTTGAO | PROTO</title>
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
            {/* <Link href="/rx100">
              <span>RX100</span>
            </Link> */}
            <Link href="/proto">
              <span>PROTOTYPING</span>
            </Link>
          </nav>
          <div className="nav-bar"></div>
        </header>

        <h1 className="title">PROTO</h1>

        <section className="content">
          <p>[wip]</p>
        </section>
      </main>

      <style jsx>{`
        .about-container {
          width: 100%;
          padding: 2rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
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

        .title {
          width: 100%;
          max-width: 1200px;
          padding-left: 1rem;
          font-family: "Times New Roman", serif;
          font-size: 3rem;
          margin: 2rem 0 1.5rem;
          text-align: left;
        }

        .content {
          max-width: 800px;
          padding: 2rem;
          font-size: 1.1rem;
          line-height: 1.55;
          color: #222;
        }

        p {
          margin-bottom: 1.2rem;
        }
      `}</style>
    </>
  );
}
