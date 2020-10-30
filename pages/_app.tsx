import { Footer } from 'docsComponents/Footer';
import { MDXProvider } from 'docsComponents/MDXProvider';
import { Nav } from 'docsComponents/Nav';
import { SideNav } from 'docsComponents/SideNav';
import { TableOfContent } from 'docsComponents/TableOfContent';
import { Block, Col, Container, Row, ThemeProvider } from 'maeven';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import maeven from 'src/themes/maeven';
import classes from './app.module.scss';
import docsNav from './docs/nav.json';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <React.StrictMode>
      <MDXProvider>
        <Head>
          <link rel="shortcut icon" href="/maeven/favicon.ico" />
          <title>Maeven</title>
        </Head>
        <ThemeProvider theme={maeven}>
          <Block background="textBackground" className={classes.app}>
            <Nav />
            {router.pathname.startsWith('/docs') ? (
              <div className={classes.content}>
                <Row wrap={false}>
                  <SideNav nav={docsNav} />
                  <Col element="main" className={classes.main}>
                    <Container>
                      <Row gutter={1}>
                        <Col md={24} lg={18} xl={18} element="article">
                          <Component {...pageProps} />
                        </Col>
                        <TableOfContent />
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </div>
            ) : (
              <main className={classes.content}>
                <Component {...pageProps} />
              </main>
            )}

            <Footer />
          </Block>
        </ThemeProvider>
      </MDXProvider>
    </React.StrictMode>
  );
};

export default App;
