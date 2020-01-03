import React, {
  FC,
  Ref,
  InputHTMLAttributes,
  useState,
  useRef,
  useEffect,
  forwardRef
} from 'react';
import clsx from 'clsx';
import { useCombobox } from 'downshift';

import { useTheme } from '../../../hooks/useTheme';
import { useFocus } from '../../../hooks/useFocus';
import { MaevenIcon } from '../../../types';
import { Icon } from '../../Icon';
import { Text } from '../../Text';
import { Button } from '../../Button';
import { chevronDown, chevronUp } from '../../../common/defaultIcons';
import { isElementInViewport } from '../../../common/isElementInViewport';

import { classes, themeOverride } from './styles';

/**
 * With Select users can select one item from a list of values
 */
export const Select: FC<SelectProps &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'readOnly' | 'size' | 'type'
  >> = ({
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
  itemToString = (item: SelectItem): string => String(item.value),
  onChange,
  options,
  renderItem,
  searchable = false,
  size = 'md',
  style,
  value,
  ...restProps
}) => {
  const theme = useTheme();
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const [filteredOptions, setFilteredOptions] = useState(options);

  const combobox = useCombobox({
    items: filteredOptions,
    itemToString,
    initialSelectedItem: options.find(item => item.value === value),
    onSelectedItemChange: onChange,
    onInputValueChange: ({ inputValue }) => {
      setFilteredOptions(
        searchable
          ? options.filter(item => filter(item, inputValue || ''))
          : options
      );
    }
  });

  const [hasFocus, focusProps] = useFocus({
    onFocus: combobox.getInputProps(restProps).onFocus,
    onBlur: combobox.getInputProps(restProps).onBlur
  });

  useEffect(() => {
    let to: NodeJS.Timeout;
    if (combobox.isOpen) {
      to = setTimeout(() => {
        if (
          inputContainerRef.current &&
          !isElementInViewport(inputContainerRef.current)
        ) {
          inputContainerRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 100);
    }
    return () => clearTimeout(to);
  }, [combobox.isOpen]);

  return (
    <div
      className={clsx(
        classes.container,
        {
          [classes.hasIcon]: !!icon,
          [classes.hasFocus]: hasFocus,
          [classes.isOpen]: combobox.isOpen && filteredOptions.length > 0,
          [classes.sm]: size === 'sm',
          [classes.lg]: size === 'lg',
          [classes.hasError]: hasError
        },
        themeOverride(theme),
        className
      )}
      style={style}
    >
      <label className={classes.label} {...combobox.getLabelProps()}>
        <input
          {...combobox.getInputProps({
            ...restProps,
            disabled,
            ref: forwardedRef
          })}
          {...focusProps}
          className={classes.input}
          readOnly={!searchable}
        />
        {icon && <Icon className={classes.icon} icon={icon} />}
        {!searchable && !disabled && (
          <Button
            tabIndex={-1}
            {...combobox.getToggleButtonProps()}
            id={undefined}
            size={size}
            className={classes.invisibleToggle}
          />
        )}
        <Button
          {...combobox.getToggleButtonProps()}
          onClick={ev => {
            combobox.getToggleButtonProps().onClick(ev);
          }}
          tabIndex={-1}
          size={size}
          className={classes.toggle}
          buttonType="link"
          disabled={disabled}
          icon={
            combobox.isOpen
              ? chevronUpIcon || theme.iconOverrides?.chevronUp || chevronUp
              : chevronDownIcon ||
                theme.iconOverrides?.chevronDown ||
                chevronDown
          }
        />
        <div
          className={clsx(classes.listContainer, {
            [classes.hidden]: filteredOptions.length === 0
          })}
          ref={inputContainerRef}
        >
          <ul className={classes.list} {...combobox.getMenuProps()}>
            {filteredOptions.map((item, index) => (
              <li key={item.value} {...combobox.getItemProps({ index, item })}>
                <Text
                  className={clsx(classes.listItem, {
                    [classes.highlightedListItem]:
                      combobox.highlightedIndex === index,
                    [classes.selectedListItem]: combobox.selectedItem === item
                  })}
                >
                  {renderItem
                    ? renderItem(item, {
                        selected: combobox.selectedItem === item,
                        highlighted: combobox.highlightedIndex === index,
                        inputValue: combobox.inputValue
                      })
                    : item.value}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </label>
      {children ? <Text>{children}</Text> : null}
    </div>
  );
};

export const SelectForwardRef = forwardRef<
  HTMLInputElement,
  SelectProps &
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'onChange' | 'readOnly' | 'size' | 'type'
    >
>((props, ref) => <Select {...props} forwardedRef={ref} />);

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

  /** item to String */
  itemToString?: (item: SelectItem) => string;

  onChange: (ev: {
    highlightedIndex?: number;
    isOpen?: boolean;
    selectedItem?: SelectItem;
    inputValue?: string;
  }) => void;

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
  value: any;
  [key: string]: any;
}
