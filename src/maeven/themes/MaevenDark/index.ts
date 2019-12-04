import { color } from 'csx';

import MaevenDefault from '../Maeven';
import { Theme } from '../../types';

import { black } from './colors';

const theme: Theme = {
  ...MaevenDefault,
  name: 'Maeven Dark',
  colors: {
    name: {
      ...MaevenDefault.colors.name,
      black
    },
    semantic: {
      ...MaevenDefault.colors.semantic
    },
    role: {
      ...MaevenDefault.colors.role,
      linkHover: MaevenDefault.colors.name.orange,
      linkFocus: MaevenDefault.colors.name.orange,
      linkActive: color(MaevenDefault.colors.name.orange)
        .darken(0.1)
        .toString()
    }
  },
  typography: { ...MaevenDefault.typography }
};

theme.colors.role = {
  ...theme.colors.role,
  background: theme.colors.name.black,
  heading: theme.colors.name.white,
  text: theme.colors.name.white
};

export default theme;
