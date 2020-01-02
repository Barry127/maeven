import clsx from 'clsx';
import { style } from 'typestyle';

import { box, pm0, scrollbars } from '../../../common/styles';
import { themeOverrideFactory } from '../../../common/themeOverrideFactory';

import {
  baseContainer,
  baseLabel,
  baseInput,
  baseInputError
} from '../baseStyles';

const label = style({
  position: 'relative',
  zIndex: 1
});

const listItem = style({
  scrollSnapAlign: 'start',
  fontSize: '1em'
});

const listContainer = style({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  transition: 'transform .125s var(--maeven-animation-default-timing-function)',
  borderRadius: 'var(--maeven-size-border-radius-medium)',
  transformOrigin: 'top',
  transform: 'scaleY(0)'
});

const list = style({
  listStyle: 'none',
  background: 'var(--maeven-color-background)',
  maxHeight: 'calc(var(--maeven-base) * 10)',
  overflow: 'auto',
  border: '1px solid var(--maeven-color-border)',
  borderTopWidth: 0,
  scrollSnapType: 'y mandatory',
  borderBottomLeftRadius: 'var(--maeven-size-border-radius-medium)',
  borderBottomRightRadius: 'var(--maeven-size-border-radius-medium)',
  $nest: {
    [`& > li:last-child .${listItem}`]: {
      borderBottomLeftRadius: 'var(--maeven-size-border-radius-medium)',
      borderBottomRightRadius: 'var(--maeven-size-border-radius-medium)'
    }
  }
});

const highlightedListItem = style({
  background: 'var(--maeven-color-primary)',
  color: 'var(--maeven-color-primary-text)'
});

const selectedListItem = style({
  fontWeight: 'bold'
});

const input = style({
  height: 'calc(var(--maeven-base) * 2)',
  width: '100%',
  padding: '0 calc(var(--maeven-base) / 2)',
  paddingRight: 'calc(var(--maeven-base) * 2)',
  $nest: {
    [`& ~ .${listContainer}`]: {
      paddingTop: 'calc(var(--maeven-base) * 2)',
      marginBottom: 'calc(var(--maeven-base) * 2)'
    },
    [`& ~ .${listContainer} .${list} .${listItem}`]: {
      padding: '0 calc(var(--maeven-base) / 2)',
      height: 'calc(var(--maeven-base) * 2)',
      lineHeight: 'calc(var(--maeven-base) * 2)'
    },
    '&:focus ~ span': {
      opacity: 0.8
    }
  }
});

const hasIcon = style({
  $nest: {
    [`.${input}`]: {
      paddingLeft: 'calc(var(--maeven-base) * 1.75)'
    },
    [`.${listContainer} .${list} .${listItem}`]: {
      paddingLeft: 'calc(var(--maeven-base) * 1.75)'
    }
  }
});

const icon = style({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  zIndex: 1,
  opacity: 0.6,
  left: 'calc(var(--maeven-base) / 2)'
});

const toggle = style({
  right: 0,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
  boxShadow: 'none !important',
  $nest: {
    '&:disabled': {
      background: 'transparent',
      filter: 'grayscale(1)'
    }
  }
});

const invisibleToggle = style({
  position: 'absolute',
  zIndex: 1,
  top: 0,
  left: 0,
  right: 0,
  width: '100%',
  opacity: 0,
  $nest: {
    '&:focus': {
      position: 'absolute'
    }
  }
});

