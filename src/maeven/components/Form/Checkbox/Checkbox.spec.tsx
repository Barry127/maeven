import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../../..';

import { Checkbox } from './Checkbox';
import { classes, themeOverride } from './styles';

describe('Checkbox', () => {
  it.skip('renders div element with given text', () => {
    const { getByText } = render(<Checkbox>Hello world!</Checkbox>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('DIV');
  });

  it.skip('sets className', () => {
    const { getByText } = render(
      <Checkbox className="checkbox-class">Hello world!</Checkbox>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass('checkbox-class');
  });

  it.skip('passes props', () => {
    const { getByText } = render(
      <Checkbox id="CheckboxId" data-test="checkbox-data">
        Hello world!
      </Checkbox>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveAttribute('id', 'CheckboxId');
    expect(element.dataset.test).toBe('checkbox-data');
  });

  it.skip('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        Checkbox: {
          color: 'hotpink'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Checkbox>Hello world!</Checkbox>
      </ThemeProvider>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass(expectedClassName);
  });

  it.skip('', () => {});
});
