import { KeyboardEvent, MouseEvent, FocusEvent } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useButton } from './helpers';
import { ButtonProps } from './Button';
import { getStylesForSelector } from '../../../testHelpers';

describe('useButton', () => {
  const basicProps = {
    color: 'primary'
  } as ButtonProps;

  it('has no focusOutline by default', () => {
    const { result } = renderHook(() => useButton(basicProps, 'Button'));
    const { className } = result.current.props;
    expect(className.split(' ')).toHaveLength(1);
  });

  it('has focusOutline when button has autoFocus property', () => {
    const { result } = renderHook(() =>
      useButton({ ...basicProps, autoFocus: true }, 'Button')
    );
    const { className } = result.current.props;
    const classes = className.split(' ');
    expect(classes).toHaveLength(2);
    const styles = getStylesForSelector(new RegExp(`.${classes[1]}::before`));
    expect(styles).toHaveProperty('content', '""');
    expect(styles).toHaveProperty('boxShadow');
  });

  it('adds onBlur, onKeyUp and onMouseDown functions', () => {
    const { result } = renderHook(() => useButton(basicProps, 'Button'));
    expect(typeof result.current.props.onBlur).toBe('function');
    expect(typeof result.current.props.onKeyUp).toBe('function');
    expect(typeof result.current.props.onMouseDown).toBe('function');
  });

  it('calls passed functions in props for onBlur onKeyUp and onMouseDown', () => {
    const onBlur = jest.fn();
    const onKeyUp = jest.fn();
    const onMouseDown = jest.fn();

    const { result } = renderHook(() =>
      useButton({ ...basicProps, onBlur, onKeyUp, onMouseDown }, 'Button')
    );

    result.current.props.onBlur('blur' as any);
    result.current.props.onKeyUp('keyup' as any);
    result.current.props.onMouseDown('mousedown' as any);

    expect(onBlur.mock.calls.length).toBe(1);
    expect(onBlur.mock.calls[0][0]).toBe('blur');
    expect(onKeyUp.mock.calls.length).toBe(1);
    expect(onKeyUp.mock.calls[0][0]).toBe('keyup');
    expect(onMouseDown.mock.calls.length).toBe(1);
    expect(onMouseDown.mock.calls[0][0]).toBe('mousedown');
  });

  it('sets focusOutline to true when keyup is tab key', () => {
    const { result } = renderHook(() => useButton(basicProps, 'Button'));
    expect(result.current.props.className.split(' ')).toHaveLength(1);

    act(() => {
      result.current.props.onKeyUp({ keyCode: 9 } as KeyboardEvent<
        HTMLButtonElement
      >);
    });

    const { className } = result.current.props;
    expect(result.current.props.className.split(' ')).toHaveLength(2);
  });

  it('removes focusOutline on mouseup', () => {
    const { result } = renderHook(() =>
      useButton({ ...basicProps, autoFocus: true }, 'Button')
    );
    expect(result.current.props.className.split(' ')).toHaveLength(2);

    act(() => {
      result.current.props.onMouseDown({} as MouseEvent<HTMLButtonElement>);
    });

    expect(result.current.props.className.split(' ')).toHaveLength(1);
  });

  it('removes focusOutline on blur', () => {
    const { result } = renderHook(() =>
      useButton({ ...basicProps, autoFocus: true }, 'Button')
    );
    expect(result.current.props.className.split(' ')).toHaveLength(2);

    act(() => {
      result.current.props.onBlur({} as FocusEvent<HTMLButtonElement>);
    });

    expect(result.current.props.className.split(' ')).toHaveLength(1);
  });
});
