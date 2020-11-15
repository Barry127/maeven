import { render } from '@testing-library/react';
import { circle as circleIcon } from 'icon-packs/cjs/feather';
import React, { createRef } from 'react';
import maeven from '../../../themes/maeven';
import { ThemeProvider } from '../../ThemeProvider';
import { NativeSelect } from './NativeSelect';

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
    const container = document.querySelector('.mvn--native-select');
    const select = document.querySelector('select');
    const htmlOptions = document.querySelectorAll('option');
    expect(container).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(htmlOptions).toHaveLength(8);
    expect(container).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(
      <NativeSelect options={options} className="native-select-class">
        Hello world!
      </NativeSelect>
    );
    const element = document.querySelector('.mvn--native-select');
    expect(element).toHaveClass('native-select-class');
  });

  it('passes props', () => {
    render(
      <NativeSelect
        options={options}
        id="NativeSelectId"
        data-test="native-select-data"
      >
        Hello world!
      </NativeSelect>
    );
    const element = document.querySelector('select');
    expect(element).toHaveAttribute('id', 'NativeSelectId');
    expect(element).toHaveAttribute('data-test', 'native-select-data');
  });

  describe('chevronDownIcon', () => {
    it('defaults to chevronDown', () => {
      render(<NativeSelect options={options} />);
      const circle = document.querySelector('circle');
      const polyLine = document.querySelector('polyline');
      expect(circle).not.toBeInTheDocument();
      expect(polyLine).toBeInTheDocument();
    });

    it('sets checkIcon', () => {
      render(<NativeSelect options={options} chevronDownIcon={circleIcon} />);
      const circle = document.querySelector('circle');
      const polyLine = document.querySelector('polyline');
      expect(circle).toBeInTheDocument();
      expect(polyLine).not.toBeInTheDocument();
    });

    it('overrides check icon from theme', () => {
      const theme = {
        ...maeven,
        iconOverrides: {
          chevronDown: circleIcon
        }
      };
      render(
        <ThemeProvider theme={theme}>
          <NativeSelect options={options} />
        </ThemeProvider>
      );
      const circle = document.querySelector('circle');
      const polyLine = document.querySelector('polyline');
      expect(circle).toBeInTheDocument();
      expect(polyLine).not.toBeInTheDocument();
    });
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
      const container = document.querySelector('.mvn--native-select');
      expect(container).not.toHaveClass('has-error');
    });

    it('sets error styling', () => {
      render(
        <NativeSelect options={options} hasError>
          Error Text
        </NativeSelect>
      );
      const container = document.querySelector('.mvn--native-select');
      expect(container).toHaveClass('has-error');
    });
  });

  describe('icon', () => {
    it('has no icon by default', () => {
      render(<NativeSelect options={options} />);
      const container = document.querySelector('.mvn--native-select');
      expect(container).not.toHaveClass('has-icon');

      const svg = document.querySelectorAll('svg');
      const img = document.querySelector('img');
      expect(svg).toHaveLength(1);
      expect(img).not.toBeInTheDocument();
    });

    it('sets icon', () => {
      render(<NativeSelect options={options} icon={circleIcon} />);
      const container = document.querySelector('.mvn--native-select');
      expect(container).toHaveClass('has-icon');

      const svg = document.querySelectorAll('svg');
      expect(svg).toHaveLength(2);
    });
  });

  describe('label', () => {
    it('has no aria-describedby by default', () => {
      render(<NativeSelect options={options} />);
      const select = document.querySelector('select');
      expect(select).not.toHaveAttribute('aria-describedby');
    });

    it('sets aria-describedby by when select has a label', () => {
      render(<NativeSelect options={options} label="Label" />);
      const select = document.querySelector('select');
      expect(select).toHaveAttribute('aria-describedby');
    });
  });

  describe('loading', () => {
    it('is not loading by default', () => {
      render(<NativeSelect options={options} icon={circleIcon} />);
      const spinner = document.querySelector('.mvn--spinner');
      expect(spinner).not.toBeInTheDocument();
      const icon = document.querySelectorAll('.mvn--icon');
      expect(icon).toHaveLength(2);
    });

    it('sets loading', () => {
      render(<NativeSelect options={options} loading />);
      const spinner = document.querySelector('.mvn--spinner');
      expect(spinner).toBeInTheDocument();
    });

    it('hides icon when loading', () => {
      render(<NativeSelect options={options} loading icon={circleIcon} />);
      const icon = document.querySelectorAll('.mvn--icon');
      expect(icon).toHaveLength(1);
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<NativeSelect options={options} />);
      const container = document.querySelector('.mvn--native-select');
      expect(container).toHaveClass('md');
      expect(container).not.toHaveClass('sm');
      expect(container).not.toHaveClass('lg');
    });

    it('sets sm', () => {
      render(<NativeSelect options={options} size="sm" />);
      const container = document.querySelector('.mvn--native-select');
      expect(container).toHaveClass('sm');
    });

    it('sets lg', () => {
      render(<NativeSelect options={options} size="lg" />);
      const container = document.querySelector('.mvn--native-select');
      expect(container).toHaveClass('lg');
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLSelectElement>();
      render(<NativeSelect options={options} ref={ref} />);
      const element = document.querySelector('select');
      expect(ref.current).toBe(element);
    });
  });
});
