import { getResponsiveSize, hasResponsiveProps, isHidden } from './styles';

describe('Grid / styles', () => {
  describe('getResponsiveSize', () => {
    it('Returns spanSize when no size on props', () => {
      expect(getResponsiveSize({}, 'md', '100%')).toBe('100%');
    });

    it('Returns spanSize when no size is xs but no resoponsive sizes are set', () => {
      expect(getResponsiveSize({}, 'xs', '100%')).toBe('100%');
    });

    it('Returns 25% when size sm and sm is 6', () => {
      const props = { sm: 6 };
      expect(getResponsiveSize(props, 'sm', '100%')).toBe('25%');
    });

    it('Returns 25% when size lg and lg is 6', () => {
      const props = { lg: 6 };
      expect(getResponsiveSize(props, 'lg', '100%')).toBe('25%');
    });

    it('Returns 25% when size sm, lg is 6 and sm is not set', () => {
      const props = { lg: 6 };
      expect(getResponsiveSize(props, 'sm', '100%')).toBe('25%');
    });
  });

  describe('hasResponsiveProps', () => {
    it('Returns true when props contains xs', () => {
      expect(hasResponsiveProps({ xs: 24 })).toBe(true);
    });

    it('Returns true when props contains sm', () => {
      expect(hasResponsiveProps({ sm: 12 })).toBe(true);
    });

    it('Returns true when props contains md', () => {
      expect(hasResponsiveProps({ md: 6 })).toBe(true);
    });

    it('Returns true when props contains lg', () => {
      expect(hasResponsiveProps({ lg: 3 })).toBe(true);
    });

    it('Returns true when props contains xl', () => {
      expect(hasResponsiveProps({ xl: 0 })).toBe(true);
    });

    it('Returns false when no size is set in props', () => {
      expect(hasResponsiveProps({})).toBe(false);
    });
  });

  describe('isHidden', () => {
    it('Returns true when size is in array props.hidden', () => {
      expect(isHidden({ hidden: ['md', 'xl'] }, 'md')).toBe(true);
      expect(isHidden({ hidden: ['md', 'xl'] }, 'xl')).toBe(true);
    });

    it('Returns false when size is not in array props.hidden', () => {
      expect(isHidden({ hidden: ['md', 'xl'] }, 'lg')).toBe(false);
      expect(isHidden({ hidden: ['md', 'xl'] }, 'sm')).toBe(false);
    });

    it('Returns true if size equals props.hidden', () => {
      expect(isHidden({ hidden: 'sm' }, 'sm')).toBe(true);
      expect(isHidden({ hidden: 'lg' }, 'lg')).toBe(true);
    });

    it('Returns true when size is smaller than props.hidden', () => {
      expect(isHidden({ hidden: 'sm' }, 'xs')).toBe(true);
      expect(isHidden({ hidden: 'lg' }, 'sm')).toBe(true);
    });

    it('Returns false when size is larger than props.hidden', () => {
      expect(isHidden({ hidden: 'sm' }, 'lg')).toBe(false);
      expect(isHidden({ hidden: 'lg' }, 'xl')).toBe(false);
    });
  });
});
