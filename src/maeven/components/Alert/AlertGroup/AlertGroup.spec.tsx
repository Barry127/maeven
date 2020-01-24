import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../../..';

import { AlertGroup } from './AlertGroup';
import { Alert } from '../';
import { classes, themeOverride } from './styles';

describe('AlertGroup', () => {
  it('renders div element with given children', () => {
    render(
      <AlertGroup>
        <Alert closable={false}>Alert 1</Alert>
        <Alert type="success">Alert 2</Alert>
        <p>Alert 3</p>
      </AlertGroup>
    );
    const element = document.querySelector(
      `.${classes.alertGroup.split(' ').join('.')}`
    );
    expect(element).toHaveTextContent('1 / 2Alert 1');
  });

  it('sets className', () => {
    render(
      <AlertGroup className="alertgroup-class">
        <Alert />
      </AlertGroup>
    );
    const element = document.querySelector(
      `.${classes.alertGroup.split(' ').join('.')}`
    );
    expect(element).toHaveClass('alertgroup-class');
  });

  it('passes props', () => {
    render(
      <AlertGroup id="AlertGroupId" data-test="alertgroup-data">
        <Alert />
      </AlertGroup>
    );
    const element = document.querySelector(
      `.${classes.alertGroup.split(' ').join('.')}`
    ) as HTMLDivElement;
    expect(element).toHaveAttribute('id', 'AlertGroupId');
    expect(element.dataset.test).toBe('alertgroup-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        AlertGroup: {
          color: 'khaki'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    render(
      <ThemeProvider theme={theme}>
        <AlertGroup>
          <Alert />
        </AlertGroup>
      </ThemeProvider>
    );
    const element = document.querySelector(
      `.${classes.alertGroup.split(' ').join('.')}`
    );
    expect(element).toHaveClass(expectedClassName);
  });

  it('makes alert always closable', () => {
    render(
      <AlertGroup>
        <Alert closable={false}>Alert 1</Alert>
      </AlertGroup>
    );
    const closeButton = document.querySelector('button');
    expect(closeButton).toBeInTheDocument();
  });

  it('navigates between alerts', () => {
    render(
      <AlertGroup>
        <Alert closable={false}>Alert 1</Alert>
        <Alert type="success">Alert 2</Alert>
        <p>Alert 3</p>
      </AlertGroup>
    );

    const element = document.querySelector(
      `.${classes.alertGroup.split(' ').join('.')}`
    );
    const buttons = document.querySelectorAll('button');
    const prev = buttons[0] as HTMLButtonElement;
    const next = buttons[1] as HTMLButtonElement;

    expect(element).toHaveTextContent('1 / 2Alert 1');

    act(() => {
      fireEvent.click(next);
    });

    expect(element).toHaveTextContent('2 / 2Alert 2');

    act(() => {
      fireEvent.click(next);
    });

    expect(element).toHaveTextContent('1 / 2Alert 1');

    act(() => {
      fireEvent.click(prev);
    });

    expect(element).toHaveTextContent('2 / 2Alert 2');
  });

  it('filters non-Alert children out', () => {
    render(
      <AlertGroup>
        <Alert closable={false}>Alert 1</Alert>
        <Alert type="success">Alert 2</Alert>
        <p>Alert 3</p>
      </AlertGroup>
    );

    const nav = document.querySelector(`.${classes.nav}`);
    expect(nav).toHaveTextContent('1 / 2');
  });

  it('does not render nav with only one Alert child', () => {
    render(
      <AlertGroup>
        <Alert>Alert 1</Alert>
      </AlertGroup>
    );

    const nav = document.querySelector(`.${classes.nav}`);
    expect(nav).not.toBeInTheDocument();
  });

  it('does not render an AlertGroup when there are no Children', () => {
    render(<AlertGroup />);
    const element = document.querySelector(
      `.${classes.alertGroup.split(' ').join('.')}`
    );
    expect(element).not.toBeInTheDocument();
  });
});
