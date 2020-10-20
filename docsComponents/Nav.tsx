import clsx from 'clsx';
import { Block, Col, Container, Link, Row } from 'maeven';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import classes from './nav.module.scss';

export const Nav: FC = () => {
  const router = useRouter();
  const [isDark, setDark] = useState(false);

  useEffect(() => {
    if (isDark) document.body.classList.add('mvn-dark');
    return () => {
      document.body.classList.remove('mvn-dark');
    };
  }, [isDark]);

  return (
    <Block element="nav" background="textBackground" className={classes.nav}>
      <Container fluid>
        <Row align="center">
          <Col>
            <NextLink href="/">
              <Link
                href="/"
                className={clsx({ [classes.active]: router.pathname === '/' })}
              >
                <img
                  src="/maeven/logo.png"
                  className={classes.logo}
                  alt="Maeven Logo"
                />
                <strong>Maeven</strong>
              </Link>
            </NextLink>
            <NextLink href="/docs">
              <Link
                href="/docs"
                className={clsx({
                  [classes.active]: router.pathname.startsWith('/docs')
                })}
              >
                Docs
              </Link>
            </NextLink>
          </Col>
          <Col className={classes.right}>
            <Link href="https://github.com/Barry127/maeven" target="_blank">
              GitHub
            </Link>
            <input
              type="checkbox"
              checked={isDark}
              onChange={(ev) => setDark(ev.target.checked)}
            />
          </Col>
        </Row>
      </Container>
    </Block>
  );
};
