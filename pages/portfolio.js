// pages/portfolio.js
import Head from "next/head";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

export default function Portfolio() {
  const scrollRef = useRef(null);
  const [idle, setIdle] = useState(false);

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
    { src: "/images/p1.jpg", caption: "00" },
    { src: "/images/p2.jpg", caption: "01" },
    { src: "/images/p3.jpg", caption: "02" },
    { src: "/images/p4.jpg", caption: "03" },
    { src: "/images/p5.jpg", caption: "04" },
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
                  {/* <Link href="/proto">
                    <span>PROTOTYPING</span>
                  </Link> */}
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
          </section>
        </div>
      </main>

      <style jsx>{`
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
          text-align: center;
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
          flex: 0 0 calc((100% - (1.5rem * 2)) / 3);
          height: 300px;
          scroll-snap-align: start;
          background: #000;
          position: relative;
          overflow: hidden;
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
          position: absolute;
          bottom: 0;
          left: 0;
        }

        .scroll-arrows {
          width: 100%;
          font-size: 3rem;
          font-weight: 800;
          opacity: 1;
          display: flex;
          justify-content: space-between;
          user-select: none;
          pointer-events: none;
          color: black;
          margin-top: -0.2rem;
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
      `}</style>

      <style jsx global>{`
        body {
          background: #f2efe9;
        }
      `}</style>
    </>
  );
}
