import { circleSolid } from 'icon-packs/fa';
import {
  arrowLeftCircle,
  arrowRightCircle,
  checkCircle
} from 'icon-packs/feather';
import { markGithub, logoGithub } from 'icon-packs/octicons';
import * as maeven from 'maeven';
import theme from 'src/themes/maeven';

export const scope = {
  ...maeven,
  maeven: theme,
  arrowLeftCircle,
  arrowRightCircle,
  checkCircle,
  circleSolid,
  logoGithub,
  markGithub
};
