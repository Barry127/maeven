import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { activity } from 'icon-packs/cjs/feather';
import { render, fireEvent } from '@testing-library/react';
import { getStylesForElement, reinit } from '../../../testHelpers';

import { TextInput } from './TextInput';
import { MaevenTheme } from '../..';
import { ThemeProvider } from '../ThemeProvider';

describe('TextInput', () => {
  afterEach(reinit);

  it('renders an input and sets child text', () => {
    render(<TextInput>Hello</TextInput>);
    const container = document.querySelector('div div');
    const input = document.querySelector('input');
    expect(container).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(container).toHaveTextContent('Hello');
  });

  it('sets className', () => {
    render(<TextInput className="my-text-input" />);
    const container = document.querySelector('div div');
    expect(container).toHaveClass('my-text-input');
  });

  it('passes props to input element', () => {
    render(<TextInput id="TextInput" data-test="test-attr" readOnly />);
    const input = document.querySelector('input');
    expect(input).toHaveAttribute('id', 'TextInput');
    expect(input!.dataset.test).toBe('test-attr');
    expect(input).toHaveAttribute('readOnly');
  });

  it('styles Theme overrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        TextInput: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <TextInput />
      </ThemeProvider>
    );

    const container = document.querySelector('div div');
    const styles = getStylesForElement(container!);
    expect(styles.color).toBe('yellow');
  });

  describe('disabled', () => {
    it('is not disabled by default', () => {
      render(<TextInput />);
      const input = document.querySelector('input');
      expect(input).not.toHaveAttribute('disabled');
    });

    it('sets disabled', () => {
      render(<TextInput disabled />);
      const input = document.querySelector('input');
      expect(input).toHaveAttribute('disabled');
    });
  });

  describe('hasError', () => {
    it('has no error styling by default', () => {
      const { getByText } = render(<TextInput>Child</TextInput>);
      const childContainer = getByText('Child');
      const styles = getStylesForElement(childContainer);
      expect(styles).toHaveProperty('color', MaevenTheme.colors.types.text);
    });

    it('sets error styling', () => {
      const { getByText } = render(<TextInput hasError>Child</TextInput>);
      const childContainer = getByText('Child');
      const styles = getStylesForElement(childContainer);
      expect(styles).toHaveProperty(
        'color',
        MaevenTheme.colors.semantic.danger
      );
    });
  });

  describe('icon', () => {
    it('has no icon by default', () => {
      render(<TextInput />);
      const svg = document.querySelector('svg');
      const img = document.querySelector('img');
      expect(svg).not.toBeInTheDocument();
      expect(img).not.toBeInTheDocument();
    });

    it('sets icon', () => {
      render(<TextInput icon={activity} />);
      const svg = document.querySelectorAll('svg');
      expect(svg).toHaveLength(1);
    });

    it('sets iconRight', () => {
      render(<TextInput icon={activity} iconRight={activity} />);
      const svg = document.querySelectorAll('svg');
      expect(svg).toHaveLength(2);
    });
  });

  describe('rightElement', () => {
    it('has no right element by default', () => {
      render(<TextInput />);
      const button = document.querySelector('button');
      const rightElementContainer = document.querySelector('label > div');
      expect(button).not.toBeInTheDocument();
      expect(rightElementContainer).not.toBeInTheDocument();
    });

    it('sets right element', () => {
      render(<TextInput rightElement={<button>Click Me</button>} />);
      const button = document.querySelector('button');
      const rightElementContainer = document.querySelector('label > div');
      expect(button).toBeInTheDocument();
      expect(rightElementContainer).toBeInTheDocument();
      expect(rightElementContainer).toHaveTextContent('Click Me');
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<TextInput />);
      const input = document.querySelector('input');
      const styles = getStylesForElement(input!);
      expect(styles).toHaveProperty('height', MaevenTheme.base * 8);
    });

    it('sets sm', () => {
      render(<TextInput size="sm" />);
      const input = document.querySelector('input');
      const styles = getStylesForElement(input!);
      expect(styles).toHaveProperty('height', MaevenTheme.base * 6);
    });

    it('sets lg', () => {
      render(<TextInput size="lg" />);
      const input = document.querySelector('input');
      const styles = getStylesForElement(input!);
      expect(styles).toHaveProperty('height', MaevenTheme.base * 12);
    });
  });
});

describe('type', () => {
  it('is text by default', () => {
    render(<TextInput />);
    const input = document.querySelector('input');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('sets type', () => {
    render(<TextInput type="password" />);
    const input = document.querySelector('input');
    expect(input).toHaveAttribute('type', 'password');
  });
});
