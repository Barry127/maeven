import { act, fireEvent, render } from '@testing-library/react';
import { activity, circle as circleIcon } from 'icon-packs/cjs/feather';
import React, { createRef, MouseEvent } from 'react';
import maeven from '../../../themes/maeven';
import { ThemeProvider } from '../../ThemeProvider';
import { Alert } from './Alert';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Alert', () => {
  it('renders alert with given text', () => {
    render(<Alert>Hello world!</Alert>);
    const element = document.querySelector('.mvn--alert');
    expect(element?.tagName).toBe('DIV');
    expect(element).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(<Alert className="alert-class">Hello world!</Alert>);
    const element = document.querySelector('.mvn--alert');
    expect(element).toHaveClass('alert-class');
  });

  it('passes props', () => {
    render(
      <Alert id="AlertId" data-test="alert-data">
        Hello world!
      </Alert>
    );
    const element = document.querySelector('.mvn--alert');
    expect(element).toHaveAttribute('id', 'AlertId');
    expect(element).toHaveAttribute('data-test', 'alert-data');
  });

  describe('afterClose', () => {
    it('calls afterClose when the alert is closed', async () => {
      const afterClose = jest.fn();
      render(<Alert afterClose={afterClose} springConfig={{ duration: 10 }} />);
      const closeButton = document.querySelector('button') as HTMLButtonElement;
      await act(async () => {
        fireEvent.click(closeButton);

        // Does not close at once
        expect(afterClose.mock.calls).toHaveLength(0);

        await sleep(50);

        expect(afterClose.mock.calls).toHaveLength(1);
      });
    });

    it('does not call afterClose when onClose prevents the closing', async () => {
      const afterClose = jest.fn();
      const onClose = (ev: MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
      };

      render(
        <Alert
          afterClose={afterClose}
          onClose={onClose}
          springConfig={{ duration: 10 }}
        />
      );
      const closeButton = document.querySelector('button') as HTMLButtonElement;
      await act(async () => {
        fireEvent.click(closeButton);

        // Does not close at once
        expect(afterClose.mock.calls).toHaveLength(0);

        await sleep(50);

        expect(afterClose.mock.calls).toHaveLength(0);
      });
    });
  });

  describe('afterOpen', () => {
    it('calls afterOpen when the alert is closed', async () => {
      const afterOpen = jest.fn();
      const { rerender } = render(
        <Alert
          afterOpen={afterOpen}
          isOpen={false}
          springConfig={{ duration: 10 }}
        />
      );

      await act(async () => {
        rerender(
          <Alert
            afterOpen={afterOpen}
            isOpen={true}
            springConfig={{ duration: 10 }}
          />
        );

        // Does not open at once
        expect(afterOpen.mock.calls).toHaveLength(0);

        await sleep(50);

        expect(afterOpen.mock.calls).toHaveLength(1);
      });
    });

    it('has no afterOpen by default', async () => {
      const { rerender } = render(
        <Alert isOpen={false} springConfig={{ duration: 10 }} />
      );

      await act(async () => {
        rerender(<Alert isOpen={true} springConfig={{ duration: 10 }} />);
        await sleep(50);
      });
    });
  });

  describe('animateOnOpen', () => {
    it('does not animate by default', () => {
      render(<Alert />);
      const element = document.querySelector('.mvn--alert') as HTMLDivElement;

      expect(Number(element.style.opacity)).toBe(1);
    });

    it('animates on open', async () => {
      render(<Alert animateOnOpen springConfig={{ duration: 10 }} />);
      const element = document.querySelector('.mvn--alert') as HTMLDivElement;

      expect(Math.round(Number(element.style.opacity))).toBe(0);

      await act(async () => {
        await sleep(50);
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

  describe('closeIcon', () => {
    it('defaults to close', () => {
      render(<Alert showIcon={false} />);
      const circle = document.querySelector('circle');
      const line = document.querySelector('line');
      expect(circle).not.toBeInTheDocument();
      expect(line).toBeInTheDocument();
    });

    it('overrides closeIcon icon from theme', () => {
      const theme = {
        ...maeven,
        iconOverrides: {
          close: circleIcon
        }
      };
      render(
        <ThemeProvider theme={theme}>
          <Alert showIcon={false} />
        </ThemeProvider>
      );
      const circle = document.querySelector('circle');
      const line = document.querySelector('line');
      expect(circle).toBeInTheDocument();
      expect(line).not.toBeInTheDocument();
    });
  });

  describe('dangerIcon', () => {
    it('defaults to danger', () => {
      render(<Alert type="danger" closable={false} />);
      const circle = document.querySelector('circle');
      const polyline = document.querySelector('polyline');
      expect(circle).toBeInTheDocument();
      expect(polyline).not.toBeInTheDocument();
    });

    it('sets icon', () => {
      render(<Alert type="danger" icon={activity} closable={false} />);
      const circle = document.querySelector('circle');
      const polyline = document.querySelector('polyline');
      expect(circle).not.toBeInTheDocument();
      expect(polyline).toBeInTheDocument();
    });

    it('overrides danger icon from theme', () => {
      const theme = {
        ...maeven,
        iconOverrides: {
          danger: activity
        }
      };
      render(
        <ThemeProvider theme={theme}>
          <Alert type="danger" closable={false} />
        </ThemeProvider>
      );
      const circle = document.querySelector('circle');
      const polyline = document.querySelector('polyline');
      expect(circle).not.toBeInTheDocument();
      expect(polyline).toBeInTheDocument();
    });
  });

  describe('infoIcon', () => {
    it('defaults to info', () => {
      render(<Alert type="info" closable={false} />);
      const circle = document.querySelector('circle');
      const polyline = document.querySelector('polyline');
      expect(circle).toBeInTheDocument();
      expect(polyline).not.toBeInTheDocument();
    });

    it('sets icon', () => {
      render(<Alert type="info" icon={activity} closable={false} />);
      const circle = document.querySelector('circle');
      const polyline = document.querySelector('polyline');
      expect(circle).not.toBeInTheDocument();
      expect(polyline).toBeInTheDocument();
    });

    it('overrides info icon from theme', () => {
      const theme = {
        ...maeven,
        iconOverrides: {
          info: activity
        }
      };
      render(
        <ThemeProvider theme={theme}>
          <Alert type="info" closable={false} />
        </ThemeProvider>
      );
      const circle = document.querySelector('circle');
      const polyline = document.querySelector('polyline');
      expect(circle).not.toBeInTheDocument();
      expect(polyline).toBeInTheDocument();
    });
  });

  describe('isOpen', () => {
    it('is visible when isOpen is true', () => {
      render(<Alert isOpen />);
      const element = document.querySelector('.mvn--alert');
      expect(element).toBeInTheDocument();
    });

    it('is not visible when isOpen is false', () => {
      render(<Alert isOpen={false} />);
      const element = document.querySelector('.mvn--alert');
      expect(element).not.toBeInTheDocument();
    });

    it('is visible (uncontrolled) when isOpen is not set', () => {
      render(<Alert />);
      const element = document.querySelector('.mvn--alert');
      expect(element).toBeInTheDocument();
    });
  });

  describe('onClose', () => {
    it('calls onClose', async () => {
      const onClose = jest.fn();
      render(<Alert onClose={onClose} springConfig={{ duration: 10 }} />);
      const element = document.querySelector('.mvn--alert');
      const closeButton = document.querySelector('button') as HTMLButtonElement;

      expect(element).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(closeButton);
        expect(onClose.mock.calls).toHaveLength(1);

        await sleep(50);
        expect(element).not.toBeInTheDocument();
      });
    });

    it('does not close when ev.preventDefault is called in onClose', async () => {
      const onClose = (ev: MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
      };
      render(<Alert onClose={onClose} springConfig={{ duration: 10 }} />);
      const element = document.querySelector('.mvn--alert');
      const closeButton = document.querySelector('button') as HTMLButtonElement;

      expect(element).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(closeButton);

        await sleep(50);
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

        await sleep(40);
        expect(afterClose.mock.calls).toHaveLength(0);

        await sleep(50);
        expect(afterClose.mock.calls).toHaveLength(1);
      });
    });
  });

  describe('successIcon', () => {
    it('defaults to success', () => {
      render(<Alert type="success" closable={false} />);
      const circle = document.querySelector('circle');
      const polyline = document.querySelector('polyline');
      expect(circle).not.toBeInTheDocument();
      expect(polyline).toBeInTheDocument();
    });

    it('sets icon', () => {
      render(<Alert type="success" icon={circleIcon} closable={false} />);
      const circle = document.querySelector('circle');
      const polyline = document.querySelector('polyline');
      expect(circle).toBeInTheDocument();
      expect(polyline).not.toBeInTheDocument();
    });

    it('overrides success icon from theme', () => {
      const theme = {
        ...maeven,
        iconOverrides: {
          success: circleIcon
        }
      };
      render(
        <ThemeProvider theme={theme}>
          <Alert type="success" closable={false} />
        </ThemeProvider>
      );
      const circle = document.querySelector('circle');
      const polyline = document.querySelector('polyline');
      expect(circle).toBeInTheDocument();
      expect(polyline).not.toBeInTheDocument();
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
      const element = document.querySelector('.mvn--alert');
      expect(element).toHaveClass('info');
    });

    it('sets warning type', () => {
      render(<Alert type="warning" />);
      const element = document.querySelector('.mvn--alert');
      expect(element).toHaveClass('warning');
    });
  });

  describe('warningIcon', () => {
    it('defaults to warning', () => {
      render(<Alert type="warning" closable={false} />);
      const circle = document.querySelector('circle');
      const line = document.querySelector('line');
      expect(circle).not.toBeInTheDocument();
      expect(line).toBeInTheDocument();
    });

    it('sets icon', () => {
      render(<Alert type="warning" icon={circleIcon} closable={false} />);
      const circle = document.querySelector('circle');
      const line = document.querySelector('line');
      expect(circle).toBeInTheDocument();
      expect(line).not.toBeInTheDocument();
    });

    it('overrides warning icon from theme', () => {
      const theme = {
        ...maeven,
        iconOverrides: {
          warning: circleIcon
        }
      };
      render(
        <ThemeProvider theme={theme}>
          <Alert type="warning" closable={false} />
        </ThemeProvider>
      );
      const circle = document.querySelector('circle');
      const line = document.querySelector('line');
      expect(circle).toBeInTheDocument();
      expect(line).not.toBeInTheDocument();
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Alert ref={ref} />);
      const element = document.querySelector('.mvn--alert');
      expect(ref.current).toBe(element);
    });
  });
});
