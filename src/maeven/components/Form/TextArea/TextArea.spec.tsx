import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { TextArea, TextAreaF } from './TextArea';
import { TextArea as ExportedTextArea } from '../';

describe('TextArea', () => {
  it('renders a textarea element and sets child text', () => {
    render(<TextArea>Hello world!</TextArea>);
    const container = document.querySelector('.mvn-text-area');
    const textarea = document.querySelector('textarea');
    expect(container).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
    expect(container).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(<TextArea className="textarea-class">Hello world!</TextArea>);
    const container = document.querySelector('.mvn-text-area');
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

  describe('autoSize', () => {
    it('is autosize by default', () => {
      render(<TextArea />);
      const textarea = document.querySelector('textarea');
      expect(textarea).not.toHaveClass('mvn-text-area-no-auto-size');
    });

    it('unsets autosize', () => {
      render(<TextArea autoSize={false} />);
      const textarea = document.querySelector('textarea');
      expect(textarea).toHaveClass('mvn-text-area-no-auto-size');
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
      const container = document.querySelector('.mvn-text-area');
      expect(container).not.toHaveClass('mvn-text-area-error');
    });

    it('sets error styling', () => {
      render(<TextArea hasError>Error Text</TextArea>);
      const container = document.querySelector('.mvn-text-area');
      expect(container).toHaveClass('mvn-text-area-error');
      const text = document.querySelector('.mvn-block');
      expect(text).toHaveClass('mvn-text-color-danger');
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<TextArea />);
      const container = document.querySelector('.mvn-text-area');
      expect(container).not.toHaveClass('mvn-text-area-sm');
      expect(container).not.toHaveClass('mvn-text-area-lg');
    });

    it('sets sm', () => {
      render(<TextArea size="sm" />);
      const container = document.querySelector('.mvn-text-area');
      expect(container).toHaveClass('mvn-text-area-sm');
    });

    it('sets lg', () => {
      render(<TextArea size="lg" />);
      const container = document.querySelector('.mvn-text-area');
      expect(container).toHaveClass('mvn-text-area-lg');
    });
  });

  describe('forwarding ref', () => {
    it('exports TextAreaForwardRef', () => {
      expect(ExportedTextArea).toBe(TextAreaF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(<TextAreaF ref={ref} />);
      const textarea = document.querySelector('textarea');
      expect(ref.current).toBe(textarea);
    });
  });
});
