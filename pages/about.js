import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import Clock from "../components/Clock";
import DiceOverlay from "../components/DiceOverlay";

export default function About() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("gao820@purdue.edu");
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <Head>
        <title>VTTGAO | ABOUT</title>
      </Head>
      <DiceOverlay />
      <main className={styles.container}>
        <div className="content-box">
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
                  {/* <Link href="/proto">
                    <span>PROTOTYPING</span>
                  </Link> */}
                </nav>
                <div className="nav-bar"></div>
              </header>

              <div className="mega-block">
                <div className="mega-title">
                  <span>A</span>
                  <span>B</span>
                  <span>O</span>
                  <span>U</span>
                  <span>T</span>
                </div>
                <div className="mega-bottom-bar"></div>
              </div>
            </div>
          </div>

          <section className="about-layout">
            <div className="left-clock">
              <Clock />
            </div>

            <div className="right-text">
              <p>
                I'M VERA, A SECOND-YEAR CS AND ECE STUDENT AT PURDUE UNIVERSITY.
                I'M INTERESTED IN PCBS, SEMICONDUCTOR MANUFACTURING, CHIP
                DESIGN, SOFTWARE ENGINEERING, AND EMBEDDED SYSTEMS ENGINEERING.
              </p>
              {/* <p>
                I LIKE TECHNICAL BUILDS THAT FEEL A BIT WHIMSICAL. THIS SITE IS
                SOMEWHERE TO PUT PROJECTS, PHOTOS, 3D MODELS, AND OTHER DIGITAL
                TCHOTCHKES. CHECK THE PORTFOLIO PAGE FOR MY WORK, OR THE
                PROTOTYPING PAGE FOR WHAT I'M CURRENTLY WORKING ON. TRY CLICKING
                THE DICE!
              </p> */}

              <p>
                I LIKE TECHNICAL BUILDS THAT FEEL A BIT WHIMSICAL. THIS IS
                SOMEWHERE TO PUT PROJECTS, PHOTOS, 3D MODELS, AND OTHER DIGITAL
                TCHOTCHKES. CHECK THE PORTFOLIO PAGE FOR MY WORK. TRY CLICKING
                THE DICE!
              </p>

              <p>
                CONTACT ME AT{" "}
                <span className="email" onClick={handleCopy}>
                  {copied
                    ? "[COPIED TO CLIPBOARD]"
                    : "GAO820 [AT] PURDUE [DOT] EDU."}
                </span>
              </p>
            </div>
          </section>
        </div>
      </main>

      <style jsx>{`
        .content-box {
          width: 90%;
          background: #ffffff;
          border: 2px solid #222;
          padding: 2rem;
          margin-top: 1rem;
        }

        .page-stack {
          padding: 0;
        }

        .uniform-width {
          width: 100%;
        }

        .topnav {
          width: 100%;
          background: transparent;
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
        }

        .mega-block {
          display: flex;
          flex-direction: column;
        }

        .mega-title {
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-family: "Times New Roman", serif;
          font-weight: 300;
          font-size: clamp(6rem, 17vw, 8rem);
          color: #222;
          line-height: 0.8;
          margin-top: -0.3rem;
        }

        .mega-title span {
          // flex: 1;
          text-align: center;
        }

        .mega-bottom-bar {
          width: 100%;
          height: 10px;
          background: #222;
        }

        .about-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          width: 100%;
          padding: 1.5rem 0;
          margin-top: 1rem;
          align-items: stretch;
        }

        .left-clock {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          height: 100%;
        }

        .left-clock :global(.clock) {
          font-family: "Arial", serif;
          font-size: 10vw;
          font-weight: 300;
          line-height: 1;
          color: #222;
          height: 100%;
          display: flex;
          // align-items: center;
          justify-content: center;
        }

        // .right-text {
        //   font-family: Arial, sans-serif;
        //   font-size: 0.9rem;
        //   line-height: 1.65;
        //   font-weight: 600;
        //   color: #222;

        //   background: repeating-linear-gradient(
        //     to bottom,
        //     transparent 0,
        //     transparent calc(1.65em - 1px),
        //     #ddd calc(1.65em - 1px),
        //     #ddd 1.65em
        //   );

        //   padding-bottom: 1rem;
        // }

        // .right-text p {
        //   margin: 0 0 1.65em 0;
        // }

        .right-text {
          font-family: Arial, sans-serif;
          font-size: 0.9rem;
          line-height: 24px;
          font-weight: 600;
          color: #222;

          background: repeating-linear-gradient(
            to bottom,
            transparent 0,
            transparent 23px,
            #ddd 23px,
            #ddd 24px
          );

          padding-bottom: 1rem;
        }

        .right-text p {
          margin: 0 0 24px 0;
        }

        .email {
          color: #79909fff;
          text-decoration: none;
          cursor: pointer;
        }

        .email:hover {
          color: #79909fff;
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
