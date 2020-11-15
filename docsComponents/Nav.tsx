import clsx from 'clsx';
import { moon, sun } from 'icon-packs/feather';
import { Block, Col, Container, Link, Toggle, Row, useDarkMode } from 'maeven';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import classes from './nav.module.scss';

export const Nav: FC = () => {
  const router = useRouter();
  const [isDark, toggleDark] = useDarkMode();

  return (
    <Block element="nav" background="textBackground" className={classes.nav}>
      <Container className={classes.container} fluid>
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
            <Toggle
              checked={!isDark}
              onChange={toggleDark}
              onIcon={sun}
              offIcon={moon}
              className={classes.toggle}
            />
          </Col>
        </Row>
      </Container>
    </Block>
  );
};
