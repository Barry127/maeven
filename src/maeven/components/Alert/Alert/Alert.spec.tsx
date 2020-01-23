import '@testing-library/jest-dom/extend-expect';

import React, { MouseEvent } from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { circle } from 'icon-packs/cjs/feather';

import { MaevenDefault, ThemeProvider } from '../../..';

import { Alert } from './Alert';
import { classes, themeOverride } from './styles';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('Alert', () => {
  it('renders alert with icon and given text', () => {
    render(<Alert>Hello world!</Alert>);
    const element = document.querySelector(
      `.${classes.alert.split(' ').join('.')}`
    );
    expect(element).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(<Alert className="alert-class">Hello world!</Alert>);
    const element = document.querySelector(
      `.${classes.alert.split(' ').join('.')}`
    );
    expect(element).toHaveClass('alert-class');
  });

  it('passes props', () => {
    render(
      <Alert id="AlertId" data-test="alert-data">
        Hello world!
      </Alert>
    );
    const element = document.querySelector(
      `.${classes.alert.split(' ').join('.')}`
    ) as HTMLDivElement;
    expect(element).toHaveAttribute('id', 'AlertId');
    expect(element.dataset.test).toBe('alert-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        Alert: {
          color: 'tomato'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    render(
      <ThemeProvider theme={theme}>
        <Alert>Hello world!</Alert>
      </ThemeProvider>
    );
    const element = document.querySelector(
      `.${classes.alert.split(' ').join('.')}`
    );
    expect(element).toHaveClass(expectedClassName);
  });

  it('styles Theme close icon override', () => {
    const theme = {
      ...MaevenDefault,
      iconOverrides: {
        close: circle
      }
    };

    render(
      <ThemeProvider theme={theme}>
        <Alert showIcon={false}>Hello world!</Alert>
      </ThemeProvider>
    );
    const circleEl = document.querySelector('circle');
    expect(circleEl).toBeInTheDocument();
  });

  it('styles Theme icon overrides', () => {
    const theme = {
      ...MaevenDefault,
      iconOverrides: {
        danger: circle,
        info: circle,
        success: circle,
        warning: circle
      }
    };

    render(
      <ThemeProvider theme={theme}>
        <Alert closable={false} type="info">
          Hello world!
        </Alert>
        <Alert closable={false} type="success">
          Hello world!
        </Alert>
        <Alert closable={false} type="warning">
          Hello world!
        </Alert>
        <Alert closable={false} type="danger">
          Hello world!
        </Alert>
      </ThemeProvider>
    );
    const circles = document.querySelectorAll('circle');
    const lines = document.querySelectorAll('line');
    expect(circles).toHaveLength(4);
    expect(lines).toHaveLength(0);
  });

  describe('afterClose', () => {
    it('calls afterClose when the alert is closed', async () => {
      const afterClose = jest.fn();
      render(<Alert afterClose={afterClose} />);
      const closeButton = document.querySelector('button') as HTMLButtonElement;
      await act(async () => {
        fireEvent.click(closeButton);

        // Does not close at once
        expect(afterClose.mock.calls).toHaveLength(0);

        await delay(1000);

        expect(afterClose.mock.calls).toHaveLength(1);
      });
    });

    it('does not call afterClose when onClose prevents the closing', async () => {
      const afterClose = jest.fn();
      const onClose = (ev: MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
      };

      render(<Alert afterClose={afterClose} onClose={onClose} />);
      const closeButton = document.querySelector('button') as HTMLButtonElement;
      await act(async () => {
        fireEvent.click(closeButton);

        // Does not close at once
        expect(afterClose.mock.calls).toHaveLength(0);

        await delay(1000);

        expect(afterClose.mock.calls).toHaveLength(0);
      });
    });
  });

  describe('afterOpen', () => {
    it('calls afterOpen when the alert is closed', async () => {
      const afterOpen = jest.fn();
      const { rerender } = render(
        <Alert afterOpen={afterOpen} isOpen={false} />
      );

      await act(async () => {
        rerender(<Alert afterOpen={afterOpen} isOpen={true} />);

        // Does not open at once
        expect(afterOpen.mock.calls).toHaveLength(0);

        await delay(1000);

        expect(afterOpen.mock.calls).toHaveLength(1);
      });
    });
  });

  describe('animateOnOpen', () => {
    it('does not animate by default', () => {
      render(<Alert />);
      const element = document.querySelector(
        `.${classes.alert.split(' ').join('.')}`
      ) as HTMLDivElement;

      expect(Number(element.style.opacity)).toBe(1);
    });

    it('animates on open', async () => {
      render(<Alert animateOnOpen />);
      const element = document.querySelector(
        `.${classes.alert.split(' ').join('.')}`
      ) as HTMLDivElement;

      expect(Math.round(Number(element.style.opacity))).toBe(0);

      await act(async () => {
        await delay(1000);
        expect(Number(element.style.opacity)).toBe(1);
      });
    });
  });

  describe('closable', () => {
    it('is closable by default', () => {
      render(<Alert />);
      const closeButton = document.querySelector('button');
      expect(closeButton).toBeInTheDocument();
    });

    it('sets closable', () => {
      render(<Alert closable={false} />);
      const closeButton = document.querySelector('button');
      expect(closeButton).not.toBeInTheDocument();
    });
  });

  describe('icon', () => {
    it('has a default icon', () => {
      render(<Alert closable={false} />);
      const circles = document.querySelectorAll('circle');
      const lines = document.querySelectorAll('line');
      expect(circles).toHaveLength(1);
      expect(lines).toHaveLength(2);
    });

    it('sets custom icon', () => {
      render(<Alert icon={circle} closable={false} />);
      const circles = document.querySelectorAll('circle');
      const lines = document.querySelectorAll('line');
      expect(circles).toHaveLength(1);
      expect(lines).toHaveLength(0);
    });
  });

  describe('isOpen', () => {
    it('is visible when isOpen is true', () => {
      render(<Alert isOpen />);
      const element = document.querySelector(
        `.${classes.alert.split(' ').join('.')}`
      );
      expect(element).toBeInTheDocument();
    });

    it('is not visible when isOpen is false', () => {
      render(<Alert isOpen={false} />);
      const element = document.querySelector(
        `.${classes.alert.split(' ').join('.')}`
      );
      expect(element).not.toBeInTheDocument();
    });

    it('is visible (uncontrolled) when isOpen is not set', () => {
      render(<Alert />);
      const element = document.querySelector(
        `.${classes.alert.split(' ').join('.')}`
      );
      expect(element).toBeInTheDocument();
    });
  });

  describe('onClose', () => {
    it('calls onClose', async () => {
      const onClose = jest.fn();
      render(<Alert onClose={onClose} />);
      const element = document.querySelector(
        `.${classes.alert.split(' ').join('.')}`
      );
      const closeButton = document.querySelector('button') as HTMLButtonElement;

      expect(element).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(closeButton);
        expect(onClose.mock.calls).toHaveLength(1);

        await delay(1000);
        expect(element).not.toBeInTheDocument();
      });
    });

    it('does not close when ev.preventDefault is called in onClose', async () => {
      const onClose = (ev: MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
      };
      render(<Alert onClose={onClose} />);
      const element = document.querySelector(
        `.${classes.alert.split(' ').join('.')}`
      );
      const closeButton = document.querySelector('button') as HTMLButtonElement;

      expect(element).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(closeButton);

        await delay(1000);
        expect(element).toBeInTheDocument();
      });
    });
  });

  describe('showIcon', () => {
    it('shows icon by default', () => {
      render(<Alert closable={false} />);
      const icon = document.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('hides icon', () => {
      render(<Alert showIcon={false} closable={false} />);
      const icon = document.querySelector('svg');
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe('springConfig', () => {
    it('sets springConfig', async () => {
      const springConfig = { duration: 50 };
      const afterClose = jest.fn();
      render(<Alert afterClose={afterClose} springConfig={springConfig} />);
      const closeButton = document.querySelector('button') as HTMLButtonElement;

      await act(async () => {
        fireEvent.click(closeButton);
        expect(afterClose.mock.calls).toHaveLength(0);

        await delay(40);
        expect(afterClose.mock.calls).toHaveLength(0);

        await delay(50);
        expect(afterClose.mock.calls).toHaveLength(1);
      });
    });
  });

  describe('title', () => {
    it('has no title by default', () => {
      render(<Alert />);
      const title = document.querySelector('strong');
      expect(title).not.toBeInTheDocument();
    });

    it('sets title', () => {
      render(<Alert title="Hello" />);
      const title = document.querySelector('strong');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Hello');
    });
  });

  describe('type', () => {
    it('is info by default', () => {
      render(<Alert />);
      const element = document.querySelector(
        `.${classes.alert.split(' ').join('.')}`
      );
      expect(element).toHaveClass(classes.info);
    });

    it('sets warning type', () => {
      render(<Alert type="warning" />);
      const element = document.querySelector(
        `.${classes.alert.split(' ').join('.')}`
      );
      expect(element).toHaveClass(classes.warning);
    });
  });
});
