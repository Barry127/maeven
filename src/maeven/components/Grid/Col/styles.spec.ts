import { isHidden, getResponsiveSize } from './styles';

describe('Grid / Col / styles', () => {
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

  describe('isHidden', () => {
    it('Returns true when size is in array props.hidden', () => {
      expect(isHidden(['md', 'xl'], 'md')).toBe(true);
      expect(isHidden(['md', 'xl'], 'xl')).toBe(true);
    });

    it('Returns false when size is not in array props.hidden', () => {
      expect(isHidden(['md', 'xl'], 'lg')).toBe(false);
      expect(isHidden(['md', 'xl'], 'sm')).toBe(false);
    });

    it('Returns true if size equals props.hidden', () => {
      expect(isHidden('sm', 'sm')).toBe(true);
      expect(isHidden('lg', 'lg')).toBe(true);
    });

    it('Returns true when size is smaller than props.hidden', () => {
      expect(isHidden('sm', 'xs')).toBe(true);
      expect(isHidden('lg', 'sm')).toBe(true);
    });

    it('Returns false when size is larger than props.hidden', () => {
      expect(isHidden('sm', 'lg')).toBe(false);
      expect(isHidden('lg', 'xl')).toBe(false);
    });
  });
});