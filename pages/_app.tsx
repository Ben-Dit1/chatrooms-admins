import { Navbar } from "@/components/Navbar/Navbar";
import { RainbowProvider } from "@/hooks/useRainbow";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <RainbowProvider>
          <Navbar />
          <Component {...pageProps} />
        </RainbowProvider>
      </RecoilRoot>
    </>
  );
}
