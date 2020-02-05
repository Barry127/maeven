import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render, act } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../..';

import { Spinner } from './Spinner';
import { classes, themeOverride } from './styles';

describe('Spinner', () => {
  it('renders spinner with given text', () => {
    render(<Spinner text="Hello world" />);
    const element = document.querySelector('.maeven-spinner');
    const svg = document.querySelector('svg');
    expect(element).toBeInTheDocument();
    expect(svg).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello world');
  });

  it('renders spinner with given text and children', () => {
    render(<Spinner text="Hello world">Content Text</Spinner>);
    const element = document.querySelector('.maeven-spinner');
    const content = document.querySelector(`.${classes.content}`);
    const svg = document.querySelector('svg');
    expect(element).toBeInTheDocument();
    expect(svg).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello world');
    expect(content).toHaveTextContent('Content Text');
  });

  it('sets className', () => {
    render(<Spinner className="spinner-class" />);
    const element = document.querySelector('.maeven-spinner');
    expect(element).toHaveClass('spinner-class');
  });

  it('passes props', () => {
    render(<Spinner id="SpinnerId" data-test="spinner-data" />);
    const element = document.querySelector('.maeven-spinner') as HTMLDivElement;
    expect(element).toHaveAttribute('id', 'SpinnerId');
    expect(element.dataset.test).toBe('spinner-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        Spinner: {
          color: 'aqua'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    render(
      <ThemeProvider theme={theme}>
        <Spinner />
      </ThemeProvider>
    );
    const element = document.querySelector('.maeven-spinner') as HTMLDivElement;
    expect(element).toHaveClass(expectedClassName);
  });

  describe('color', () => {
    it('sets pink color', () => {
      render(<Spinner color="pink" />);
      const element = document.querySelector(
        '.maeven-spinner'
      ) as HTMLDivElement;
      expect(element).toHaveClass(classes.color.pink);
    });

    it('sets primary color', () => {
      render(<Spinner color="primary" />);
      const element = document.querySelector('.maeven-spinner');
      expect(element).toHaveClass(classes.color.primary);
    });
  });

  describe('delay', () => {
    it('has no delay by default', () => {
      const { rerender } = render(<Spinner spinning={false}>Content</Spinner>);
      const container = document.querySelector(`.${classes.container}`);

      expect(container).not.toHaveClass(classes.isSpinning);

      rerender(<Spinner spinning={true}>Content</Spinner>);

      expect(container).toHaveClass(classes.isSpinning);
    });

    it('sets delay', () => {
      jest.useFakeTimers();

      const { rerender } = render(
        <Spinner delay={100} spinning={false}>
          Content
        </Spinner>
      );
      const container = document.querySelector(`.${classes.container}`);

      expect(container).not.toHaveClass(classes.isSpinning);

      rerender(
        <Spinner delay={100} spinning={true}>
          Content
        </Spinner>
      );

      expect(container).not.toHaveClass(classes.isSpinning);

      act(() => {
        jest.runAllTimers();
      });

      expect(container).toHaveClass(classes.isSpinning);
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<Spinner />);
      const element = document.querySelector('.maeven-spinner');
      expect(element).toHaveClass(classes.md);
      expect(element).not.toHaveClass(classes.sm);
      expect(element).not.toHaveClass(classes.lg);
    });

    it('sets sm', () => {
      render(<Spinner size="sm" />);
      const element = document.querySelector('.maeven-spinner');
      expect(element).toHaveClass(classes.sm);
      expect(element).not.toHaveClass(classes.md);
      expect(element).not.toHaveClass(classes.lg);
    });

    it('sets lg', () => {
      render(<Spinner size="lg" />);
      const element = document.querySelector('.maeven-spinner');
      expect(element).toHaveClass(classes.lg);
      expect(element).not.toHaveClass(classes.sm);
      expect(element).not.toHaveClass(classes.md);
    });

    it('sets 100', () => {
      render(<Spinner size={100} />);
      const element = document.querySelector('.maeven-spinner');
      expect(element).not.toHaveClass(classes.sm);
      expect(element).not.toHaveClass(classes.md);
      expect(element).not.toHaveClass(classes.lg);
      expect(element).toHaveAttribute('style', 'font-size: 100px;');
    });
  });

  describe('spinning', () => {
    it('is true by default', () => {
      render(<Spinner />);
      const element = document.querySelector('.maeven-spinner');
      expect(element).toBeInTheDocument();
    });

    it('sets false', () => {
      render(<Spinner spinning={false} />);
      const element = document.querySelector('.maeven-spinner');
      expect(element).not.toBeInTheDocument();
    });
  });
});
