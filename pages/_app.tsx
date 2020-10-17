import { MDXProvider } from 'docsComponents/MDXProvider';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { FC } from 'react';
import { ThemeProvider } from 'src/components/ThemeProvider/ThemeProvider';
import maeven from 'src/themes/maeven';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <MDXProvider>
    <Head>
      <link rel="shortcut icon" href="/maeven/favicon.ico" />
      <title>Maeven</title>
    </Head>
    <ThemeProvider theme={maeven}>
      <nav>NAVBAR</nav>
      <Component {...pageProps} />
    </ThemeProvider>
  </MDXProvider>
);

export default App;
