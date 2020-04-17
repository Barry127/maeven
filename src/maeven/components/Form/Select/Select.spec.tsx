import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { circle } from 'icon-packs/cjs/feather';

import { chevronDown, chevronUp } from '../../../common/defaultIcons';
import * as elementInViewport from '../../../common/isElementInViewport';

import { Select, SelectF } from './Select';
import { Select as ExportedSelect } from '../';
import { MaevenIcon } from 'maeven/types';

jest.mock('../../../common/isElementInViewport');

const down = (chevronDown.children![0] as MaevenIcon).attrs.points;
const up = (chevronUp.children![0] as MaevenIcon).attrs.points;

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
    render(
      <Select options={options} onChange={jest.fn()}>
        Hello world!
      </Select>
    );
    const container = document.querySelector('.mvn-select');
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
      <Select
        initialValue={{ value: 'non exisiting' }}
        className="select-class"
        options={options}
        onChange={jest.fn()}
      >
        Hello world!
      </Select>
    );
    const container = document.querySelector('.mvn-select');
    expect(container).toHaveClass('select-class');
  });

  it('passes props', () => {
    render(
      <Select
        id="SelectId"
        data-test="select-data"
        options={options}
        onChange={jest.fn()}
      >
        Hello world!
      </Select>
    );
    const input = document.querySelector('input');
    expect(input).toHaveAttribute('id', 'SelectId');
    expect(input?.dataset.test).toBe('select-data');
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
    const list = document.querySelector(
      `.mvn-select-list-container`
    ) as HTMLDivElement;

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

    const list = document.querySelector(
      `.mvn-select-list-container`
    ) as HTMLDivElement;

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

  describe('toggle', () => {
    it('toggles', () => {
      render(
        <Select searchable options={options} onChange={jest.fn()}>
          Hello world!
        </Select>
      );

      const container = document.querySelector('.mvn-select');
      const button = document.querySelector('button');

      expect(document.querySelector('polyline')).toHaveAttribute(
        'points',
        down
      );
      expect(container).not.toHaveClass('mvn-select-open');

      fireEvent.click(button!);

      expect(document.querySelector('polyline')).toHaveAttribute('points', up);
      expect(container).toHaveClass('mvn-select-open');
      fireEvent.click(button!);
      expect(container).not.toHaveClass('mvn-select-open');
    });
  });

  describe('keyboard events', () => {
    beforeAll(() => {
      Element.prototype.scrollTo = jest.fn();
    });

    afterAll(() => {
      delete Element.prototype.scrollTo;
    });

    it('selects opens and highlights first item on arrow down', () => {
      render(<Select options={options} />);
      const container = document.querySelector('.mvn-select');
      const input = document.querySelector('input');
      const firstItem = document.querySelector('li:first-child > div');

      fireEvent.keyDown(input!, { key: 'ArrowDown' });

      expect(container).toHaveClass('mvn-select-open');
      expect(firstItem).toHaveClass('mvn-select-highlighted-item');
    });

    it('selects item on enter', () => {
      render(<Select options={options} />);
      const container = document.querySelector('.mvn-select');
      const input = document.querySelector('input');
      const firstItem = document.querySelector('li:first-child > div');

      fireEvent.keyDown(input!, { key: 'ArrowDown' });

      expect(input).toHaveValue('');
      expect(container).toHaveClass('mvn-select-open');
      expect(firstItem).toHaveClass('mvn-select-highlighted-item');

      fireEvent.keyDown(input!, { key: 'Enter' });

      expect(input).toHaveValue('JavaScript');
    });

    it('selects item on click', () => {
      render(<Select options={options} />);
      const container = document.querySelector('.mvn-select');
      const input = document.querySelector('input');
      const firstItem = document.querySelector('li:first-child > div');
      const thirdLi = document.querySelector('li:nth-child(3)');

      fireEvent.keyDown(input!, { key: 'ArrowDown' });

      expect(input).toHaveValue('');
      expect(container).toHaveClass('mvn-select-open');
      expect(firstItem).toHaveClass('mvn-select-highlighted-item');

      fireEvent.mouseDown(thirdLi!);
      fireEvent.click(thirdLi!);
      fireEvent.mouseUp(thirdLi!);

      expect(input).toHaveValue('PHP');
    });

    it('selects second item on 2 times arrow down', () => {
      render(<Select options={options} />);
      const container = document.querySelector('.mvn-select');
      const input = document.querySelector('input');
      const firstItem = document.querySelector('li:first-child > div');
      const secondItem = document.querySelector('li:nth-child(2) > div');

      fireEvent.keyDown(input!, { key: 'ArrowDown' });

      expect(container).toHaveClass('mvn-select-open');
      expect(firstItem).toHaveClass('mvn-select-highlighted-item');
      expect(secondItem).not.toHaveClass('mvn-select-highlighted-item');

      fireEvent.keyDown(input!, { key: 'ArrowDown' });

      expect(firstItem).not.toHaveClass('mvn-select-highlighted-item');
      expect(secondItem).toHaveClass('mvn-select-highlighted-item');
    });

    it('selects opens and highlights last item on arrow up', () => {
      render(<Select options={options} />);
      const container = document.querySelector('.mvn-select');
      const input = document.querySelector('input');
      const firstItem = document.querySelector('li:last-child > div');

      fireEvent.keyDown(input!, { key: 'ArrowUp' });

      expect(container).toHaveClass('mvn-select-open');
      expect(firstItem).toHaveClass('mvn-select-highlighted-item');
    });

    it('selects second last item on 2 times arrow up', () => {
      render(<Select options={options} />);
      const container = document.querySelector('.mvn-select');
      const input = document.querySelector('input');
      const lastItem = document.querySelector('li:last-child > div');
      const secondLastItem = document.querySelector('li:nth-child(7) > div');

      fireEvent.keyDown(input!, { key: 'ArrowUp' });

      expect(container).toHaveClass('mvn-select-open');
      expect(lastItem).toHaveClass('mvn-select-highlighted-item');
      expect(secondLastItem).not.toHaveClass('mvn-select-highlighted-item');

      fireEvent.keyDown(input!, { key: 'ArrowUp' });

      expect(lastItem).not.toHaveClass('mvn-select-highlighted-item');
      expect(secondLastItem).toHaveClass('mvn-select-highlighted-item');
    });

    it('close menu on escape', () => {
      render(<Select options={options} />);
      const container = document.querySelector('.mvn-select');
      const input = document.querySelector('input');

      fireEvent.keyDown(input!, { key: 'ArrowDown' });

      expect(container).toHaveClass('mvn-select-open');

      fireEvent.keyDown(input!, { key: 'Escape' });

      expect(container).not.toHaveClass('mvn-select-open');
    });

    it('highlights item on mouse over', () => {
      render(<Select options={options} />);
      const container = document.querySelector('.mvn-select');
      const input = document.querySelector('input');
      const firstItem = document.querySelector('li:first-child > div');
      const secondLi = document.querySelector('li:nth-child(2)');
      const secondItem = document.querySelector('li:nth-child(2) > div');

      fireEvent.keyDown(input!, { key: 'ArrowDown' });

      expect(container).toHaveClass('mvn-select-open');
      expect(firstItem).toHaveClass('mvn-select-highlighted-item');

      fireEvent.mouseEnter(secondLi!);

      expect(secondItem).toHaveClass('mvn-select-highlighted-item');
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

  describe('chevron icons', () => {
    it('sets custom icons', () => {
      render(
        <Select
          chevronDownIcon={circle}
          chevronUpIcon={circle}
          searchable
          options={options}
          onChange={jest.fn()}
        >
          Hello world!
        </Select>
      );

      const button = document.querySelector('button');

      expect(document.querySelector('polyline')).not.toBeInTheDocument();
      expect(document.querySelector('circle')).toBeInTheDocument();

      fireEvent.click(button!);

      expect(document.querySelector('polyline')).not.toBeInTheDocument();
      expect(document.querySelector('circle')).toBeInTheDocument();
    });
  });

  describe('disabled', () => {
    it('is not disabled by default', () => {
      render(
        <Select options={options} onChange={jest.fn()}>
          Hello world!
        </Select>
      );

      const input = document.querySelector('input');
      const buttons = document.querySelectorAll('button');

      expect(input).not.toHaveAttribute('disabled');
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).not.toHaveAttribute('disabled');
      expect(buttons[1]).not.toHaveAttribute('disabled');
    });

    it('sets disabled', () => {
      render(
        <Select disabled options={options} onChange={jest.fn()}>
          Hello world!
        </Select>
      );

      const input = document.querySelector('input');
      const buttons = document.querySelectorAll('button');

      expect(input).toHaveAttribute('disabled');
      expect(buttons).toHaveLength(1);
      expect(buttons[0]).toHaveAttribute('disabled');
    });
  });

  describe('hasError', () => {
    it('has no error styling by default', () => {
      render(
        <Select options={options} onChange={jest.fn()}>
          Hello world!
        </Select>
      );
      const container = document.querySelector('.mvn-select');
      expect(container).not.toHaveClass('mvn-select-error');
    });

    it('sets error styling', () => {
      render(
        <Select hasError options={options} onChange={jest.fn()}>
          Hello world!
        </Select>
      );
      const container = document.querySelector('.mvn-select');
      expect(container).toHaveClass('mvn-select-error');
    });
  });

  describe('icon', () => {
    it('has no icon by default', () => {
      render(
        <Select options={options} onChange={jest.fn()}>
          Hello world!
        </Select>
      );
      const container = document.querySelector('.mvn-select');
      expect(container).not.toHaveClass('mvn-has-icon');

      const circleTag = document.querySelector('circle');
      expect(circleTag).not.toBeInTheDocument();
    });

    it('sets icon', () => {
      render(
        <Select icon={circle} options={options} onChange={jest.fn()}>
          Hello world!
        </Select>
      );
      const container = document.querySelector('.mvn-select');
      expect(container).toHaveClass('mvn-has-icon');

      const circleTag = document.querySelector('circle');
      expect(circleTag).toBeInTheDocument();
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
          renderItem={item => <>{item.value} - FromRenderer</>}
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
      render(
        <Select options={options} onChange={jest.fn()}>
          Hello world!
        </Select>
      );
      const container = document.querySelector('.mvn-select');
      const buttons = document.querySelectorAll('button');
      expect(container).not.toHaveClass('mvn-select-sm');
      expect(container).not.toHaveClass('mvn-select-lg');
      expect(buttons[0]).not.toHaveClass('mvn-button-sm');
      expect(buttons[0]).not.toHaveClass('mvn-button-lg');
      expect(buttons[1]).not.toHaveClass('mvn-button-sm');
      expect(buttons[1]).not.toHaveClass('mvn-button-lg');
    });

    it('sets sm', () => {
      render(
        <Select size="sm" options={options} onChange={jest.fn()}>
          Hello world!
        </Select>
      );
      const container = document.querySelector('.mvn-select');
      const buttons = document.querySelectorAll('button');
      expect(container).toHaveClass('mvn-select-sm');
      expect(container).not.toHaveClass('mvn-select-lg');
      expect(buttons[0]).toHaveClass('mvn-button-sm');
      expect(buttons[0]).not.toHaveClass('mvn-button-lg');
      expect(buttons[1]).toHaveClass('mvn-button-sm');
      expect(buttons[1]).not.toHaveClass('mvn-button-lg');
    });

    it('sets lg', () => {
      render(
        <Select size="lg" options={options} onChange={jest.fn()}>
          Hello world!
        </Select>
      );
      const container = document.querySelector('.mvn-select');
      const buttons = document.querySelectorAll('button');
      expect(container).not.toHaveClass('mvn-select-sm');
      expect(container).toHaveClass('mvn-select-lg');
      expect(buttons[0]).not.toHaveClass('mvn-button-sm');
      expect(buttons[0]).toHaveClass('mvn-button-lg');
      expect(buttons[1]).not.toHaveClass('mvn-button-sm');
      expect(buttons[1]).toHaveClass('mvn-button-lg');
    });
  });

  describe('forwarding ref', () => {
    it('exports SelectForwardRef', () => {
      expect(ExportedSelect).toBe(SelectF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<SelectF options={options} onChange={jest.fn()} ref={ref} />);
      const input = document.querySelector('input');
      expect(ref.current).toBe(input);
    });
  });
});