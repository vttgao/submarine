// pages/about.js
import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>about</title>
      </Head>
      <header>
        <Link href="/">home</Link>
      </header>

      <main>
        <div className="text-content">
          <h1>vera gao</h1>
          <p>
            xxx
          </p>
          <p>
            xxx
          </p>
          <p>
            xxx
          </p>
          <p>
            xxx
          </p>
        </div>
        <div className="image-container">
          <img src="/cowboy.jpg" alt="bebop" />
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
          min-height: calc(100vh - 50px);
          box-sizing: border-box;
          padding: 2rem;
          gap: 2rem;
          justify-content: center;
          align-items: flex-start;
        }

        .text-content {
          flex: 1;
          padding-right: 2rem;
          max-width: 700px;
          line-height: 1.6;
          color: #333;
        }

        .text-content h1 {
          font-size: 2.5em;
          margin-bottom: 1rem;
          color: #222;
        }

        .text-content p {
          margin-bottom: 1em;
        }

        .image-container {
          flex: 0 0 auto;
          width: 450px;
          height: 650px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #ddd;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 768px) {
          main {
            flex-direction: column;
            padding: 1rem;
            align-items: center;
          }

          .text-content {
            padding-right: 0;
            max-width: 100%;
          }

          .image-container {
            width: 90%;
            height: 350px;
            margin-top: 2rem;
          }
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
    </>
  );
}