import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Router } from './_data/Router';
import { Nav } from './components/Nav';

export const App: FC = () => (
  <BrowserRouter>
    <div style={{ display: 'flex' }}>
      <Nav />
      <div style={{ flexGrow: 1 }}>
        <Router />
      </div>
    </div>
  </BrowserRouter>
);
