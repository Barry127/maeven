import { useState } from 'react';
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
  check,
  checkCircle,
  lock,
  helpCircle,
  refreshCw,
  tag,
  user,
  x
} from 'icon-packs/feather';
import { markGithub, logoGithub } from 'icon-packs/octicons';

import * as maeven from 'maeven';

import skyline from '../../assets/skyline.jpg';
import bubbles from '../../assets/bubbles.jpg';
import trees from '../../assets/trees.jpg';

export const scope = {
  ...maeven,

  useState,

  activity,
  arrowLeftCircle,
  arrowLeftSolid,
  arrowRightCircle,
  arrowRightSolid,
  caretDownSolid,
  check,
  checkCircle,
  circleSolid,
  fileRegular,
  helpCircle,
  lock,
  logoGithub,
  markGithub,
  plusSolid,
  refreshCw,
  tag,
  timesSolid,
  user,
  userCircleSolid,
  x,

  bubbles,
  skyline,
  trees,

  typestyle: style
};
