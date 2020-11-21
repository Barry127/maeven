import { act, fireEvent, render } from '@testing-library/react';
import { circle as circleIcon } from 'icon-packs/cjs/feather';
import React, { createRef } from 'react';
import * as elementInViewport from '../../../lib/isElementInViewport';
import maeven from '../../../themes/maeven';
import { ThemeProvider } from '../../ThemeProvider';
import { Select } from './Select';

jest.mock('../../../lib/isElementInViewport');

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

describe('Select', () => {
  it('renders a select with input, a button and sets child text', () => {
    render(<Select options={options}>Hello world!</Select>);
    const container = document.querySelector('.mvn--select');
    const input = document.querySelector('input');
    const button = document.querySelector('button');
    const items = document.querySelectorAll('li');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(container).toHaveTextContent('Hello world!');
    expect(items).toHaveLength(8);
  });

  it('sets className', () => {
    render(
      <Select options={options} className="select-class">
        Hello world!
      </Select>
    );
    const element = document.querySelector('.mvn--select');
    expect(element).toHaveClass('select-class');
  });

  it('passes props', () => {
    render(
      <Select options={options} id="SelectId" data-test="select-data">
        Hello world!
      </Select>
    );
    const element = document.querySelector('input');
    expect(element).toHaveAttribute('id', 'SelectId');
    expect(element).toHaveAttribute('data-test', 'select-data');
  });

  it('handles searching inputValue', () => {
    render(
      <Select
        initialValue={{ value: null }}
        searchable
        options={[{ value: null }, ...options]}
        onChange={jest.fn()}
      >
        Hello world!
      </Select>
    );

    const input = document.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, {
      target: { value: '' }
    });

    expect(document.querySelectorAll('li')).toHaveLength(9);

    act(() => {
      fireEvent.change(input, {
        target: { value: 'ru' }
      });
    });

    expect(document.querySelectorAll('li')).toHaveLength(1);
  });

  it('handles changing input value on non-searchable', () => {
    render(
      <Select options={options} onChange={jest.fn()}>
        Hello world!
      </Select>
    );

    expect(document.querySelectorAll('li')).toHaveLength(8);

    const lis = document.querySelectorAll('li');
    fireEvent.click(lis[5]);

    expect(document.querySelector('input')).toHaveValue('Lua');
    expect(document.querySelectorAll('li')).toHaveLength(8);
  });

  it('checks if list needs to be scrolled in view', () => {
    const isElementInViewport = elementInViewport.isElementInViewport as jest.Mock;

    render(
      <Select options={options} onChange={jest.fn()}>
        Hello world!
      </Select>
    );

    isElementInViewport.mockReturnValueOnce(true);

    expect(isElementInViewport.mock.calls).toHaveLength(0);

    const button = document.querySelector('button') as HTMLButtonElement;
    const list = document.querySelector(`.list-container`) as HTMLDivElement;

    act(() => {
      fireEvent.click(button);
    });

    list.dispatchEvent(new Event('transitionend'));

    expect(isElementInViewport.mock.calls).toHaveLength(1);
  });

  it('scrolls list into view', () => {
    const isElementInViewport = elementInViewport.isElementInViewport as jest.Mock;

    render(
      <Select options={options} onChange={jest.fn()}>
        Hello world!
      </Select>
    );

    const list = document.querySelector(`.list-container`) as HTMLDivElement;

    const scrollMock = jest.fn();
    list.scrollIntoView = scrollMock;

    isElementInViewport.mockReturnValueOnce(false);

    expect(scrollMock.mock.calls).toHaveLength(0);

    const button = document.querySelector('button') as HTMLButtonElement;

    act(() => {
      fireEvent.click(button);
    });

    list.dispatchEvent(new Event('transitionend'));

    expect(scrollMock.mock.calls).toHaveLength(1);
  });

  describe('chevronDownIcon', () => {
    it('defaults to chevronDown', () => {
      render(<Select options={options} />);
      const circle = document.querySelector('circle');
      const polyLine = document.querySelector('polyline');
      expect(circle).not.toBeInTheDocument();
      expect(polyLine).toBeInTheDocument();
    });

    it('sets checkIcon', () => {
      render(<Select options={options} chevronDownIcon={circleIcon} />);
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
          <Select options={options} />
        </ThemeProvider>
      );
      const circle = document.querySelector('circle');
      const polyLine = document.querySelector('polyline');
      expect(circle).toBeInTheDocument();
      expect(polyLine).not.toBeInTheDocument();
    });
  });

  describe('chevronUpIcon', () => {
    it('defaults to chevronUp', () => {
      render(<Select options={options} />);

      const button = document.querySelector('button');
      fireEvent.click(button!);

      const circle = document.querySelector('circle');
      const polyLine = document.querySelector('polyline');
      expect(circle).not.toBeInTheDocument();
      expect(polyLine).toBeInTheDocument();
    });

    it('sets checkIcon', () => {
      render(<Select options={options} chevronUpIcon={circleIcon} />);

      const button = document.querySelector('button');
      fireEvent.click(button!);

      const circle = document.querySelector('circle');
      const polyLine = document.querySelector('polyline');
      expect(circle).toBeInTheDocument();
      expect(polyLine).not.toBeInTheDocument();
    });

    it('overrides check icon from theme', () => {
      const theme = {
        ...maeven,
        iconOverrides: {
          chevronUp: circleIcon
        }
      };
      render(
        <ThemeProvider theme={theme}>
          <Select options={options} />
        </ThemeProvider>
      );

      const button = document.querySelector('button');
      fireEvent.click(button!);

      const circle = document.querySelector('circle');
      const polyLine = document.querySelector('polyline');
      expect(circle).toBeInTheDocument();
      expect(polyLine).not.toBeInTheDocument();
    });
  });

  describe('disabled', () => {
    it('is not disabled by default', () => {
      render(<Select options={options} />);
      const input = document.querySelector('input');
      expect(input).not.toHaveAttribute('disabled');
    });

    it('sets disabled', () => {
      render(<Select options={options} disabled />);
      const input = document.querySelector('input');
      expect(input).toHaveAttribute('disabled');
    });
  });

  describe('hasError', () => {
    it('has no error styling by default', () => {
      render(<Select options={options} />);
      const container = document.querySelector('.mvn--select');
      expect(container).not.toHaveClass('has-error');
    });

    it('sets error styling', () => {
      render(
        <Select options={options} hasError>
          Error Text
        </Select>
      );
      const container = document.querySelector('.mvn--select');
      expect(container).toHaveClass('has-error');
    });
  });

  describe('icon', () => {
    it('has no icon by default', () => {
      render(<Select options={options} />);
      const container = document.querySelector('.mvn--select');
      expect(container).not.toHaveClass('has-icon');

      const svg = document.querySelectorAll('svg');
      const img = document.querySelector('img');
      expect(svg).toHaveLength(1);
      expect(img).not.toBeInTheDocument();
    });

    it('sets icon', () => {
      render(<Select options={options} icon={circleIcon} />);
      const container = document.querySelector('.mvn--select');
      expect(container).toHaveClass('has-icon');

      const svg = document.querySelectorAll('svg');
      expect(svg).toHaveLength(2);
    });
  });

  describe('keyboard events', () => {
    beforeAll(() => {
      Element.prototype.scrollTo = jest.fn();
    });

    afterAll(() => {
      //@ts-ignore
      delete Element.prototype.scrollTo;
    });

    it('selects opens and highlights first item on arrow down', () => {
      render(<Select options={options} />);
      const container = document.querySelector('.mvn--select');
      const input = document.querySelector('input');
      const firstItem = document.querySelector('li:first-child > div');

      fireEvent.keyDown(input!, { key: 'ArrowDown' });

      expect(container).toHaveClass('open');
      expect(firstItem).toHaveClass('highlighted');
    });

    it('selects item on enter', () => {
      render(<Select options={options} />);
      const container = document.querySelector('.mvn--select');
      const input = document.querySelector('input');
      const firstItem = document.querySelector('li:first-child > div');

      fireEvent.keyDown(input!, { key: 'ArrowDown' });

      expect(input).toHaveValue('');
      expect(container).toHaveClass('open');
      expect(firstItem).toHaveClass('highlighted');

      fireEvent.keyDown(input!, { key: 'Enter' });

      expect(input).toHaveValue('JavaScript');
    });

    it('selects item on click', () => {
      render(<Select options={options} />);
      const container = document.querySelector('.mvn--select');
      const input = document.querySelector('input');
      const firstItem = document.querySelector('li:first-child > div');
      const thirdLi = document.querySelector('li:nth-child(3)');

      fireEvent.keyDown(input!, { key: 'ArrowDown' });

      expect(input).toHaveValue('');
      expect(container).toHaveClass('open');
      expect(firstItem).toHaveClass('highlighted');

      fireEvent.mouseDown(thirdLi!);
      fireEvent.click(thirdLi!);
      fireEvent.mouseUp(thirdLi!);

      expect(input).toHaveValue('PHP');
    });

    it('selects second item on 2 times arrow down', () => {
      render(<Select options={options} />);
      const container = document.querySelector('.mvn--select');
      const input = document.querySelector('input');
      const firstItem = document.querySelector('li:first-child > div');
      const secondItem = document.querySelector('li:nth-child(2) > div');

      fireEvent.keyDown(input!, { key: 'ArrowDown' });

      expect(container).toHaveClass('open');
      expect(firstItem).toHaveClass('highlighted');
      expect(secondItem).not.toHaveClass('highlighted');

      fireEvent.keyDown(input!, { key: 'ArrowDown' });

      expect(firstItem).not.toHaveClass('highlighted');
      expect(secondItem).toHaveClass('highlighted');
    });

    it('selects opens and highlights last item on arrow up', () => {
      render(<Select options={options} />);
      const container = document.querySelector('.mvn--select');
      const input = document.querySelector('input');
      const firstItem = document.querySelector('li:last-child > div');

      fireEvent.keyDown(input!, { key: 'ArrowUp' });

      expect(container).toHaveClass('open');
      expect(firstItem).toHaveClass('highlighted');
    });

    it('selects second last item on 2 times arrow up', () => {
      render(<Select options={options} />);
      const container = document.querySelector('.mvn--select');
      const input = document.querySelector('input');
      const lastItem = document.querySelector('li:last-child > div');
      const secondLastItem = document.querySelector('li:nth-child(7) > div');

      fireEvent.keyDown(input!, { key: 'ArrowUp' });

      expect(container).toHaveClass('open');
      expect(lastItem).toHaveClass('highlighted');
      expect(secondLastItem).not.toHaveClass('highlighted');

      fireEvent.keyDown(input!, { key: 'ArrowUp' });

      expect(lastItem).not.toHaveClass('highlighted');
      expect(secondLastItem).toHaveClass('highlighted');
    });

    it('close menu on escape', () => {
      render(<Select options={options} />);
      const container = document.querySelector('.mvn--select');
      const input = document.querySelector('input');

      fireEvent.keyDown(input!, { key: 'ArrowDown' });

      expect(container).toHaveClass('open');

      fireEvent.keyDown(input!, { key: 'Escape' });

      expect(container).not.toHaveClass('open');
    });

    it('highlights item on mouse over', () => {
      render(<Select options={options} />);
      const container = document.querySelector('.mvn--select');
      const input = document.querySelector('input');
      const firstItem = document.querySelector('li:first-child > div');
      const secondLi = document.querySelector('li:nth-child(2)');
      const secondItem = document.querySelector('li:nth-child(2) > div');

      fireEvent.keyDown(input!, { key: 'ArrowDown' });

      expect(container).toHaveClass('open');
      expect(firstItem).toHaveClass('highlighted');

      fireEvent.mouseEnter(secondLi!);

      expect(secondItem).toHaveClass('highlighted');
    });
  });

  describe('label', () => {
    it('has no aria-describedby by default', () => {
      render(<Select options={options} />);
      const input = document.querySelector('input');
      expect(input).not.toHaveAttribute('aria-describedby');
    });

    it('sets aria-describedby by when select has a label', () => {
      render(<Select options={options} label="Label" />);
      const input = document.querySelector('input');
      expect(input).toHaveAttribute('aria-describedby');
    });
  });

  describe('loading', () => {
    it('is not loading by default', () => {
      render(<Select options={options} icon={circleIcon} />);
      const spinner = document.querySelector('.mvn--spinner');
      expect(spinner).not.toBeInTheDocument();
      const icon = document.querySelectorAll('.mvn--icon');
      expect(icon).toHaveLength(2);
    });

    it('sets loading', () => {
      render(<Select options={options} loading />);
      const spinner = document.querySelector('.mvn--spinner');
      expect(spinner).toBeInTheDocument();
    });

    it('hides icon when loading', () => {
      render(<Select options={options} loading icon={circleIcon} />);
      const icon = document.querySelectorAll('.mvn--icon');
      expect(icon).toHaveLength(1);
    });
  });

  describe('onBlur', () => {
    it('passes control to onBlur from props', () => {
      const onBlur = jest.fn();
      render(
        <Select
          initialValue={{ value: 'Rust' }}
          options={options}
          onBlur={onBlur}
        />
      );

      const input = document.querySelector('input');
      expect(onBlur).toBeCalledTimes(0);

      fireEvent.blur(input!);

      expect(onBlur).toBeCalledTimes(1);
    });

    it('does not call blur when clicking an item', () => {
      const onBlur = jest.fn();
      render(
        <Select
          initialValue={{ value: 'Rust' }}
          options={options}
          onBlur={onBlur}
        />
      );

      const input = document.querySelector('input');
      const item = document.querySelector('li');

      expect(onBlur).toBeCalledTimes(0);

      fireEvent.mouseDown(item!);
      fireEvent.blur(input!);

      expect(onBlur).toBeCalledTimes(0);
    });
  });

  describe('render item', () => {
    it('it renders item value by default', () => {
      render(
        <Select options={options} onChange={jest.fn()}>
          Hello world!
        </Select>
      );

      const firstItem = document.querySelector('li');
      expect(firstItem).toHaveTextContent('JavaScript');
    });

    it('sets custom renderer', () => {
      render(
        <Select
          options={options}
          renderItem={(item) => <>{item.value} - FromRenderer</>}
          onChange={jest.fn()}
        >
          Hello world!
        </Select>
      );

      const firstItem = document.querySelector('li');
      expect(firstItem).toHaveTextContent('JavaScript - FromRenderer');
    });
  });

  describe('searchable', () => {
    it('is not searchable by default', () => {
      render(
        <Select options={options} onChange={jest.fn()}>
          Hello world!
        </Select>
      );

      const input = document.querySelector('input');
      expect(input).toHaveAttribute('readonly');
    });

    it('sets searchable', () => {
      render(
        <Select searchable options={options} onChange={jest.fn()}>
          Hello world!
        </Select>
      );

      const input = document.querySelector('input');
      expect(input).not.toHaveAttribute('readonly');
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<Select options={options} />);
      const container = document.querySelector('.mvn--select');
      expect(container).toHaveClass('md');
      expect(container).not.toHaveClass('sm');
      expect(container).not.toHaveClass('lg');
    });

    it('sets sm', () => {
      render(<Select options={options} size="sm" />);
      const container = document.querySelector('.mvn--select');
      expect(container).toHaveClass('sm');
    });

    it('sets lg', () => {
      render(<Select options={options} size="lg" />);
      const container = document.querySelector('.mvn--select');
      expect(container).toHaveClass('lg');
    });
  });

  describe('toggle', () => {
    it('toggles', () => {
      render(
        <Select searchable options={options} onChange={jest.fn()}>
          Hello world!
        </Select>
      );

      const container = document.querySelector('.mvn--select');
      const button = document.querySelector('button');

      expect(container).not.toHaveClass('open');

      fireEvent.click(button!);

      expect(container).toHaveClass('open');
      fireEvent.click(button!);
      expect(container).not.toHaveClass('open');
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Select options={options} ref={ref} />);
      const element = document.querySelector('input');
      expect(ref.current).toBe(element);
    });
  });
});