const isOpen = style({
  $nest: {
    [`.${input}`]: {
      borderBottomColor: 'var(--maeven-color-border) !important',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    [`.${listContainer}`]: {
      transform: 'scaleY(1)'
    }
  }
});

const hasFocus = style({
  $nest: {
    [`.${label}`]: {
      zIndex: 2
    },
    [`&.${isOpen} .${input}`]: {
      borderColor: 'var(--maeven-color-focus-border)',
      boxShadow: 'none'
    },
    [`.${input}[readonly]:focus`]: {
      borderColor: 'var(--maeven-color-focus-border)',
      boxShadow:
        '0 0 calc(var(--maeven-base) / 4) calc(var(--maeven-base) / 4) var(--maeven-color-focus)'
    },
    [`&.${isOpen} .${input}[readonly]:focus`]: {
      boxShadow: 'none'
    },
    [`.${list}`]: {
      borderColor: 'var(--maeven-color-focus-border)'
    },
    [`.${listContainer}`]: {
      boxShadow:
        '0 0 calc(var(--maeven-base) / 4) calc(var(--maeven-base) / 4) var(--maeven-color-focus)'
    }
  }
});

const hidden = style({
  opacity: 0
});

const sm = style({
  $nest: {
    [`.${input}`]: {
      height: 'calc(var(--maeven-base) * 1.5)',
      padding: '0 calc(var(--maeven-base) * 0.375)'
    },
    [`.${label}`]: {
      fontSize: 'calc(var(--maeven-base) * 0.85)'
    },
    [`&.${hasIcon} .${input}`]: {
      paddingLeft: 'calc(var(--maeven-base) * 1.5)'
    },
    [`.${input} ~ .${listContainer}`]: {
      paddingTop: 'calc(var(--maeven-base) * 1.5)',
      marginBottom: 'calc(var(--maeven-base) * 1.5)'
    },
    [`.${input} ~ .${listContainer} .${list}`]: {
      maxHeight: 'calc(var(--maeven-base) * 7.5)'
    },
    [`.${input} ~ .${listContainer} .${list} .${listItem}`]: {
      padding: '0 calc(var(--maeven-base) / 1.5)',
      height: 'calc(var(--maeven-base) * 1.5)',
      lineHeight: 'calc(var(--maeven-base) * 1.5)'
    },
    [`&.${hasIcon} .${input} ~ .${listContainer} .${list} .${listItem}`]: {
      paddingLeft: 'calc(var(--maeven-base) * 1.5)'
    }
  }
});

const lg = style({
  $nest: {
    [`.${input}`]: {
      height: 'calc(var(--maeven-base) * 3)',
      padding: '0 var(--maeven-base)'
    },
    [`.${label}`]: {
      fontSize: 'calc(var(--maeven-base) * 1.15)'
    },
    [`&.${hasIcon} .${icon}`]: {
      left: 'calc(var(--maeven-base) * 0.75)'
    },
    [`&.${hasIcon} .${input}`]: {
      paddingLeft: 'calc(var(--maeven-base) * 2.5)'
    },
    [`.${input} ~ .${listContainer}`]: {
      paddingTop: 'calc(var(--maeven-base) * 3)',
      marginBottom: 'calc(var(--maeven-base) * 3)'
    },
    [`.${input} ~ .${listContainer} .${list}`]: {
      maxHeight: 'calc(var(--maeven-base) * 15)'
    },
    [`.${input} ~ .${listContainer} .${list} .${listItem}`]: {
      padding: '0 calc(var(--maeven-base) / 3)',
      height: 'calc(var(--maeven-base) * 3)',
      lineHeight: 'calc(var(--maeven-base) * 3)'
    },
    [`&.${hasIcon} .${input} ~ .${listContainer} .${list} .${listItem}`]: {
      paddingLeft: 'calc(var(--maeven-base) * 3)'
    }
  }
});

const hasError = style({
  $nest: {
    [`.${label} + div`]: {
      color: 'var(--maeven-color-danger)'
    },
    [`&.${isOpen}.${hasFocus} .${input}`]: {
      borderColor: 'var(--maeven-color-danger-d10)'
    },
    [`&.${hasFocus} .${input}[readonly]:focus`]: {
      borderColor: 'var(--maeven-color-danger-d10)',
      boxShadow:
        '0 0 calc(var(--maeven-base) / 4) calc(var(--maeven-base) / 4) var(--maeven-color-danger-f50)'
    },
    [`&.${isOpen}.${hasFocus} .${input}[readonly]:focus`]: {
      boxShadow: 'none'
    },
    [`&.${hasFocus} .${list}`]: {
      borderColor: 'var(--maeven-color-danger-d10)'
    },
    [`&.${hasFocus} .${listContainer}`]: {
      boxShadow:
        '0 0 calc(var(--maeven-base) / 4) calc(var(--maeven-base) / 4) var(--maeven-color-danger-f50)'
    },
    [`.${selectedListItem}`]: {
      color: 'var(--maeven-color-danger)'
    },
    [`.${selectedListItem}.${highlightedListItem}`]: {
      background: 'var(--maeven-color-danger)',
      color: 'var(--maeven-color-danger-text)'
    }
  }
});

export const classes = {
  container: baseContainer,
  label: clsx(baseLabel, label),
  input: clsx(box, baseInput, input),
  hasIcon,
  hasFocus,
  hasError: clsx(baseInputError, hasError),
  isOpen,
  icon,
  toggle,
  invisibleToggle,
  listContainer: clsx(box, pm0, listContainer),
  list: clsx(box, pm0, scrollbars, list),
  listItem,
  highlightedListItem,
  selectedListItem,
  hidden,
  sm,
  lg
};

export const themeOverride = themeOverrideFactory('Select');
