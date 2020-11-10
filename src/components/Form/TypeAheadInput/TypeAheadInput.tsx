import clsx from 'clsx';
import React, {
  ChangeEvent,
  forwardRef,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { TextInput, TextInputProps } from '../TextInput';
import { getSuggestion } from './getSuggestion';

/**
 * TypeAheadInput enhances TextInput to inline autocomplete from a list.
 */
export const TypeAheadInput = forwardRef<HTMLInputElement, TypeAheadInputProps>(
  (
    {
      children,
      className,
      disabled = false,
      hasError = false,
      items,
      loading: propsLoading = false,
      onChange: propsOnChange = () => {},
      onKeyDown: propsOnKeyDown,
      size = 'md',
      value: propsValue,
      ...props
    },
    ref
  ) => {
    const [suppressSuggestion, setSuppressSuggestion] = useState(false);
    const [loading, setLoading] = useState(false);
    const promiseCounter = useRef(0);

    useEffect(() => {
      promiseCounter.current++;
    }, []);

    const onKeyDown = useCallback(
      (ev: KeyboardEvent<HTMLInputElement>) => {
        if (ev.key === 'Backspace' || ev.key === 'Delete') {
          setSuppressSuggestion(true);
        }

        if (typeof propsOnKeyDown === 'function') {
          propsOnKeyDown(ev);
        }
      },
      [propsOnKeyDown]
    );

    const handleSuggestion = useCallback(
      (ev: ChangeEvent<HTMLInputElement>, suggestion?: string) => {
        const originalValue = ev.target.value;
        if (suggestion) {
          ev.target.value = suggestion;
        }
        propsOnChange(ev);

        if (suggestion && document.activeElement === ev.target) {
          ev.target.selectionStart = originalValue.length;
          ev.target.selectionEnd = suggestion.length;
        }
      },
      [propsOnChange]
    );

    const onChange = useCallback(
      (ev: ChangeEvent<HTMLInputElement>) => {
        if (suppressSuggestion) {
          handleSuggestion(ev);
          setSuppressSuggestion(false);
          return;
        }

        if (Array.isArray(items)) {
          handleSuggestion(ev, getSuggestion(ev.target.value, items));
          return;
        } else {
          const result = items(ev.target.value);
          if (Array.isArray(result)) {
            handleSuggestion(ev, getSuggestion(ev.target.value, result));
          } else {
            setLoading(true);
            promiseCounter.current++;
            const current = promiseCounter.current;
            ev.persist();
            propsOnChange(ev);
            result.then((promiseResult) => {
              const suggestion = getSuggestion(ev.target.value, promiseResult);
              if (current === promiseCounter.current) {
                setLoading(false);
              }
              if (current === promiseCounter.current && suggestion) {
                handleSuggestion(ev, suggestion);
              }
            });
          }
        }
      },
      [handleSuggestion, items, propsOnChange, suppressSuggestion]
    );

    return (
      <TextInput
        {...props}
        className={clsx('mvn--type-ahead-input', className)}
        disabled={disabled}
        hasError={hasError}
        loading={loading || propsLoading}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={ref}
        size={size}
      >
        {children}
      </TextInput>
    );
  }
);

export interface TypeAheadInputProps extends TextInputProps {
  items: string[] | syncGetItems | asyncGetItems;
}

export type syncGetItems = (value: string) => string[];
export type asyncGetItems = (value: string) => Promise<string[]>;
