import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../../..';

import { RadioGroup } from './RadioGroup';
import { classes, themeOverride } from './styles';
import { classes as radioClasses } from '../RadioButton/styles';

const options = [
  { label: 'Javascript', value: 'js' },
  { label: 'Typescript', value: 'ts' },
  { label: 'Coffescript', value: 'coffee' }
];

describe('RadioGroup', () => {
  it('renders 3 radiobuttons and checkes value', () => {
    render(
      <RadioGroup
        value="ts"
        onChange={jest.fn()}
        options={options}
        name="language"
      />
    );
    const inputs = document.querySelectorAll('input');
    expect(inputs).toHaveLength(3);
    for (const input of [...(inputs as any)]) {
      expect(input).toHaveAttribute('type', 'radio');
      expect(input).toHaveAttribute('name', 'language');
    }

    expect(inputs[1]).toHaveAttribute('checked');
  });

  it('sets className', () => {
    render(
      <RadioGroup
        className="radiogroup-class"
        options={options}
        name="language"
      />
    );
    const container = document.querySelector(
      `.${classes.container.split(' ').join('.')}`
    );
    expect(container).toHaveClass('radiogroup-class');
  });

  it('passes props', () => {
    render(
      <RadioGroup
        id="RadioGroupId"
        data-test="radiogroup-data"
        options={options}
        name="language"
      />
    );
    const container = document.querySelector(
      `.${classes.container.split(' ').join('.')}`
    );
    expect(container).toHaveAttribute('id', 'RadioGroupId');
    expect(container).toHaveAttribute('data-test', 'radiogroup-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        RadioGroup: {
          border: '1px dashed grey'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    render(
      <ThemeProvider theme={theme}>
        <RadioGroup options={options} name="language" />
      </ThemeProvider>
    );
    const container = document.querySelector(
      `.${classes.container.split(' ').join('.')}`
    );
    expect(container).toHaveClass(expectedClassName);
  });

  describe('inline', () => {
    it('is not inline by default', () => {
      render(<RadioGroup options={options} name="language" />);
      const container = document.querySelector(
        `.${classes.container.split(' ').join('.')}`
      );
      expect(container).not.toHaveClass(classes.inline);
    });
    it('sets inline', () => {
      render(<RadioGroup inline options={options} name="language" />);
      const container = document.querySelector(
        `.${classes.container.split(' ').join('.')}`
      );
      expect(container).toHaveClass(classes.inline);
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<RadioGroup options={options} name="language" />);
      const firstRadio = document.querySelector(`.${radioClasses.container}`);
      expect(firstRadio).not.toHaveClass(radioClasses.sm);
      expect(firstRadio).not.toHaveClass(radioClasses.lg);
    });

    it('sets sm', () => {
      render(<RadioGroup size="sm" options={options} name="language" />);
      const firstRadio = document.querySelector(`.${radioClasses.container}`);
      expect(firstRadio).toHaveClass(radioClasses.sm);
    });

    it('sets lg', () => {
      render(<RadioGroup size="lg" options={options} name="language" />);
      const firstRadio = document.querySelector(`.${radioClasses.container}`);
      expect(firstRadio).toHaveClass(radioClasses.lg);
    });
  });
});
