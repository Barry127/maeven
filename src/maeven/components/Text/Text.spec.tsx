import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { Text, TextF } from './Text';
import { Text as ExportedText } from './';

describe('Text', () => {
  it('renders a div element with given text', () => {
    const { getByText } = render(<Text>Hello world!</Text>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('DIV');
  });

  it('sets className', () => {
    const { getByText } = render(
      <Text className="text-class">Hello world!</Text>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass('text-class');
  });

  it('passes props', () => {
    const { getByText } = render(
      <Text id="TextId" data-test="text-data">
        Hello world!
      </Text>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveAttribute('id', 'TextId');
    expect(element.dataset.test).toBe('text-data');
  });

  describe('color', () => {
    it('sets indigo color', () => {
      const { getByText } = render(<Text color="indigo">Hello world!</Text>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-text-color-indigo');
    });

    it('sets danger color', () => {
      const { getByText } = render(<Text color="danger">Hello world!</Text>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-text-color-danger');
    });
  });

  describe('inline', () => {
    it('defaults to block (div)', () => {
      const { getByText } = render(<Text>Hello world!</Text>);
      const element = getByText('Hello world!');
      expect(element.tagName).toBe('DIV');
    });

    it('sets inline (span)', () => {
      const { getByText } = render(<Text inline>Hello world!</Text>);
      const element = getByText('Hello world!');
      expect(element.tagName).toBe('SPAN');
    });
  });

  describe('styleHtml', () => {
    it('does not style html by default', () => {
      const { getByText } = render(<Text>Hello world!</Text>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass('mvn-styled-text');
    });

    it('styles html', () => {
      const { getByText } = render(<Text styleHtml>Hello world!</Text>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-styled-text');
    });
  });

  describe('truncate', () => {
    it('does not truncate by default', () => {
      const { getByText } = render(<Text>Hello world!</Text>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass('mvn-truncate');
    });

    it('sets truncate', () => {
      const { getByText } = render(<Text truncate>Hello world!</Text>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-truncate');
    });

    it('it does not set truncate when inline', () => {
      const { getByText } = render(
        <Text inline truncate>
          Hello world!
        </Text>
      );
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass('mvn-truncate');
    });
  });

  describe('forwarding ref', () => {
    it('exports TextForwardRef', () => {
      expect(ExportedText).toBe(TextF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<TextF className="text" ref={ref} />);
      const element = document.querySelector('.text');
      expect(ref.current).toBe(element);
    });
  });
});
