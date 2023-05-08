import { Html, Head, Main, NextScript } from 'next/document';
import { QueryClient } from 'react-query';
import { RecoilRoot } from 'recoil';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
