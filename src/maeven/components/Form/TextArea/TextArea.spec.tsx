import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../../..';

import { TextArea, TextAreaForwardRef } from './TextArea';
import { TextArea as ExportedTextArea } from '../';

import { classes, themeOverride } from './styles';

describe('TextArea', () => {
  it('renders a textarea element and sets child text', () => {
    render(<TextArea>Hello world!</TextArea>);
    const container = document.querySelector('label')?.parentElement;
    const textarea = document.querySelector('textarea');
    expect(container).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
    expect(container).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(<TextArea className="textarea-class">Hello world!</TextArea>);
    const container = document.querySelector('label')?.parentElement;
    expect(container).toHaveClass('textarea-class');
  });

  it('passes props', () => {
    render(
      <TextArea id="TextAreaId" data-test="textarea-data" readOnly>
        Hello world!
      </TextArea>
    );
    const textarea = document.querySelector('textarea');
    expect(textarea).toHaveAttribute('id', 'TextAreaId');
    expect(textarea?.dataset.test).toBe('textarea-data');
    expect(textarea).toHaveAttribute('readonly');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        TextArea: {
          background: 'grey'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    render(
      <ThemeProvider theme={theme}>
        <TextArea>Hello world!</TextArea>
      </ThemeProvider>
    );
    const container = document.querySelector('label')?.parentElement;
    expect(container).toHaveClass(expectedClassName);
  });

  describe('autoSize', () => {
    it('is autosize by default', () => {
      render(<TextArea />);
      const textarea = document.querySelector('textarea');
      expect(textarea).not.toHaveClass(classes.textAreaNoAutoSize);
    });

    it('unsets autosize', () => {
      render(<TextArea autoSize={false} />);
      const textarea = document.querySelector('textarea');
      expect(textarea).toHaveClass(classes.textAreaNoAutoSize);
    });
  });

  describe('disabled', () => {
    it('is not disabled by default', () => {
      render(<TextArea />);
      const textarea = document.querySelector('textarea');
      expect(textarea).not.toHaveAttribute('disabled');
    });

    it('sets disabled', () => {
      render(<TextArea disabled />);
      const textarea = document.querySelector('textarea');
      expect(textarea).toHaveAttribute('disabled');
    });
  });

  describe('hasError', () => {
    it('has no error styling by default', () => {
      render(<TextArea />);
      const container = document.querySelector('label')?.parentElement;
      expect(container).not.toHaveClass(classes.hasError);
    });

    it('sets error styling', () => {
      render(<TextArea hasError />);
      const container = document.querySelector('label')?.parentElement;
      expect(container).toHaveClass(classes.hasError);
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<TextArea />);
      const container = document.querySelector('label')?.parentElement;
      expect(container).not.toHaveClass(classes.sm);
      expect(container).not.toHaveClass(classes.lg);
    });

    it('sets sm', () => {
      render(<TextArea size="sm" />);
      const container = document.querySelector('label')?.parentElement;
      expect(container).toHaveClass(classes.sm);
    });

    it('sets lg', () => {
      render(<TextArea size="lg" />);
      const container = document.querySelector('label')?.parentElement;
      expect(container).toHaveClass(classes.lg);
    });
  });

  describe('forwarding ref', () => {
    it('exports TextAreaForwardRef', () => {
      expect(ExportedTextArea).toBe(TextAreaForwardRef);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(<TextAreaForwardRef ref={ref} />);
      const textarea = document.querySelector('textarea');
      expect(ref.current).toBe(textarea);
    });
  });
});
