import { SyntheticEvent, useEffect, RefObject } from 'react';

const escBlacklist = ['INPUT', 'TEXTAREA', 'SELECT'];

export function useFocusHandling({
  focusAfterClose,
  focusAfterOpen,
  isOpen
}: {
  focusAfterClose?: RefObject<any>;
  focusAfterOpen: RefObject<any>;
  isOpen: boolean;
}) {
  useEffect(() => {
    const opener = (document.activeElement as any) as {
      blur: () => void;
      focus: () => void;
    };

    setTimeout(() => {
      if (
        isOpen &&
        focusAfterOpen &&
        focusAfterOpen.current &&
        typeof focusAfterOpen.current.focus === 'function'
      ) {
        focusAfterOpen.current.focus();
      }
    });

    if (isOpen) {
      opener.blur();

      return () => {
        if (
          focusAfterClose &&
          typeof focusAfterClose.current.focus === 'function'
        ) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          focusAfterClose.current.focus();
        } else {
          opener.focus();
        }
      };
    }

    return;

    // disable exhaustive-deps, focus calls should only be called once when isOpen changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
}

export function useCloseOnEscape({
  closable,
  isOpen,
  onClose
}: {
  closable: boolean;
  isOpen: boolean;
  onClose?: (ev: SyntheticEvent<HTMLElement> | Event) => void;
}) {
  useEffect(() => {
    if (isOpen && closable && typeof onClose === 'function') {
      const listener = (ev: KeyboardEvent) => {
        //@ts-ignore
        const tagName = ev.target && ev.target.tagName;

        if (
          (ev.key === 'Escape' || ev.keyCode === 27) &&
          !escBlacklist.includes(tagName)
        ) {
          onClose(ev);
        }
      };
      document.addEventListener('keyup', listener);

      return () => {
        document.removeEventListener('keyup', listener);
      };
    }

    return;
  }, [closable, isOpen, onClose]);
}
