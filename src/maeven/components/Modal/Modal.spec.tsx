import '@testing-library/jest-dom/extend-expect';
import ResizeObserver from 'resize-observer-polyfill';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { circle } from 'icon-packs/cjs/feather';

import { Modal } from './Modal';

//@ts-ignore
window.ResizeObserver = ResizeObserver;

describe('Modal', () => {
  it('renders modal element with given text', () => {
    const { getByText } = render(<Modal isOpen>Hello world!</Modal>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('DIV');
  });

  it('sets className', () => {
    render(
      <Modal isOpen className="modal-class">
        Hello world!
      </Modal>
    );

    const element = document.querySelector('.mvn-modal');
    expect(element).toHaveClass('modal-class');
  });

  it('passes props', () => {
    render(
      <Modal isOpen id="ModalId" data-test="modal-data">
        Hello world!
      </Modal>
    );

    const element = document.querySelector('.mvn-modal') as HTMLDivElement;
    expect(element).toHaveAttribute('id', 'ModalId');
    expect(element.dataset.test).toBe('modal-data');
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

  describe('icon', () => {
    it('has no icon by default', () => {
      render(
        <Modal isOpen title="Hello">
          Hello world!
        </Modal>
      );

      const icon = document.querySelector('h3 svg');
      expect(icon).not.toBeInTheDocument();
    });

    it('sets icon', () => {
      render(
        <Modal icon={circle} isOpen title="Hello">
          Hello world!
        </Modal>
      );

      const icon = document.querySelector('h3 svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('isOpen', () => {
    it('sets isOpen as true', () => {
      render(<Modal isOpen>Hello world!</Modal>);

      const modalElement = document.querySelector('.mvn-modal');
      expect(modalElement).toBeInTheDocument();
    });

    it('sets isOpen as false', () => {
      render(<Modal isOpen={false}>Hello world!</Modal>);

      const modalElement = document.querySelector('.mvn-modal');
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

      const element = document.querySelector('.mvn-modal');

      expect(element).toHaveStyle('width: 576px');
    });

    it('sets sm', () => {
      render(
        <Modal isOpen size="sm">
          Hello world!
        </Modal>
      );

      const element = document.querySelector('.mvn-modal');

      expect(element).toHaveStyle('width: 300px');
    });

    it('sets lg', () => {
      render(
        <Modal isOpen size="lg">
          Hello world!
        </Modal>
      );

      const element = document.querySelector('.mvn-modal');

      expect(element).toHaveStyle('width: 864px');
    });

    it('sets xl', () => {
      render(
        <Modal isOpen size="xl">
          Hello world!
        </Modal>
      );

      const element = document.querySelector('.mvn-modal');

      expect(element).toHaveStyle('width: 1152px');
    });
  });

  describe('title', () => {
    it('has no title by default', () => {
      render(<Modal isOpen>Hello world!</Modal>);

      const title = document.querySelector('.mvn-modal-title');
      expect(title).not.toBeInTheDocument();
    });

    it('sets title', () => {
      render(
        <Modal isOpen title="Hello title">
          Hello world!
        </Modal>
      );

      const title = document.querySelector('.mvn-modal-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Hello title');
    });
  });

  describe('type', () => {
    it('has no type by default', () => {
      render(<Modal isOpen>Hello world!</Modal>);

      const element = document.querySelector('.mvn-modal');

      expect(element).not.toHaveClass('mvn-modal-primary');
      expect(element).not.toHaveClass('mvn-modal-success');
      expect(element).not.toHaveClass('mvn-modal-warning');
      expect(element).not.toHaveClass('mvn-modal-danger');
    });

    it('sets primary', () => {
      render(
        <Modal isOpen type="primary">
          Hello world!
        </Modal>
      );

      const element = document.querySelector('.mvn-modal');

      expect(element).toHaveClass('mvn-modal-primary');
      expect(element).not.toHaveClass('mvn-modal-success');
      expect(element).not.toHaveClass('mvn-modal-warning');
      expect(element).not.toHaveClass('mvn-modal-danger');
    });

    it('sets success', () => {
      render(
        <Modal isOpen type="success">
          Hello world!
        </Modal>
      );

      const element = document.querySelector('.mvn-modal');

      expect(element).not.toHaveClass('mvn-modal-primary');
      expect(element).toHaveClass('mvn-modal-success');
      expect(element).not.toHaveClass('mvn-modal-warning');
      expect(element).not.toHaveClass('mvn-modal-danger');
    });

    it('sets warning', () => {
      render(
        <Modal isOpen type="warning">
          Hello world!
        </Modal>
      );

      const element = document.querySelector('.mvn-modal');

      expect(element).not.toHaveClass('mvn-modal-primary');
      expect(element).not.toHaveClass('mvn-modal-success');
      expect(element).toHaveClass('mvn-modal-warning');
      expect(element).not.toHaveClass('mvn-modal-danger');
    });

    it('sets danger', () => {
      render(
        <Modal isOpen type="danger">
          Hello world!
        </Modal>
      );

      const element = document.querySelector('.mvn-modal');

      expect(element).not.toHaveClass('mvn-modal-primary');
      expect(element).not.toHaveClass('mvn-modal-success');
      expect(element).not.toHaveClass('mvn-modal-warning');
      expect(element).toHaveClass('mvn-modal-danger');
    });
  });
});
