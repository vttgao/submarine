// pages/rx100.js
import Head from "next/head";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

export default function RX100() {
  const scrollRef = useRef(null);
  const [idle, setIdle] = useState(false);

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
    { src: "/rx100/0.jpg", caption: "00" },
    { src: "/rx100/1.jpg", caption: "01" },
    { src: "/rx100/2.jpg", caption: "02" },
    { src: "/rx100/3.jpg", caption: "03" },
    { src: "/rx100/4.jpg", caption: "04" },
  ];

  return (
    <>
      <Head>
        <title>VTTGAO | RX100</title>
      </Head>

      <main className="rx100-container">
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

        <div className="title-row">
          <h1 className="title">PHOTOS</h1>
          <div className="big-pin">胶</div>
        </div>

        <div className="gallery-wrap">
          <div className="gallery" ref={scrollRef}>
            {images.map((item, i) => (
              <div className="card" key={i}>
                <img src={item.src} alt="" />
                <div className="caption">{item.caption}</div>
              </div>
            ))}
          </div>

          <div className={`scroll-arrows ${idle ? "idle" : ""}`}>
            <span>&gt;&gt;</span>
          </div>
        </div>
      </main>

      <style jsx>{`
        .rx100-container {
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

        .title-row {
          width: 100%;
          max-width: 1200px;
          padding-left: 1rem;
          margin: 2rem 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          position: relative;
        }

        .title {
          font-family: "Times New Roman", serif;
          font-size: 4rem;
          z-index: 3;
        }

        .big-pin {
          position: absolute;
          top: 0;
          right: 0;
          font-family: "Times New Roman", serif;
          font-size: clamp(10rem, 30vw, 20rem);
          color: #222;
          opacity: 0.08;
          line-height: 1;
          padding-right: 1rem;
          z-index: 0;
          pointer-events: none;
        }

        .gallery-wrap {
          width: 100%;
          max-width: 1200px;
          padding-left: 1rem;
          overflow: hidden;
          position: relative;
          z-index: 2;
        }

        .gallery {
          display: flex;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          gap: 1.5rem;
          padding: 1.5rem 0;
        }

        .gallery::-webkit-scrollbar {
          display: none;
        }

        .card {
          flex: 0 0 calc((1200px - (1.5rem * 2)) / 3);
          max-width: calc((1200px - (1.5rem * 2)) / 3);
          height: 320px;
          scroll-snap-align: start;
          background: #000;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        @media (max-width: 1300px) {
          .card {
            flex: 0 0 calc((100vw - 1rem - (1.5rem * 2)) / 3);
            max-width: calc((100vw - 1rem - (1.5rem * 2)) / 3);
          }
        }

        .card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
        }

        .caption {
          width: 100%;
          padding: 0.8rem 1rem;
          font-size: 0.95rem;
          background: rgba(0, 0, 0, 0.45);
          color: white;
          backdrop-filter: blur(4px);
          position: relative;
          z-index: 2;
        }

        .scroll-arrows {
          width: 100%;
          max-width: 1200px;
          font-size: 3rem;
          font-weight: 800;
          opacity: 0.12;
          display: flex;
          justify-content: space-between;
          margin-top: -0.2rem;
          user-select: none;
          pointer-events: none;
          letter-spacing: -0.05em;
          color: black;
          line-height: 1;
        }

        .scroll-arrows span {
          font-family: "Times New Roman", serif;
        }

        @keyframes ebb {
          0% {
            transform: translateX(0);
          }
          30% {
            transform: translateX(8px);
          }
          55% {
            transform: translateX(18px);
          }
          80% {
            transform: translateX(28px);
          }
          100% {
            transform: translateX(0);
          }
        }

        .scroll-arrows.idle span {
          animation: ebb 1.8s cubic-bezier(0.45, 0, 0.2, 1) infinite;
        }
      `}</style>
    </>
  );
}
