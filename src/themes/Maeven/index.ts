import webFont from 'webfontloader';

import { Theme } from '../types';

webFont.load({
  google: { families: ['Droid Sans:400,700'] }
});

const meavenTheme: Theme = {
  name: 'Maeven'
};

export default meavenTheme;
