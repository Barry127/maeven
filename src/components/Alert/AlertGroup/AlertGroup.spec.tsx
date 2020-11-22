import { act, fireEvent, render } from '@testing-library/react';
import { circle as circleIcon } from 'icon-packs/cjs/feather';
import React, { createRef } from 'react';
import maeven from '../../../themes/maeven';
import { ThemeProvider } from '../../ThemeProvider';
import { Alert } from '../Alert';
import { AlertGroup } from './AlertGroup';

describe('AlertGroup', () => {
  it('renders div element with given children', () => {
    render(
      <AlertGroup>
        <Alert closable={false}>Alert 1</Alert>
        <Alert type="success">Alert 2</Alert>
        <p>Alert 3</p>
      </AlertGroup>
    );
    const element = document.querySelector('.mvn--alert-group');
    expect(element?.tagName).toBe('DIV');
    expect(element).toHaveTextContent('1 / 2Alert 1');
  });

  it('sets className', () => {
    render(
      <AlertGroup className="alert-group-class">
        <Alert />
      </AlertGroup>
    );
    const element = document.querySelector('.mvn--alert-group');
    expect(element).toHaveClass('alert-group-class');
  });

  it('passes props', () => {
    render(
      <AlertGroup id="AlertGroupId" data-test="alert-group-data">
        <Alert />
      </AlertGroup>
    );
    const element = document.querySelector('.mvn--alert-group');
    expect(element).toHaveAttribute('id', 'AlertGroupId');
    expect(element).toHaveAttribute('data-test', 'alert-group-data');
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

    const element = document.querySelector('.mvn--alert-group');
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

    const nav = document.querySelector('.nav');
    expect(nav).toHaveTextContent('1 / 2');
  });

  it('does not render nav with only one Alert child', () => {
    render(
      <AlertGroup>
        <Alert>Alert 1</Alert>
      </AlertGroup>
    );

    const nav = document.querySelector('.nav');
    expect(nav).not.toBeInTheDocument();
  });

  it('does not render an AlertGroup when there are no Children', () => {
    render(<AlertGroup />);
    const element = document.querySelector('.mvn--alert-group');
    expect(element).not.toBeInTheDocument();
  });

  describe('chevronLeft icon', () => {
    it('defaults to chevronLeft', () => {
      render(
        <AlertGroup>
          <Alert showIcon={false} />
          <Alert showIcon={false} />
        </AlertGroup>
      );
      const circle = document.querySelectorAll('circle');
      const polyline = document.querySelectorAll('polyline');
      expect(circle).toHaveLength(0);
      expect(polyline).toHaveLength(2);
    });

    it('overrides chevronLeft icon from theme', () => {
      const theme = {
        ...maeven,
        iconOverrides: {
          chevronLeft: circleIcon
        }
      };
      render(
        <ThemeProvider theme={theme}>
          <AlertGroup>
            <Alert showIcon={false} />
            <Alert showIcon={false} />
          </AlertGroup>
        </ThemeProvider>
      );
      const circle = document.querySelectorAll('circle');
      const polyline = document.querySelectorAll('polyline');
      expect(circle).toHaveLength(1);
      expect(polyline).toHaveLength(1);
    });
  });

  describe('chevronRight icon', () => {
    it('defaults to chevronRight', () => {
      render(
        <AlertGroup>
          <Alert showIcon={false} />
          <Alert showIcon={false} />
        </AlertGroup>
      );
      const circle = document.querySelectorAll('circle');
      const polyline = document.querySelectorAll('polyline');
      expect(circle).toHaveLength(0);
      expect(polyline).toHaveLength(2);
    });

    it('overrides chevronRight icon from theme', () => {
      const theme = {
        ...maeven,
        iconOverrides: {
          chevronRight: circleIcon
        }
      };
      render(
        <ThemeProvider theme={theme}>
          <AlertGroup>
            <Alert showIcon={false} />
            <Alert showIcon={false} />
          </AlertGroup>
        </ThemeProvider>
      );
      const circle = document.querySelectorAll('circle');
      const polyline = document.querySelectorAll('polyline');
      expect(circle).toHaveLength(1);
      expect(polyline).toHaveLength(1);
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<AlertGroup ref={ref} />);
      const element = document.querySelector('.mvn--alert-group');
      expect(ref.current).toBe(element);
    });
  });
});
