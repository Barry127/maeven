import { Block, Container, H1, P } from 'maeven';
import React from 'react';
import classes from './index.module.scss';

const IndexPage = () => (
  <>
    <Block className={classes.hero} background="primary" element="header">
      <Container className={classes.container}>
        <H1 color="inherit">Maeven</H1>
        <P>A React component library for modern web apps</P>
      </Container>
    </Block>
    <Container></Container>
  </>
);

export default IndexPage;
