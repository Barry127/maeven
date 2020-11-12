import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import { TextArea } from './TextArea';

describe('Textarea', () => {
  it('renders a textarea element and sets child text', () => {
    render(<TextArea>Hello world!</TextArea>);
    const container = document.querySelector('.mvn--text-area');
    const textarea = document.querySelector('textarea');
    expect(container).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
    expect(container).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(<TextArea className="textarea-class">Hello world!</TextArea>);
    const element = document.querySelector('.mvn--text-area');
    expect(element).toHaveClass('textarea-class');
  });

  it('passes props', () => {
    render(
      <TextArea id="TextareaId" rows={4} data-test="textarea-data">
        Hello world!
      </TextArea>
    );
    const element = document.querySelector('textarea');
    expect(element).toHaveAttribute('id', 'TextareaId');
    expect(element).toHaveAttribute('data-test', 'textarea-data');
    expect(element).toHaveAttribute('rows', '4');
  });

  describe('autoSize', () => {
    it('is autosize by default', () => {
      render(<TextArea />);
      const textarea = document.querySelector('textarea');
      expect(textarea).not.toHaveClass('no-autosize');
    });

    it('unset autosize', () => {
      render(<TextArea autoSize={false} />);
      const textarea = document.querySelector('textarea');
      expect(textarea).toHaveClass('no-autosize');
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
      const container = document.querySelector('.mvn--text-area');
      expect(container).not.toHaveClass('has-error');
    });

    it('sets error styling', () => {
      render(<TextArea hasError>Error Text</TextArea>);
      const container = document.querySelector('.mvn--text-area');
      expect(container).toHaveClass('has-error');
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<TextArea />);
      const container = document.querySelector('.mvn--text-area');
      expect(container).toHaveClass('md');
      expect(container).not.toHaveClass('sm');
      expect(container).not.toHaveClass('lg');
    });

    it('sets sm', () => {
      render(<TextArea size="sm" />);
      const container = document.querySelector('.mvn--text-area');
      expect(container).toHaveClass('sm');
    });

    it('sets lg', () => {
      render(<TextArea size="lg" />);
      const container = document.querySelector('.mvn--text-area');
      expect(container).toHaveClass('lg');
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(<TextArea ref={ref} />);
      const element = document.querySelector('textarea');
      expect(ref.current).toBe(element);
    });
  });
});
