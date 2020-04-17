import '@testing-library/jest-dom/extend-expect';

import React, { MouseEvent, createRef } from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { circle } from 'icon-packs/cjs/feather';

import { Alert, AlertF } from './Alert';
import { Alert as ExportedAlert } from '../';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('Alert', () => {
  it('renders alert with icon and given text', () => {
    render(<Alert>Hello world!</Alert>);
    const element = document.querySelector('.mvn-alert');
    expect(element).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(<Alert className="alert-class">Hello world!</Alert>);
    const element = document.querySelector('.mvn-alert');
    expect(element).toHaveClass('alert-class');
  });

  it('passes props', () => {
    render(
      <Alert id="AlertId" data-test="alert-data">
        Hello world!
      </Alert>
    );
    const element = document.querySelector('.mvn-alert') as HTMLDivElement;
    expect(element).toHaveAttribute('id', 'AlertId');
    expect(element.dataset.test).toBe('alert-data');
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

        await delay(50);

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

        await delay(50);

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

        await delay(50);

        expect(afterOpen.mock.calls).toHaveLength(1);
      });
    });

    it('has no afterOpen by default', async () => {
      const { rerender } = render(
        <Alert isOpen={false} springConfig={{ duration: 10 }} />
      );

      await act(async () => {
        rerender(<Alert isOpen={true} springConfig={{ duration: 10 }} />);
        await delay(50);
      });
    });
  });

  describe('animateOnOpen', () => {
    it('does not animate by default', () => {
      render(<Alert />);
      const element = document.querySelector('.mvn-alert') as HTMLDivElement;

      expect(Number(element.style.opacity)).toBe(1);
    });

    it('animates on open', async () => {
      render(<Alert animateOnOpen springConfig={{ duration: 10 }} />);
      const element = document.querySelector('.mvn-alert') as HTMLDivElement;

      expect(Math.round(Number(element.style.opacity))).toBe(0);

      await act(async () => {
        await delay(50);
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
      const element = document.querySelector('.mvn-alert');
      expect(element).toBeInTheDocument();
    });

    it('is not visible when isOpen is false', () => {
      render(<Alert isOpen={false} />);
      const element = document.querySelector('.mvn-alert');
      expect(element).not.toBeInTheDocument();
    });

    it('is visible (uncontrolled) when isOpen is not set', () => {
      render(<Alert />);
      const element = document.querySelector('.mvn-alert');
      expect(element).toBeInTheDocument();
    });
  });

  describe('onClose', () => {
    it('calls onClose', async () => {
      const onClose = jest.fn();
      render(<Alert onClose={onClose} springConfig={{ duration: 10 }} />);
      const element = document.querySelector('.mvn-alert');
      const closeButton = document.querySelector('button') as HTMLButtonElement;

      expect(element).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(closeButton);
        expect(onClose.mock.calls).toHaveLength(1);

        await delay(50);
        expect(element).not.toBeInTheDocument();
      });
    });

    it('does not close when ev.preventDefault is called in onClose', async () => {
      const onClose = (ev: MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
      };
      render(<Alert onClose={onClose} springConfig={{ duration: 10 }} />);
      const element = document.querySelector('.mvn-alert');
      const closeButton = document.querySelector('button') as HTMLButtonElement;

      expect(element).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(closeButton);

        await delay(50);
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
      const element = document.querySelector('.mvn-alert');
      expect(element).toHaveClass('mvn-alert-info');
    });

    it('sets warning type', () => {
      render(<Alert type="warning" />);
      const element = document.querySelector('.mvn-alert');
      expect(element).toHaveClass('mvn-alert-warning');
    });
  });

  describe('forwarding ref', () => {
    it('exports AlertForwardRef', () => {
      expect(ExportedAlert).toBe(AlertF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<AlertF ref={ref} />);
      const element = document.querySelector('.mvn-alert');
      expect(ref.current).toBe(element);
    });
  });
});