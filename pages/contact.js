// pages/contact.js
import Head from "next/head";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      <Head>
        <title>contact</title>
      </Head>
      <header>
        <Link href="/">home</Link>
        <Link href="/portfolio">portfolio</Link>
        <Link href="/about">about</Link>
        <Link href="/contact">contact</Link>
      </header>
      <div></div>
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
