import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import { AlertGroup, AlertGroupF } from './AlertGroup';
import { AlertGroup as ExportedAlertGroup } from '../';
import { Alert } from '../';

describe('AlertGroup', () => {
  it('renders div element with given children', () => {
    render(
      <AlertGroup>
        <Alert closable={false}>Alert 1</Alert>
        <Alert type="success">Alert 2</Alert>
        <p>Alert 3</p>
      </AlertGroup>
    );
    const element = document.querySelector('.mvn-alert-group');
    expect(element).toHaveTextContent('1 / 2Alert 1');
  });

  it('sets className', () => {
    render(
      <AlertGroup className="alertgroup-class">
        <Alert />
      </AlertGroup>
    );
    const element = document.querySelector('.mvn-alert-group');
    expect(element).toHaveClass('alertgroup-class');
  });

  it('passes props', () => {
    render(
      <AlertGroup id="AlertGroupId" data-test="alertgroup-data">
        <Alert />
      </AlertGroup>
    );
    const element = document.querySelector(
      '.mvn-alert-group'
    ) as HTMLDivElement;
    expect(element).toHaveAttribute('id', 'AlertGroupId');
    expect(element.dataset.test).toBe('alertgroup-data');
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

    const element = document.querySelector('.mvn-alert-group');
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

    const nav = document.querySelector('.mvn-alert-group-nav');
    expect(nav).toHaveTextContent('1 / 2');
  });

  it('does not render nav with only one Alert child', () => {
    render(
      <AlertGroup>
        <Alert>Alert 1</Alert>
      </AlertGroup>
    );

    const nav = document.querySelector('.mvn-alert-group-nav');
    expect(nav).not.toBeInTheDocument();
  });

  it('does not render an AlertGroup when there are no Children', () => {
    render(<AlertGroup />);
    const element = document.querySelector('.mvn-alert-group');
    expect(element).not.toBeInTheDocument();
  });

  describe('forwarding ref', () => {
    it('exports AlertGroupForwardRef', () => {
      expect(ExportedAlertGroup).toBe(AlertGroupF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<AlertGroupF ref={ref} />);
      const element = document.querySelector('.mvn-alert-group');
      expect(ref.current).toBe(element);
    });
  });
});
