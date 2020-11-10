import { act, fireEvent, render } from '@testing-library/react';
import { activity } from 'icon-packs/cjs/feather';
import React, { createRef, FocusEvent } from 'react';
import maeven from '../../../themes/maeven';
import { ThemeProvider } from '../../ThemeProvider';
import { PasswordInput } from './PasswordInput';

describe('PasswordInput', () => {
  it('renders div element with given text', () => {
    render(<PasswordInput>Hello world!</PasswordInput>);
    const element = document.querySelector('.mvn--password-input');
    expect(element?.tagName).toBe('DIV');
  });

  it('sets className', () => {
    render(
      <PasswordInput className="password-input-class">
        Hello world!
      </PasswordInput>
    );
    const element = document.querySelector('.mvn--password-input');
    expect(element).toHaveClass('password-input-class');
  });

  it('passes props', () => {
    const onBlur = jest.fn();

    render(
      <PasswordInput
        onBlur={onBlur}
        id="PasswordInputId"
        data-test="password-input-data"
      >
        Hello world!
      </PasswordInput>
    );
    const input = document.querySelector('input');
    const button = document.querySelector('button');

    expect(input).toHaveAttribute('id', 'PasswordInputId');
    expect(input).toHaveAttribute('data-test', 'password-input-data');

    expect(onBlur).not.toHaveBeenCalled();
    const ev = { relatedTarget: button };
    fireEvent(input!, new FocusEvent('blur', ev));
    expect(onBlur).toHaveBeenCalled();
  });

  it('toggles between password and text', () => {
    render(<PasswordInput>Hello world!</PasswordInput>);
    const input = document.querySelector('input');
    const button = document.querySelector('button');
    expect(input).toHaveAttribute('type', 'password');

    fireEvent.click(button!);
    expect(input).toHaveAttribute('type', 'text');
    fireEvent.click(button!);
    expect(input).toHaveAttribute('type', 'password');
  });

  describe('disabled', () => {
    it('renders no toggle button when disabled', () => {
      render(<PasswordInput disabled />);
      const button = document.querySelector('button');
      expect(button).not.toBeInTheDocument();
    });
  });

  describe('hide and showIcon', () => {
    it('defaults to eye and eyeOff', () => {
      render(<PasswordInput />);
      const button = document.querySelector('button');
      let circle, path, line, polyLine;

      circle = document.querySelector('circle');
      path = document.querySelector('path');
      line = document.querySelector('line');
      polyLine = document.querySelector('polyline');

      //eye
      expect(circle).toBeInTheDocument();
      expect(path).toBeInTheDocument();
      expect(line).not.toBeInTheDocument();
      expect(polyLine).not.toBeInTheDocument();

      fireEvent.click(button!);

      circle = document.querySelector('circle');
      path = document.querySelector('path');
      line = document.querySelector('line');
      polyLine = document.querySelector('polyline');

      //eyeOff
      expect(circle).not.toBeInTheDocument();
      expect(path).toBeInTheDocument();
      expect(line).toBeInTheDocument();
      expect(polyLine).not.toBeInTheDocument();
    });

    it('sets button icons', () => {
      render(<PasswordInput showIcon={activity} hideIcon={activity} />);
      const button = document.querySelector('button');
      let circle, path, line, polyLine;

      circle = document.querySelector('circle');
      path = document.querySelector('path');
      line = document.querySelector('line');
      polyLine = document.querySelector('polyline');

      //activity
      expect(circle).not.toBeInTheDocument();
      expect(path).not.toBeInTheDocument();
      expect(line).not.toBeInTheDocument();
      expect(polyLine).toBeInTheDocument();

      fireEvent.click(button!);

      circle = document.querySelector('circle');
      path = document.querySelector('path');
      line = document.querySelector('line');
      polyLine = document.querySelector('polyline');

      //activity
      expect(circle).not.toBeInTheDocument();
      expect(path).not.toBeInTheDocument();
      expect(line).not.toBeInTheDocument();
      expect(polyLine).toBeInTheDocument();
    });
  });

  describe('onBlur', () => {
    it('does not change selection when onBlur prevents default', () => {
      const onBlur = (ev: FocusEvent<HTMLInputElement>) => {
        ev.preventDefault();
      };
      render(
        <PasswordInput onBlur={onBlur} value="password" onChange={jest.fn()} />
      );
      const input = document.querySelector('input');
      input!.selectionStart = 4;
      input!.selectionEnd = 4;

      act(() => {
        fireEvent.blur(input!);
      });

      expect(input).toHaveProperty('selectionStart', 4);
      expect(input).toHaveProperty('selectionEnd', 4);
    });

    it('keeps selection after toggle', () => {
      render(<PasswordInput value="password" onChange={jest.fn()} />);
      const input = document.querySelector('input');
      const button = document.querySelector('button');
      input!.selectionStart = 4;
      input!.selectionEnd = 8;

      act(() => {
        fireEvent.click(button!);
      });

      expect(input).toHaveProperty('selectionStart', 4);
      expect(input).toHaveProperty('selectionEnd', 8);
    });
  });

  describe('showToggle', () => {
    it('has a toggle button by default', () => {
      render(<PasswordInput />);
      const button = document.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('hides toggle button', () => {
      render(<PasswordInput showToggle={false} />);
      const button = document.querySelector('button');
      expect(button).not.toBeInTheDocument();
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<PasswordInput />);
      const container = document.querySelector('.mvn--password-input');
      const button = document.querySelector('button');
      expect(container).toHaveClass('md');
      expect(button).toHaveClass('md');
      expect(container).not.toHaveClass('sm');
      expect(button).not.toHaveClass('sm');
      expect(container).not.toHaveClass('lg');
      expect(button).not.toHaveClass('lg');
    });

    it('sets sm', () => {
      render(<PasswordInput size="sm" />);
      const container = document.querySelector('.mvn--password-input');
      const button = document.querySelector('button');
      expect(container).toHaveClass('sm');
      expect(button).toHaveClass('sm');
    });

    it('sets lg', () => {
      render(<PasswordInput size="lg" />);
      const container = document.querySelector('.mvn--password-input');
      const button = document.querySelector('button');
      expect(container).toHaveClass('lg');
      expect(button).toHaveClass('lg');
    });
  });

  describe('theme icon overrides', () => {
    it('defaults to eye and eyeOff', () => {
      render(<PasswordInput />);
      const button = document.querySelector('button');
      let circle, path, line, polyLine;

      circle = document.querySelector('circle');
      path = document.querySelector('path');
      line = document.querySelector('line');
      polyLine = document.querySelector('polyline');

      //eye
      expect(circle).toBeInTheDocument();
      expect(path).toBeInTheDocument();
      expect(line).not.toBeInTheDocument();
      expect(polyLine).not.toBeInTheDocument();

      fireEvent.click(button!);

      circle = document.querySelector('circle');
      path = document.querySelector('path');
      line = document.querySelector('line');
      polyLine = document.querySelector('polyline');

      //eyeOff
      expect(circle).not.toBeInTheDocument();
      expect(path).toBeInTheDocument();
      expect(line).toBeInTheDocument();
      expect(polyLine).not.toBeInTheDocument();
    });

    it('overrides button icons from theme', () => {
      const theme = {
        ...maeven,
        iconOverrides: {
          passwordHide: activity,
          passwordShow: activity
        }
      };
      render(
        <ThemeProvider theme={theme}>
          <PasswordInput />
        </ThemeProvider>
      );

      const button = document.querySelector('button');
      let circle, path, line, polyLine;

      circle = document.querySelector('circle');
      path = document.querySelector('path');
      line = document.querySelector('line');
      polyLine = document.querySelector('polyline');

      //activity
      expect(circle).not.toBeInTheDocument();
      expect(path).not.toBeInTheDocument();
      expect(line).not.toBeInTheDocument();
      expect(polyLine).toBeInTheDocument();

      fireEvent.click(button!);

      circle = document.querySelector('circle');
      path = document.querySelector('path');
      line = document.querySelector('line');
      polyLine = document.querySelector('polyline');

      //activity
      expect(circle).not.toBeInTheDocument();
      expect(path).not.toBeInTheDocument();
      expect(line).not.toBeInTheDocument();
      expect(polyLine).toBeInTheDocument();
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<PasswordInput ref={ref} />);
      const element = document.querySelector('input');
      expect(ref.current).toBe(element);
    });
  });
});
