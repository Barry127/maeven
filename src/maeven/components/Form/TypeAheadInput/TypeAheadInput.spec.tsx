import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import { TypeAheadInput, TypeAheadInputF } from './TypeAheadInput';
import { TypeAheadInput as ExportedTypeAheadInput } from '../';

const items = ['JavaScript', 'Java', 'PHP', 'Perl'];
const syncItems = () => items;
const asyncItems = () => Promise.resolve(items);

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('TypeAheadInput', () => {
  it('renders an input and sets child text', () => {
    render(<TypeAheadInput items={items}>Hello world!</TypeAheadInput>);
    const container = document.querySelector('label')?.parentElement;
    const input = document.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(container).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(
      <TypeAheadInput items={items} className="typeaheadinput-class">
        Hello world!
      </TypeAheadInput>
    );
    const container = document.querySelector('label')?.parentElement;
    expect(container).toHaveClass('typeaheadinput-class');
  });

  it('passes props', () => {
    render(
      <TypeAheadInput
        items={items}
        id="TypeAheadInputId"
        data-test="typeaheadinput-data"
      >
        Hello world!
      </TypeAheadInput>
    );
    const input = document.querySelector('input');

    expect(input).toHaveAttribute('id', 'TypeAheadInputId');
    expect(input?.dataset.test).toBe('typeaheadinput-data');
  });

  it('does not autocomplete when backspace is pressed', () => {
    render(<TypeAheadInput items={items} />);
    const input = document.querySelector('input') as HTMLInputElement;

    input.focus();
    fireEvent.keyDown(input, { keyCode: 8 });
    fireEvent.change(input, { target: { value: 'ja' } });

    expect(input).toHaveValue('ja');
  });

  it('does not autocomplete when delete is pressed', () => {
    render(<TypeAheadInput items={items} />);
    const input = document.querySelector('input') as HTMLInputElement;

    input.focus();
    fireEvent.keyDown(input, { keyCode: 46 });
    fireEvent.change(input, { target: { value: 'ja' } });

    expect(input).toHaveValue('ja');
  });

  it('calls onKeyDown', () => {
    const onKeyDown = jest.fn();
    let code;
    onKeyDown.mockImplementation(ev => {
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
    it('autocompletes', () => {
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
      onChange.mockImplementation(ev => {
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
    it('autocompletes', () => {
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
      onChange.mockImplementation(ev => {
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
    it('autocompletes', async () => {
      render(<TypeAheadInput items={asyncItems} />);
      const input = document.querySelector('input') as HTMLInputElement;

      input.focus();
      await act(async () => {
        fireEvent.change(input, { target: { value: 'ja' } });

        await delay(1);
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
            value: 'notnot'
          }
        });

        await delay(1);
      });

      expect(input).toHaveValue('notnot');
    });

    it('calls onChange with autocompleted value', async () => {
      const onChange = jest.fn();
      let values: string[] = [];
      onChange.mockImplementation(ev => {
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

        await delay(1);
      });

      expect(onChange.mock.calls).toHaveLength(2);
      expect(values[0]).toBe('ja');
      expect(values[1]).toBe('Java');
    });
  });

  describe('forwarding ref', () => {
    it('exports TypeAheadInputForwardRef', () => {
      expect(ExportedTypeAheadInput).toBe(TypeAheadInputF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<TypeAheadInputF items={items} ref={ref} />);
      const input = document.querySelector('input');
      expect(ref.current).toBe(input);
    });
  });
});
