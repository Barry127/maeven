import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { circle } from 'icon-packs/cjs/feather';

import { NativeSelect, NativeSelectF } from './NativeSelect';
import { NativeSelect as ExportedNativeSelect } from '../';

const options = [
  { value: 'JavaScript' },
  { value: 'Java' },
  { value: 'PHP' },
  { value: 'Perl' },
  { value: 'C' },
  { value: 'Lua' },
  { value: 'C++' },
  { value: 'Rust' }
];

describe('NativeSelect', () => {
  it('renders select element with options and sets child text', () => {
    render(<NativeSelect options={options}>Hello world!</NativeSelect>);
    const container = document.querySelector('.mvn-native-select');
    const select = document.querySelector('select');
    const htmlOptions = document.querySelectorAll('option');
    expect(container).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(htmlOptions).toHaveLength(8);
    expect(container).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(
      <NativeSelect options={options} className="nativeselect-class">
        Hello world!
      </NativeSelect>
    );
    const container = document.querySelector('.mvn-native-select');
    expect(container).toHaveClass('nativeselect-class');
  });

  it('passes props', () => {
    render(
      <NativeSelect
        options={options}
        id="NativeSelectId"
        data-test="nativeselect-data"
      >
        Hello world!
      </NativeSelect>
    );
    const select = document.querySelector('select');
    expect(select).toHaveAttribute('id', 'NativeSelectId');
    expect(select?.dataset.test).toBe('nativeselect-data');
  });

  describe('disabled', () => {
    it('is not disabled by default', () => {
      render(<NativeSelect options={options} />);
      const select = document.querySelector('select');
      expect(select).not.toHaveAttribute('disabled');
    });

    it('sets disabled', () => {
      render(<NativeSelect options={options} disabled />);
      const select = document.querySelector('select');
      expect(select).toHaveAttribute('disabled');
    });
  });

  describe('hasError', () => {
    it('has no error styling by default', () => {
      render(<NativeSelect options={options} />);
      const container = document.querySelector('.mvn-native-select');
      expect(container).not.toHaveClass('mvn-native-select-error');
    });

    it('sets error styling', () => {
      render(
        <NativeSelect options={options} hasError>
          Error Text
        </NativeSelect>
      );
      const container = document.querySelector('.mvn-native-select');
      expect(container).toHaveClass('mvn-native-select-error');
      const text = document.querySelector('.mvn-native-select > .mvn-block');
      expect(text).toHaveClass('mvn-text-color-danger');
    });
  });

  describe('icon', () => {
    it('has no icon by default', () => {
      render(<NativeSelect options={options} />);
      const container = document.querySelector('.mvn-native-select');
      expect(container).not.toHaveClass('mvn-has-icon');

      const circleTag = document.querySelector('circle');
      expect(circleTag).not.toBeInTheDocument();
    });

    it('sets icon', () => {
      render(<NativeSelect options={options} icon={circle} />);
      const container = document.querySelector('.mvn-native-select');
      expect(container).toHaveClass('mvn-has-icon');

      const circleTag = document.querySelector('circle');
      expect(circleTag).toBeInTheDocument();
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<NativeSelect options={options} />);
      const container = document.querySelector('.mvn-native-select');
      expect(container).not.toHaveClass('mvn-native-select-sm');
      expect(container).not.toHaveClass('mvn-native-select-lg');
    });

    it('sets sm', () => {
      render(<NativeSelect options={options} size="sm" />);
      const container = document.querySelector('.mvn-native-select');
      expect(container).toHaveClass('mvn-native-select-sm');
    });

    it('sets lg', () => {
      render(<NativeSelect options={options} size="lg" />);
      const container = document.querySelector('.mvn-native-select');
      expect(container).toHaveClass('mvn-native-select-lg');
    });
  });

  describe('forwarding ref', () => {
    it('exports NativeSelectForwardRef', () => {
      expect(ExportedNativeSelect).toBe(NativeSelectF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLSelectElement>();
      render(<NativeSelectF options={options} ref={ref} />);
      const select = document.querySelector('select');
      expect(ref.current).toBe(select);
    });
  });
});
