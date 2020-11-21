import clsx from 'clsx';
import React, {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { chevronDown, chevronUp } from '../../../common/defaultIcons';
import { useFocus, useId, useTheme } from '../../../hooks';
import { isElementInViewport } from '../../../lib/isElementInViewport';
import { mergeRefs } from '../../../lib/mergeRefs';
import { MaevenIcon } from '../../../types';
import { Block } from '../../Block';
import { Button, ControlButton } from '../../Button';
import { Icon } from '../../Icon';
import { Spinner } from '../../Spinner';
import { OptionalField } from '../Form';
import classes from './select.module.scss';

/**
 * With Select users can select one item from a list of values
 */
export const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      chevronDownIcon,
      chevronUpIcon,
      children,
      className,
      disabled = false,
      filter = (item, inputValue) =>
        !inputValue ||
        String(item.value)
          .toLocaleLowerCase()
          .includes(inputValue.toLocaleLowerCase()),
      hasError = false,
      icon,
      initialValue,
      itemToString = (item) => String(item.value),
      label,
      loading = false,
      onBlur: propsOnBlur,
      onChange,
      onFocus,
      options,
      renderItem,
      searchable = false,
      size = 'md',
      style,
      ...props
    },
    ref
  ) => {
    const { iconOverrides } = useTheme();
    const id = useId(props);
    const labelId = useId();
    const listId = useId();
    const listContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const invisibleToggleRef = useRef<HTMLButtonElement>(null);
    const itemMouseDown = useRef(false);
    const [isOpen, setOpen] = useState(false);
    const [withKey, setWithKey] = useState(false);
    const [selectedItem, setSelectedItem] = useState<SelectItem | null>(
      initialValue
        ? options.filter((item) => item.value === initialValue.value)[0] || null
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
          `#${listId} .${classes.highlighted}`
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
            listContainerRef.current?.addEventListener(
              'transitionend',
              () => {
                setWithKey(true);
              },
              { once: true }
            );
          }
          setWithKey(false);
        }
      }
    }, [highlightedIndex, isOpen, listId, withKey]);

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
        if (
          ev.relatedTarget !== toggleRef.current &&
          ev.relatedTarget !== invisibleToggleRef.current
        ) {
          setOpen(false);
        }
      },
      [itemToString, propsOnBlur, selectedItem]
    );

    const onInputChange = useCallback(
      (ev: ChangeEvent<HTMLInputElement>) => {
        setQuery(ev.target.value);
        setFilteredOptions(
          options.filter((item) => filter(item, ev.target.value))
        );
        setOpen(true);
      },
      [filter, options]
    );

    const toggleOpen = useCallback(() => {
      setOpen(!isOpen);
      inputRef.current?.focus();
    }, [isOpen]);

    const [hasFocus, focusProps] = useFocus({ onBlur, onFocus });

    const selectItem = useCallback(
      (item: SelectItem) => {
        setOpen(false);
        const query = itemToString(item);
        setSelectedItem(item);
        setQuery(query);
        if (typeof onChange === 'function') {
          onChange({ selectedItem: item, inputValue: query });
        }
      },
      [itemToString, onChange]
    );

    const onKeyDown = useCallback(
      (ev: KeyboardEvent<HTMLInputElement>) => {
        if (ev.key === 'ArrowUp') {
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

        if (ev.key === 'ArrowDown') {
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

        if (isOpen && ev.key === 'Escape') {
          ev.preventDefault();
          setOpen(false);
        }

        if (isOpen && ev.key === 'Enter') {
          ev.preventDefault();
          selectItem(filteredOptions[highlightedIndex]);
        }
      },
      [filteredOptions, highlightedIndex, isOpen, selectItem]
    );

    useEffect(() => {
      if (isOpen) {
        listContainerRef.current?.addEventListener(
          'transitionend',
          () => {
            if (
              listContainerRef.current &&
              !isElementInViewport(listContainerRef.current)
            ) {
              listContainerRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
              });
            }
          },
          {
            once: true
          }
        );
      }
    }, [isOpen]);

    return (
      <OptionalField
        hasError={hasError}
        htmlFor={id}
        label={label}
        labelId={labelId}
        size={size}
      >
        <div
          className={clsx(
            'mvn--select',
            classes.container,
            classes[size],
            {
              [classes['has-icon']]: !!icon || loading,
              [classes['has-error']]: hasError,
              [classes.focus]: hasFocus,
              [classes.open]: isOpen && filteredOptions.length > 0
            },
            className
          )}
          style={style}
        >
          <label className={classes.label}>
            <input
              {...props}
              {...focusProps}
              autoComplete="off"
              className={classes.input}
              disabled={disabled}
              id={id}
              onChange={onInputChange}
              onKeyDown={onKeyDown}
              readOnly={!searchable}
              ref={mergeRefs(ref, inputRef)}
              type="text"
              value={query}
              aria-autocomplete="list"
              aria-controls={listId}
              aria-describedby={label ? labelId : undefined}
            />
            {icon && !loading && <Icon className={classes.icon} icon={icon} />}
            {loading && <Spinner size="1em" className={classes.spinner} />}
            {!searchable && !disabled && (
              <Button
                className={classes['invisible-toggle']}
                ref={invisibleToggleRef}
                onClick={toggleOpen}
                size={size}
                tabIndex={-1}
              />
            )}
            <ControlButton
              className={classes.toggle}
              disabled={disabled}
              icon={
                isOpen
                  ? chevronUpIcon || iconOverrides.chevronUp || chevronUp
                  : chevronDownIcon || iconOverrides.chevronDown || chevronDown
              }
              onClick={toggleOpen}
              ref={toggleRef}
              size={size}
              tabIndex={-1}
            />
            <div
              className={clsx(classes['list-container'], {
                [classes.hidden]: filteredOptions.length < 1
              })}
              ref={listContainerRef}
            >
              <ul
                className={classes.list}
                id={listId}
                ref={listRef}
                role="listbox"
              >
                {filteredOptions.map((item, index) => (
                  <li
                    key={item.value}
                    onClick={() => selectItem(item)}
                    onMouseDown={onItemMouseDown}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    role="option"
                    aria-selected={highlightedIndex === index}
                  >
                    <Block
                      className={clsx(classes.item, {
                        [classes.highlighted]: highlightedIndex === index,
                        [classes.selected]: selectedItem === item
                      })}
                    >
                      {renderItem
                        ? renderItem(item, {
                            selected: selectItem === item,
                            highlighted: highlightedIndex === index,
                            inputValue: query || ''
                          })
                        : item.value}
                    </Block>
                  </li>
                ))}
              </ul>
            </div>
          </label>
          {children ? <Block className={classes.text}>{children}</Block> : null}
        </div>
      </OptionalField>
    );
  }
);

export interface SelectProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'autoComplete' | 'onChange' | 'readOnly' | 'size' | 'type' | 'value'
  > {
  /** toggle open icon (defaults to Feather icons chevronDown) */
  chevronDownIcon?: MaevenIcon;

  /** toggle open icon (defaults to Feather icons chevronUp) */
  chevronUpIcon?: MaevenIcon;

  /** Wether select is disabled */
  disabled?: boolean;

  /** Filter function */
  filter?: (item: SelectItem, inputValue: string) => boolean;

  /** Wether select contains an error */
  hasError?: boolean;

  /** Icon for select */
  icon?: MaevenIcon;

  /** initial selected value */
  initialValue?: SelectItem;

  /** item to String */
  itemToString?: (item: SelectItem) => string;

  /** Label text */
  label?: ReactNode;

  /** Wether select has loading state */
  loading?: boolean;

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
