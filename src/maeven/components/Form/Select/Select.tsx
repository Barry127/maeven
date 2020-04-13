import React, {
  FC,
  Ref,
  InputHTMLAttributes,
  useState,
  useRef,
  useEffect,
  forwardRef,
  useCallback,
  KeyboardEvent,
  FocusEvent
} from 'react';
import clsx from 'clsx';

import { useFocus, useId } from '../../../hooks';
import { MaevenIcon } from '../../../types';
import { Icon } from '../../Icon';
import { Text } from '../../Text';
import { Button } from '../../Button';
import { chevronDown, chevronUp } from '../../../common/defaultIcons';
import { isElementInViewport } from '../../../common/isElementInViewport';
import { mergeRefs } from 'maeven/common/mergeRefs';

/**
 * With Select users can select one item from a list of values
 */
export const Select: FC<AllSelectProps> = ({
  chevronDownIcon,
  chevronUpIcon,
  children,
  className,
  disabled = false,
  filter = (item: SelectItem, inputValue: string): boolean =>
    !inputValue ||
    String(item.value)
      .toLocaleLowerCase()
      .includes(inputValue.toLocaleLowerCase()),
  forwardedRef,
  hasError = false,
  icon,
  initialValue,
  itemToString = (item: SelectItem): string => String(item?.value),
  onBlur: propsOnBlur,
  onChange,
  onFocus,
  options,
  renderItem,
  searchable = false,
  size = 'md',
  style,
  ...restProps
}) => {
  const listId = useId();
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemMouseDown = useRef<boolean>(false);
  const listRef = useRef<HTMLUListElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [withKey, setWithKey] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectItem | null>(
    initialValue
      ? options.filter(item => item.value === initialValue.value)[0] || null
      : null
  );
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [query, setQuery] = useState(
    selectedItem ? itemToString(selectedItem) : ''
  );

  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && withKey) {
      const item = document.querySelector(
        `#${listId} .mvn-select-highlighted-item`
      );
      if (listRef.current && item) {
        const {
          top: listTop,
          height: listHeight
        } = listRef.current.getBoundingClientRect();
        const { height, top } = item.getBoundingClientRect();
        const relativeTop = top - listTop;
        if (relativeTop >= listHeight) {
          listRef.current.scrollTo({
            top: highlightedIndex * height - 4 * height
          });
        } else if (relativeTop < 0) {
          listRef.current.scrollTo({ top: highlightedIndex * height });
        }
        if (height === 0) {
          listRef.current?.parentElement?.addEventListener(
            'transitionend',
            () => {
              setWithKey(true);
            },
            { once: true }
          );
        }
      }
      setWithKey(false);
    }
  }, [highlightedIndex, listId, withKey, isOpen]);

  const onItemMouseDown = useCallback(() => {
    itemMouseDown.current = true;

    document.addEventListener(
      'mouseup',
      () => {
        itemMouseDown.current = false;
      },
      { once: true }
    );
  }, []);

  const onBlur = useCallback(
    (ev: FocusEvent<HTMLInputElement>) => {
      if (itemMouseDown.current) return;
      if (typeof propsOnBlur === 'function') {
        propsOnBlur(ev);
      }

      setQuery(selectedItem ? itemToString(selectedItem) : '');
      setOpen(false);
    },
    [propsOnBlur, itemToString, selectedItem]
  );

  const onInputChange = useCallback(
    ev => {
      setQuery(ev.target.value);
      setFilteredOptions(options.filter(item => filter(item, ev.target.value)));
      setOpen(true);
    },
    [options, filter]
  );

  const toggleOpen = useCallback(() => {
    setOpen(!isOpen);
    inputRef.current?.focus();
  }, [isOpen, inputRef]);

  const [hasFocus, focusProps] = useFocus({ onBlur, onFocus });

  const selectItem = useCallback(
    (item: SelectItem) => {
      setOpen(false);
      const query = itemToString(item);
      setSelectedItem(item);
      setQuery(query);
      onChange && onChange({ selectedItem: item, inputValue: query });
    },
    [itemToString, onChange]
  );

  const onKeyDown = useCallback(
    (ev: KeyboardEvent<HTMLInputElement>) => {
      if (ev.key === 'ArrowUp' || ev.keyCode === 38) {
        ev.preventDefault();
        const nextIndex =
          highlightedIndex === -1
            ? filteredOptions.length - 1
            : Math.max(0, highlightedIndex - 1);
        setHighlightedIndex(nextIndex);
        setWithKey(true);
        if (!isOpen) {
          setOpen(true);
        }
      }

      if (ev.key === 'ArrowDown' || ev.keyCode === 40) {
        ev.preventDefault();
        const nextIndex =
          highlightedIndex === -1
            ? 0
            : Math.min(filteredOptions.length - 1, highlightedIndex + 1);
        setHighlightedIndex(nextIndex);
        setWithKey(true);
        if (!isOpen) {
          setOpen(true);
        }
      }

      if (isOpen && (ev.key === 'Escape' || ev.keyCode === 27)) {
        ev.preventDefault();
        setOpen(false);
      }

      if (isOpen && (ev.key === 'Enter' || ev.keyCode === 13)) {
        ev.preventDefault();
        selectItem(filteredOptions[highlightedIndex]);
      }
    },
    [isOpen, filteredOptions, highlightedIndex, selectItem]
  );

  useEffect(() => {
    if (isOpen) {
      listRef.current?.parentElement?.addEventListener(
        'transitionend',
        () => {
          if (
            inputContainerRef.current &&
            !isElementInViewport(inputContainerRef.current)
          ) {
            inputContainerRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }
        },
        { once: true }
      );
    }
  }, [isOpen]);

  return (
    <div
      className={clsx(
        'mvn-select',
        {
          'mvn-has-icon': !!icon,
          'mvn-select-focus': hasFocus,
          'mvn-select-open': isOpen && filteredOptions.length > 0,
          'mvn-select-sm': size === 'sm',
          'mvn-select-lg': size === 'lg',
          'mvn-select-error': hasError
        },
        className
      )}
      style={style}
    >
      <label className="mvn-select-label">
        <input
          {...restProps}
          disabled={disabled}
          readOnly={!searchable}
          autoComplete="{off}"
          value={query}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          ref={mergeRefs(forwardedRef, inputRef)}
          {...focusProps}
          aria-autocomplete="list"
          aria-controls={listId}
        />
        {icon && <Icon icon={icon} />}
        {!searchable && !disabled && (
          <Button
            tabIndex={-1}
            size={size}
            className="mvn-select-invisible-toggle"
            onClick={toggleOpen}
          />
        )}
        <Button
          tabIndex={-1}
          size={size}
          className="mvn-select-toggle"
          buttonType="link"
          disabled={disabled}
          icon={
            isOpen ? chevronUpIcon || chevronUp : chevronDownIcon || chevronDown
          }
          onClick={toggleOpen}
        />
        <div
          className={clsx('mvn-select-list-container', {
            'mvn-select-list-container-hidden': filteredOptions.length === 0
          })}
          ref={inputContainerRef}
        >
          <ul id={listId} role="listbox" ref={listRef}>
            {filteredOptions.map((item, index) => (
              <li
                key={item.value}
                role="option"
                aria-selected={highlightedIndex === index}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => selectItem(item)}
                onMouseDown={onItemMouseDown}
              >
                <Text
                  className={clsx({
                    'mvn-select-highlighted-item': highlightedIndex === index,
                    'mvn-select-selected-item': selectedItem === item
                  })}
                >
                  {renderItem
                    ? renderItem(item, {
                        selected: selectedItem === item,
                        highlighted: highlightedIndex === index,
                        inputValue: query?.toString() || ''
                      })
                    : item.value}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </label>
      {children ? (
        <Text color={hasError ? 'danger' : undefined}>{children}</Text>
      ) : null}
    </div>
  );
};

export const SelectF = forwardRef<HTMLInputElement, AllSelectProps>(
  (props, ref) => <Select {...props} forwardedRef={ref} />
);

export type AllSelectProps = SelectProps &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'readOnly' | 'size' | 'type' | 'value'
  >;

export interface SelectProps {
  /** toggle open icon (defaults to Feather icons chevronDown) */
  chevronDownIcon?: MaevenIcon;

  /** toggle open icon (defaults to Feather icons chevronUp) */
  chevronUpIcon?: MaevenIcon;

  /** Wether select is disabled */
  disabled?: boolean;

  forwardedRef?: Ref<HTMLInputElement>;

  /** Filter function */
  filter?: (item: SelectItem, inputValue: string) => boolean;

  /** Wether input contains an error */
  hasError?: boolean;

  /** Icon for input */
  icon?: MaevenIcon;

  /** initial selected value */
  initialValue?: SelectItem;

  /** item to String */
  itemToString?: (item: SelectItem) => string;

  onChange?: (ev: { selectedItem?: SelectItem; inputValue?: string }) => void;

  /** Options for select */
  options: SelectItem[];

  /** custom renderer for items in dropdown */
  renderItem?: (
    item: SelectItem,
    options: {
      selected: boolean;
      highlighted: boolean;
      inputValue: string | null;
    }
  ) => JSX.Element;

  /** Wether the options list is searchable */
  searchable?: boolean;

  /** Select size */
  size?: 'sm' | 'md' | 'lg';
}

export interface SelectItem {
  value?: any;
  [key: string]: any;
}
