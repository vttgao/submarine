// pages/portfolio.js
import Head from "next/head";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

export default function Portfolio() {
  const scrollRef = useRef(null);
  const [idle, setIdle] = useState(false);
  const [expanded, setExpanded] = useState(null); // modal state

  // idle detection for arrow animation
  useEffect(() => {
    let timer;
    const reset = () => {
      setIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIdle(true), 3000);
    };
    reset();
    window.addEventListener("mousemove", reset);
    window.addEventListener("keydown", reset);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", reset);
      window.removeEventListener("keydown", reset);
    };
  }, []);

  // arrow key horizontal scrolling
  useEffect(() => {
    const handler = (e) => {
      if (!scrollRef.current) return;
      if (e.key === "ArrowRight")
        scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
      if (e.key === "ArrowLeft")
        scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const images = [
    {
      src: "/images/pdb_board.png",
      caption: "PART 25/26 PDB (DEV BOARD)",
      context:
        "Custom power distribution board prototype used in the PART avionics pipeline, enabling isolated rail stages and subsystem protection.",
    },
    {
      src: "/images/pdb_schema.png",
      caption: "PART 25/26 PDB SCHEMATIC",
      context:
        "Schematic includes TVS diode protection, buck/boost regulation, telemetry taps, rail branching and safety considerations.",
    },
    {
      src: "/images/stm32.jpg",
      caption: "STM32 BASIC SETUP",
      context:
        "Fundamental STM32 F0/F3 dev-board wiring for debugging, GPIO bring-up, and subsystem communication testing.",
    },
    {
      src: "/images/555timer.jpg",
      caption: "555 TIMER BUILD (F1 LIGHTS)",
      context:
        "Monostable and astable 555 timer circuit used to drive indicator lights with controlled pulse timing. Inspired by Formula One.",
    },
    {
      src: "/images/buckboost.jpg",
      caption: "24V BUCK BOOST",
      context:
        "Adjustable buck-boost converter module used for regulating high-voltage system inputs into 5/12V avionics rails.",
    },
    {
      src: "/images/audioeq.png",
      caption: "AUDIO EQUALIZER",
      context:
        "Digital + analog experimental equalizer with band-pass filter stacking and frequency shaping. Filters trebles, mids, and bass.",
    },
    {
      src: "/images/clawmachine.png",
      caption: "CLAW MACHINE 3D MODEL",
      context:
        "Prototype of a mechanical simulation project involving stepper-driven claw motion and object detection.",
    },
    {
      src: "/images/trebuchet.png",
      caption: "TREBUCHET 3D MODEL",
      context:
        "Physics-based 3D simulation model used for parameter tuning of arm ratios and projectile trajectories, originally built for a Science Olympiad competition.",
    },
    {
      src: "/images/catapult.jpg",
      caption: "OPERATION CATAPULT PROJECT",
      context:
        "Operation Catapult project built at Rose-Hulman, where I designed and constructed a working claw machine using geared transmissions and a mechanical pick-up assembly.",
    },
  ];

  return (
    <>
      <Head>
        <title>VTTGAO | PORTFOLIO</title>
      </Head>

      <main className="container">
        <div className="content-box">
          <div className="page-stack">
            <div className="uniform-width">
              <header className="topnav">
                <nav>
                  <Link href="/">
                    <span>HOME:</span>
                  </Link>
                  <Link href="/about">
                    <span>ABOUT</span>
                  </Link>
                  <Link href="/portfolio">
                    <span>[ PORTFOLIO ]</span>
                  </Link>
                </nav>
                <div className="nav-bar"></div>
              </header>

              <div className="mega-block">
                <div className="mega-title">
                  <span>P</span>
                  <span>O</span>
                  <span>R</span>
                  <span>T</span>
                  <span>F</span>
                  <span>O</span>
                  <span>L</span>
                  <span>I</span>
                  <span>O</span>
                </div>
                <div className="mega-bottom-bar"></div>
              </div>
            </div>
          </div>

          <section className="folio-layout">
            <div className="gallery-wrap">
              <div className="gallery" ref={scrollRef}>
                {images.map((item, i) => (
                  <div
                    className="card"
                    key={i}
                    onClick={() => setExpanded(item)}
                  >
                    <img src={item.src} alt="" />
                    <div className="caption">{item.caption}</div>
                  </div>
                ))}
              </div>

              <div className={`scroll-arrows ${idle ? "idle" : ""}`}>
                <span>&lt; &gt;</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      {expanded && (
        <div className="modal" onClick={() => setExpanded(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={expanded.src} alt="" />
            <h2>{expanded.caption}</h2>
            <p className="context-text">
              {expanded.context ||
                "Additional context about this project goes here."}
            </p>
            <button className="close-btn" onClick={() => setExpanded(null)}>
              CLOSE
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 600px) {
          .mega-title {
            font-size: clamp(2.5rem, 12vw, 4rem);
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.4rem;
            line-height: 1;
          }
          .mega-title span {
            display: inline-block;
          }
        }

        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 0;
        }

        .content-box {
          width: 90%;
          background: #ffffff;
          border: 2px solid #222;
          padding: 2rem;
          margin-top: 1rem;
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

        .mega-title {
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-family: "Times New Roman", serif;
          font-weight: 300;
          font-size: clamp(6rem, 17vw, 8rem);
          color: #222;
          line-height: 0.8;
        }

        .mega-bottom-bar {
          width: 100%;
          height: 10px;
          background: #222;
        }

        .folio-layout {
          width: 100%;
          margin-top: 2rem;
        }

        .gallery-wrap {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .gallery {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          gap: 1.5rem;
          padding: 1.5rem 0;
        }
        .gallery::-webkit-scrollbar {
          display: none;
        }

        .card {
          flex: 0 0 32%;
          height: 300px;
          scroll-snap-align: start;
          background: #000;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .card {
            flex: 0 0 48%;
          }
        }

        @media (max-width: 600px) {
          .card {
            flex: 0 0 55%;
          }
        }

        .card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .caption {
          width: 100%;
          padding: 0.4rem 0.5rem;
          font-size: 0.78rem;
          font-family: Arial, sans-serif;
          font-weight: 700;
          background: rgba(0, 0, 0, 0.45);
          color: white;
          backdrop-filter: blur(4px);

          position: absolute;
          left: 0;
          bottom: 0;

          text-align: center;
          white-space: normal;
          word-wrap: break-word;
          overflow-wrap: break-word;

          display: flex;
          justify-content: center;
          align-items: center;
          line-height: 1.2;

          max-height: 40%;
          overflow: hidden;
        }

        .scroll-arrows {
          width: 100%;
          font-size: 2rem;
          font-weight: 800;
          opacity: 1;
          display: flex;
          justify-content: space-between;
          user-select: none;
          pointer-events: none;
          color: black;
        }

        @keyframes ebb {
          0% {
            transform: translateX(0);
          }
          40% {
            transform: translateX(10px);
          }
          70% {
            transform: translateX(22px);
          }
          100% {
            transform: translateX(0);
          }
        }

        .scroll-arrows.idle span {
          animation: ebb 1.8s ease-in-out infinite;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(6px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .modal-content {
          background: white;
          padding: 1.5rem;
          border: 3px solid #222;
          max-width: 800px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          text-align: center;
        }

        .modal-content img {
          width: 60%;
          height: auto;
          margin-bottom: 1rem;
          border: 2px solid #000;
        }

        .modal-content h2 {
          font-family: Arial, sans-serif;
          margin-bottom: 0.5rem;
          font-size: 1.4rem;
          font-weight: 700;
        }

        .context-text {
          font-family: Arial, sans-serif;
          font-size: 1rem;
          margin-bottom: 1.5rem;
          color: #333;
        }

        .close-btn {
          font-family: Arial, sans-serif;
          padding: 0.5rem 1.5rem;
          border: 2px solid #222;
          background: #eee;
          font-weight: bold;
          cursor: pointer;
        }
        .close-btn:hover {
          background: #ccc;
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
