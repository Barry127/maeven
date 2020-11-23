import { fireEvent, render } from '@testing-library/react';
import { circle as circleIcon } from 'icon-packs/cjs/feather';
import React, { createRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { Modal } from './Modal';

describe('Modal', () => {
  beforeAll(() => {
    //@ts-ignore
    window.ResizeObserver = ResizeObserver;
  });

  afterAll(() => {
    //@ts-ignore
    delete window.ResizeObserver;
  });

  it('renders div element with given text', () => {
    render(<Modal isOpen>Hello world!</Modal>);
    const element = document.querySelector('.mvn--modal');
    expect(element?.tagName).toBe('DIV');
  });

  it('sets className', () => {
    render(
      <Modal isOpen className="modal-class">
        Hello world!
      </Modal>
    );
    const element = document.querySelector('.mvn--modal');
    expect(element).toHaveClass('modal-class');
  });

  it('passes props', () => {
    render(
      <Modal isOpen id="ModalId" data-test="modal-data">
        Hello world!
      </Modal>
    );
    const element = document.querySelector('.mvn--modal');
    expect(element).toHaveAttribute('id', 'ModalId');
    expect(element).toHaveAttribute('data-test', 'modal-data');
  });

  describe('closable', () => {
    it('is closable by default', () => {
      render(
        <Modal isOpen title="Hello">
          Hello world!
        </Modal>
      );

      const closeButton = document.querySelector(`button`);
      expect(closeButton).toBeInTheDocument();
    });

    it('sets closable to false', () => {
      render(
        <Modal isOpen title="Hello" closable={false}>
          Hello world!
        </Modal>
      );

      const closeButton = document.querySelector(`button`);
      expect(closeButton).not.toBeInTheDocument();
    });
  });

  describe('color', () => {
    it('has no type by default', () => {
      render(<Modal isOpen>Hello world!</Modal>);

      const element = document.querySelector('.mvn--modal');

      expect(element).not.toHaveClass('primary');
      expect(element).not.toHaveClass('success');
      expect(element).not.toHaveClass('warning');
      expect(element).not.toHaveClass('danger');
    });

    it('sets primary', () => {
      render(
        <Modal isOpen color="primary">
          Hello world!
        </Modal>
      );

      const element = document.querySelector('.mvn--modal');

      expect(element).toHaveClass('primary');
      expect(element).not.toHaveClass('success');
      expect(element).not.toHaveClass('warning');
      expect(element).not.toHaveClass('danger');
    });

    it('sets success', () => {
      render(
        <Modal isOpen color="success">
          Hello world!
        </Modal>
      );

      const element = document.querySelector('.mvn--modal');

      expect(element).not.toHaveClass('primary');
      expect(element).toHaveClass('success');
      expect(element).not.toHaveClass('warning');
      expect(element).not.toHaveClass('danger');
    });

    it('sets warning', () => {
      render(
        <Modal isOpen color="warning">
          Hello world!
        </Modal>
      );

      const element = document.querySelector('.mvn--modal');

      expect(element).not.toHaveClass('primary');
      expect(element).not.toHaveClass('success');
      expect(element).toHaveClass('warning');
      expect(element).not.toHaveClass('danger');
    });

    it('sets danger', () => {
      render(
        <Modal isOpen color="danger">
          Hello world!
        </Modal>
      );

      const element = document.querySelector('.mvn--modal');

      expect(element).not.toHaveClass('primary');
      expect(element).not.toHaveClass('success');
      expect(element).not.toHaveClass('warning');
      expect(element).toHaveClass('danger');
    });
  });

  describe('icon', () => {
    it('has no icon by default', () => {
      render(
        <Modal isOpen title="Hello">
          Hello world!
        </Modal>
      );

      const icon = document.querySelector('h2 svg');
      expect(icon).not.toBeInTheDocument();
    });

    it('sets icon', () => {
      render(
        <Modal icon={circleIcon} isOpen title="Hello">
          Hello world!
        </Modal>
      );

      const icon = document.querySelector('h2 svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('isOpen', () => {
    it('sets isOpen as true', () => {
      render(<Modal isOpen>Hello world!</Modal>);

      const modalElement = document.querySelector('.mvn--modal');
      expect(modalElement).toBeInTheDocument();
    });

    it('sets isOpen as false', () => {
      render(<Modal isOpen={false}>Hello world!</Modal>);

      const modalElement = document.querySelector('.mvn--modal');
      expect(modalElement).not.toBeInTheDocument();
    });
  });

  describe('maximizable', () => {
    it('is not maximizable by default', () => {
      render(
        <Modal isOpen title="Hello" closable={false}>
          Hello world!
        </Modal>
      );

      const maximizeButton = document.querySelector('button');
      expect(maximizeButton).not.toBeInTheDocument();
    });

    it('sets maximizable', () => {
      render(
        <Modal isOpen title="Hello" maximizable closable={false}>
          Hello world!
        </Modal>
      );

      const maximizeButton = document.querySelector(
        'button'
      ) as HTMLButtonElement;
      expect(maximizeButton).toBeInTheDocument();
      expect(maximizeButton).toHaveAttribute('aria-label', 'Maximize modal');

      fireEvent.click(maximizeButton);

      expect(maximizeButton).toHaveAttribute('aria-label', 'Restore modal');

      fireEvent.click(maximizeButton);
      expect(maximizeButton).toHaveAttribute('aria-label', 'Maximize modal');
    });
  });

  describe('onClose', () => {
    it('sets onClose', () => {
      const onClose = jest.fn();

      render(
        <Modal isOpen title="Hello" onClose={onClose}>
          Hello world!
        </Modal>
      );

      const closeButton = document.querySelector('button') as HTMLButtonElement;

      expect(closeButton).toBeInTheDocument();

      fireEvent.click(closeButton);
      expect(onClose.mock.calls).toHaveLength(1);
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<Modal isOpen>Hello world!</Modal>);

      const element = document.querySelector('.mvn--modal');

      expect(element).toHaveStyle('width: 576px');
    });

    it('sets sm', () => {
      render(
        <Modal isOpen size="sm">
          Hello world!
        </Modal>
      );

      const element = document.querySelector('.mvn--modal');

      expect(element).toHaveStyle('width: 300px');
    });

    it('sets lg', () => {
      render(
        <Modal isOpen size="lg">
          Hello world!
        </Modal>
      );

      const element = document.querySelector('.mvn--modal');

      expect(element).toHaveStyle('width: 864px');
    });

    it('sets xl', () => {
      render(
        <Modal isOpen size="xl">
          Hello world!
        </Modal>
      );

      const element = document.querySelector('.mvn--modal');

      expect(element).toHaveStyle('width: 1152px');
    });

    it('sets size as number', () => {
      render(
        <Modal isOpen size={500}>
          Hello world!
        </Modal>
      );

      const element = document.querySelector('.mvn--modal');

      expect(element).toHaveStyle('width: 500px');
    });
  });

  describe('title', () => {
    it('has no title by default', () => {
      render(<Modal isOpen>Hello world!</Modal>);

      const title = document.querySelector('.title');
      expect(title).not.toBeInTheDocument();
    });

    it('sets title', () => {
      render(
        <Modal isOpen title="Hello title">
          Hello world!
        </Modal>
      );

      const title = document.querySelector('.title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Hello title');
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Modal isOpen ref={ref} />);
      const element = document.querySelector('.mvn--modal');
      expect(ref.current).toBe(element);
    });
  });
});
