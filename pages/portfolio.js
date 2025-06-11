// pages/portfolio.js
import Head from "next/head";
import Link from "next/link";
import portfolioEmbed from '../components/portfolioEmbed';

export default function Portfolio() {
  return (
    <>
      <Head>
        <title>portfolio</title>
      </Head>
      <header>
        <Link href="/">home</Link>
        <Link href="/portfolio">portfolio</Link>
        <Link href="/about">about</Link>
        <Link href="/contact">contact</Link>
      </header>

      <main>
        <div className="frames-container">
          <div className="frame">
            <div className="photo">
            </div>
            <p className="caption">xxx</p>
          </div>
          <div className="frame">
            <div className="photo">
            </div>
            <p className="caption">xxx</p>
          </div>
          <div className="frame">
            <div className="photo">
            </div>
            <p className="caption">xxx</p>
          </div>
        </div>

        <div style={{ width: '100%', height: '90px', marginTop: '1rem' }}>
                    <portfolioEmbed />
        </div>
      </main>

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

        main {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 0;
          min-height: calc(100vh - 50px);
          box-sizing: border-box;
        }

        .frames-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 70px;
          padding: 20px;
        }

        .frame {
          width: 250px;
          height: 600px;
          background-color: black;
          border: 1px solid #ddd;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 10px 10px 25px 10px;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: transform 0.2s ease-in-out;
        }

        .frame:hover {
          transform: translateY(-5px);
        }

        .photo {
          width: 100%;
          height: 500px;
          overflow: hidden;
          background-color: #eee;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .caption {
          margin-top: 15px;
          font-size: 1.1em;
          color: #333;
        }
      `}</style>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Handlee&display=swap');

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