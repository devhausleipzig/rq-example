import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main className="px-8 py-4">
        <Component {...pageProps} />
      </main>
    </>
  );
}
