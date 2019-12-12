import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Container, Block } from 'maeven';

import { Router } from './_data/Router';
import { Nav } from './components/Nav';

export const App: FC = () => (
  <BrowserRouter>
    <Nav />
    <div style={{ marginLeft: 200 }}>
      <Block style={{ minHeight: '100vh' }}>
        <Container element="main" className="main">
          <Router />
        </Container>
      </Block>
    </div>
  </BrowserRouter>
);
