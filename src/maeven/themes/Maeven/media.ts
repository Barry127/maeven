import { MediaDefinition } from '../../types';

export const xs: MediaDefinition = {
  from: 0,
  to: 575.98,
  mediaMin: '(min-width: none)',
  mediaMax: '(max-width: 575.98px)'
};

export const sm: MediaDefinition = {
  from: 576,
  to: 767.98,
  mediaMin: '(min-width: 576px)',
  mediaMax: '(max-width: 767.98px)'
};

export const md: MediaDefinition = {
  from: 768,
  to: 991.98,
  mediaMin: '(min-width: 768px)',
  mediaMax: '(max-width: 991.98px)'
};

export const lg: MediaDefinition = {
  from: 992,
  to: 1199.98,
  mediaMin: '(min-width: 992px)',
  mediaMax: '(max-width: 1199.98px)'
};

export const xl: MediaDefinition = {
  from: 1200,
  to: Infinity,
  mediaMin: '(min-width: 1200px)',
  mediaMax: '(max-width: none)'
};
