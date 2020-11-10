import { act, fireEvent, render } from '@testing-library/react';
import { activity } from 'icon-packs/cjs/feather';
import React, { createRef } from 'react';
import { TypeAheadInput } from './TypeAheadInput';

const items = ['JavaScript', 'Java', 'PHP', 'Perl'];
const syncItems = () => items;
const asyncItems = () => Promise.resolve(items);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('TypeAheadInput', () => {
  it('renders div element with given text', () => {
    render(<TypeAheadInput items={items}>Hello world!</TypeAheadInput>);
    const container = document.querySelector('.mvn--type-ahead-input');
    const input = document.querySelector('input');
    expect(container).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(container).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(
      <TypeAheadInput items={items} className="type-ahead-input-class">
        Hello world!
      </TypeAheadInput>
    );
    const element = document.querySelector('.mvn--type-ahead-input');
    expect(element).toHaveClass('type-ahead-input-class');
  });

  it('passes props', () => {
    render(
      <TypeAheadInput
        items={items}
        id="TypeAheadInputId"
        data-test="type-ahead-input-data"
      >
        Hello world!
      </TypeAheadInput>
    );
    const element = document.querySelector('input');
    expect(element).toHaveAttribute('id', 'TypeAheadInputId');
    expect(element).toHaveAttribute('data-test', 'type-ahead-input-data');
  });

  it('does not autocomplete when backspace is pressed', () => {
    render(<TypeAheadInput items={items} />);
    const input = document.querySelector('input') as HTMLInputElement;

    input.focus();
    fireEvent.keyDown(input, { key: 'Backspace' });
    fireEvent.change(input, { target: { value: 'ja' } });

    expect(input).toHaveValue('ja');
  });

  it('does not autocomplete when delete is pressed', () => {
    render(<TypeAheadInput items={items} />);
    const input = document.querySelector('input') as HTMLInputElement;

    input.focus();
    fireEvent.keyDown(input, { key: 'Delete' });
    fireEvent.change(input, { target: { value: 'ja' } });

    expect(input).toHaveValue('ja');
  });

  it('calls onKeyDown', () => {
    const onKeyDown = jest.fn();
    let code;
    onKeyDown.mockImplementation((ev) => {
      code = ev.keyCode;
    });

    render(<TypeAheadInput items={items} onKeyDown={onKeyDown} />);
    const input = document.querySelector('input') as HTMLInputElement;

    input.focus();
    fireEvent.keyDown(input, { keyCode: 13 });

    expect(onKeyDown.mock.calls).toHaveLength(1);
    expect(code).toBe(13);
  });

  describe('items as array', () => {
    it('does autocomplete', () => {
      render(<TypeAheadInput items={items} />);
      const input = document.querySelector('input') as HTMLInputElement;

      input.focus();
      fireEvent.change(input, { target: { value: 'ja' } });

      expect(input).toHaveValue('Java');
      expect(input.selectionStart).toBe(2);
      expect(input.selectionEnd).toBe(4);
    });

    it('does not autocomplete when autocomplete is not found', () => {
      render(<TypeAheadInput items={items} />);
      const input = document.querySelector('input') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'not' } });

      expect(input).toHaveValue('not');
    });

    it('calls onChange with autocompleted value', () => {
      const onChange = jest.fn();
      let value;
      onChange.mockImplementation((ev) => {
        value = ev.target.value;
      });

      render(<TypeAheadInput items={items} onChange={onChange} />);
      const input = document.querySelector('input') as HTMLInputElement;

      input.focus();
      fireEvent.change(input, { target: { value: 'ja' } });

      expect(onChange.mock.calls).toHaveLength(1);
      expect(value).toBe('Java');
    });
  });

  describe('sync getItems', () => {
    it('does autocomplete', () => {
      render(<TypeAheadInput items={syncItems} />);
      const input = document.querySelector('input') as HTMLInputElement;

      input.focus();
      fireEvent.change(input, { target: { value: 'ja' } });

      expect(input).toHaveValue('Java');
      expect(input.selectionStart).toBe(2);
      expect(input.selectionEnd).toBe(4);
    });

    it('does not autocomplete when autocomplete is not found', () => {
      render(<TypeAheadInput items={syncItems} />);
      const input = document.querySelector('input') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'not' } });

      expect(input).toHaveValue('not');
    });

    it('calls onChange with autocompleted value', () => {
      const onChange = jest.fn();
      let value;
      onChange.mockImplementation((ev) => {
        value = ev.target.value;
      });

      render(<TypeAheadInput items={syncItems} onChange={onChange} />);
      const input = document.querySelector('input') as HTMLInputElement;

      input.focus();
      fireEvent.change(input, { target: { value: 'ja' } });

      expect(onChange.mock.calls).toHaveLength(1);
      expect(value).toBe('Java');
    });
  });

  describe('async getItems', () => {
    it('does autocomplete', async () => {
      render(<TypeAheadInput items={asyncItems} />);
      const input = document.querySelector('input') as HTMLInputElement;

      input.focus();
      await act(async () => {
        fireEvent.change(input, { target: { value: 'ja' } });

        await sleep(1);
      });

      expect(input).toHaveValue('Java');
      expect(input.selectionStart).toBe(2);
      expect(input.selectionEnd).toBe(4);
    });

    it('does not autocomplete when autocomplete is not found', async () => {
      render(<TypeAheadInput items={asyncItems} />);
      const input = document.querySelector('input') as HTMLInputElement;

      await act(async () => {
        fireEvent.change(input, {
          target: {
            value: 'not'
          }
        });
        fireEvent.change(input, {
          target: {
            value: 'not-not'
          }
        });

        await sleep(1);
      });

      expect(input).toHaveValue('not-not');
    });

    it('calls onChange with autocompleted value', async () => {
      const onChange = jest.fn();
      let values: string[] = [];
      onChange.mockImplementation((ev) => {
        values.push(ev.target.value);
      });

      render(<TypeAheadInput items={asyncItems} onChange={onChange} />);
      const input = document.querySelector('input') as HTMLInputElement;

      input.focus();

      await act(async () => {
        fireEvent.change(input, {
          target: {
            value: 'ja'
          }
        });

        await sleep(1);
      });

      expect(onChange.mock.calls).toHaveLength(2);
      expect(values[0]).toBe('ja');
      expect(values[1]).toBe('Java');
    });
  });

  describe('disabled', () => {
    it('is not disabled by default', () => {
      render(<TypeAheadInput items={items} />);
      const input = document.querySelector('input');
      expect(input).not.toHaveAttribute('disabled');
    });

    it('sets disabled', () => {
      render(<TypeAheadInput items={items} disabled />);
      const input = document.querySelector('input');
      expect(input).toHaveAttribute('disabled');
    });
  });

  describe('hasError', () => {
    it('has no error styling by default', () => {
      render(<TypeAheadInput items={items} />);
      const container = document.querySelector('.mvn--type-ahead-input');
      expect(container).not.toHaveClass('has-error');
    });

    it('sets error styling', () => {
      render(
        <TypeAheadInput items={items} hasError>
          Error Text
        </TypeAheadInput>
      );
      const container = document.querySelector('.mvn--type-ahead-input');
      expect(container).toHaveClass('has-error');
    });
  });

  describe('loading', () => {
    it('is not loading by default', () => {
      render(<TypeAheadInput items={items} iconRight={activity} />);
      const spinner = document.querySelector('.mvn--spinner');
      expect(spinner).not.toBeInTheDocument();
      const icon = document.querySelector('.mvn--icon');
      expect(icon).toBeInTheDocument();
    });

    it('sets loading', () => {
      render(<TypeAheadInput items={items} loading />);
      const spinner = document.querySelector('.mvn--spinner');
      expect(spinner).toBeInTheDocument();
    });

    it('hides (right) icon when loading', () => {
      render(<TypeAheadInput items={items} loading iconRight={activity} />);
      const icon = document.querySelector('.mvn--icon');
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<TypeAheadInput items={items} />);
      const container = document.querySelector('.mvn--type-ahead-input');
      expect(container).toHaveClass('md');
      expect(container).not.toHaveClass('sm');
      expect(container).not.toHaveClass('lg');
    });

    it('sets sm', () => {
      render(<TypeAheadInput items={items} size="sm" />);
      const container = document.querySelector('.mvn--type-ahead-input');
      expect(container).toHaveClass('sm');
    });

    it('sets lg', () => {
      render(<TypeAheadInput items={items} size="lg" />);
      const container = document.querySelector('.mvn--type-ahead-input');
      expect(container).toHaveClass('lg');
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<TypeAheadInput items={items} ref={ref} />);
      const element = document.querySelector('input');
      expect(ref.current).toBe(element);
    });
  });
});
