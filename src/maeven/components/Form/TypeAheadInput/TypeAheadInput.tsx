import React, {
  FC,
  InputHTMLAttributes,
  forwardRef,
  useState,
  ChangeEvent,
  useCallback,
  KeyboardEvent,
  useRef,
  useEffect
} from 'react';

import { inlineLoading } from '../../../common/defaultIcons';

import { TextInputProps, TextInput } from '../TextInput/TextInput';
import { getSuggestion } from './getSuggestion';

/**
 * TypeAheadInput enhances TextInput to inline autocomplete from a list.
 */
export const TypeAheadInput: FC<AllTypeAheadInputProps> = ({
  children,
  className,
  disabled = false,
  hasError = false,
  onChange: propsOnchange = () => {},
  onKeyDown: propsonKeyDown,
  iconRight,
  items,
  size = 'md',
  value: propsValue,
  ...restProps
}) => {
  const [suppressSuggestion, setSuppressSuggestion] = useState(false);
  const [loading, setLoading] = useState(false);
  const promiseCounter = useRef(0);

  useEffect(() => {
    return () => {
      //eslint-disable-next-line
      promiseCounter.current++;
    };
  }, []);

  const onKeyDown = useCallback(
    (ev: KeyboardEvent<HTMLInputElement>) => {
      // backspace & delete
      if (ev.keyCode === 8 || ev.keyCode === 46) {
        setSuppressSuggestion(true);
      }

      if (typeof propsonKeyDown === 'function') {
        propsonKeyDown(ev);
      }
    },
    [propsonKeyDown, setSuppressSuggestion]
  );

  const handleSuggestion = useCallback(
    (ev: ChangeEvent<HTMLInputElement>, suggestion?: string) => {
      const originalValue = ev.target.value;

      if (suggestion) {
        ev.target.value = suggestion;
      }

      propsOnchange(ev);

      if (suggestion && document.activeElement === ev.target) {
        ev.target.selectionStart = originalValue.length;
        ev.target.selectionEnd = suggestion.length;
      }
    },
    [propsOnchange]
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
      } else {
        const result = items(ev.target.value);

        if (Array.isArray(result)) {
          handleSuggestion(ev, getSuggestion(ev.target.value, result));
        } else {
          setLoading(true);
          promiseCounter.current++;
          const current = promiseCounter.current;
          ev.persist();
          propsOnchange(ev);
          result.then(promiseResult => {
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
    [
      handleSuggestion,
      items,
      propsOnchange,
      suppressSuggestion,
      setSuppressSuggestion,
      setLoading
    ]
  );

  return (
    <TextInput
      className={className}
      disabled={disabled}
      hasError={hasError}
      size={size}
      onChange={onChange}
      onKeyDown={onKeyDown}
      iconRight={loading ? inlineLoading : iconRight}
      {...restProps}
    >
      {children}
    </TextInput>
  );
};

export const TypeAheadInputF = forwardRef<
  HTMLInputElement,
  AllTypeAheadInputProps
>((props, ref) => <TypeAheadInput {...props} forwardedRef={ref} />);

export type AllTypeAheadInputProps = TypeAheadInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export interface TypeAheadInputProps extends TextInputProps {
  items: string[] | syncGetItems | asyncGetItems;
}

export type syncGetItems = (value: string) => string[];
export type asyncGetItems = (value: string) => Promise<string[]>;