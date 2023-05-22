import { Navbar } from '@/components/Navbar/Navbar';
import { RainbowProvider } from '@/hooks/useRainbow';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const route = useRouter();

  useEffect(() => {
    if (
      !window.localStorage.getItem('chatrooms') &&
      route.pathname != '/login'
    ) {
      route.push('/login');
    }
  }, [route]);
  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <RainbowProvider>
            <Navbar />
            <Component {...pageProps} />
          </RainbowProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
