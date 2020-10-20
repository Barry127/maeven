import { Footer } from 'docsComponents/Footer';
import { MDXProvider } from 'docsComponents/MDXProvider';
import { Nav } from 'docsComponents/Nav';
import { Block, ThemeProvider } from 'maeven';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { FC } from 'react';
import maeven from 'src/themes/maeven';
import classes from './app.module.scss';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <MDXProvider>
    <Head>
      <link rel="shortcut icon" href="/maeven/favicon.ico" />
      <title>Maeven</title>
    </Head>
    <ThemeProvider theme={maeven}>
      <Block background="textBackground" className={classes.app}>
        <Nav />
        <div className={classes.content}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </Block>
    </ThemeProvider>
  </MDXProvider>
);

export default App;
