import { style } from 'typestyle';
import {
  arrowLeftSolid,
  arrowRightSolid,
  caretDownSolid,
  circleSolid,
  fileRegular,
  plusSolid,
  timesSolid,
  userCircleSolid
} from 'icon-packs/fa';
import {
  activity,
  arrowLeftCircle,
  arrowRightCircle,
  checkCircle,
  refreshCw
} from 'icon-packs/feather';
import { markGithub, logoGithub } from 'icon-packs/octicons';

import * as maeven from 'maeven';

export const scope = {
  ...maeven,

  activity,
  arrowLeftCircle,
  arrowLeftSolid,
  arrowRightCircle,
  arrowRightSolid,
  caretDownSolid,
  checkCircle,
  circleSolid,
  fileRegular,
  logoGithub,
  markGithub,
  plusSolid,
  refreshCw,
  timesSolid,
  userCircleSolid,

  typestyle: style
};
