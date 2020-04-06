import React, { FC, useState, useCallback, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Container, Block } from 'maeven';

import { Router } from './_data/Router';
import { Nav } from './components/Nav';

export const App: FC = () => {
  const [isDark, setDark] = useState(false);

  useEffect(() => {
    if (!isDark) return;

    document.body.classList.add('mvn-dark');

    return () => {
      document.body.classList.remove('mvn-dark');
    };
  }, [isDark]);

  const toggleDark = useCallback(() => {
    setDark(!isDark);
  }, [isDark]);
  return (
    <BrowserRouter>
      <Nav isDark={isDark} toggleDark={toggleDark} />
      <div style={{ marginLeft: 210 }}>
        <Block background="textBackground" style={{ minHeight: '100vh' }}>
          <Container element="main" className="main">
            <Router />
          </Container>
        </Block>
      </div>
    </BrowserRouter>
  );
};
