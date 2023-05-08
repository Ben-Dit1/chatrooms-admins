import { Navbar } from '@/components/Navbar/Navbar';
import { RainbowProvider } from '@/hooks/useRainbow';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <RainbowProvider>
            <Navbar />
            <Component {...pageProps} />
          </RainbowProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
