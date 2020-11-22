import { code, java, javascript1, perl, php, rust } from 'icon-packs/devicons';
import {
  alignCenterSolid,
  alignLeftSolid,
  alignRightSolid,
  arrowLeftSolid,
  arrowRightSolid,
  boldSolid,
  caretDownSolid,
  circleSolid,
  fileRegular,
  italicSolid,
  plusSolid,
  timesSolid,
  underlineSolid,
  userCircleSolid
} from 'icon-packs/fa';
import {
  arrowLeftCircle,
  arrowRightCircle,
  check,
  checkCircle,
  helpCircle,
  lock,
  refreshCw,
  shieldOff,
  tag,
  user,
  x
} from 'icon-packs/feather';
import { markGithub, logoGithub } from 'icon-packs/octicons';
import * as maeven from 'maeven';
import { useEffect, useRef, useState } from 'react';
import theme from 'src/themes/maeven';

export const scope = {
  ...maeven,
  maeven: theme,

  /** assets */
  bubbles: '/maeven/assets/bubbles.jpg',
  skyline: '/maeven/assets/skyline.jpg',
  trees: '/maeven/assets/trees.jpg',

  /** React */
  useEffect,
  useRef,
  useState,

  /** icons */
  alignCenterSolid,
  alignLeftSolid,
  alignRightSolid,
  arrowLeftCircle,
  arrowLeftSolid,
  arrowRightCircle,
  arrowRightSolid,
  boldSolid,
  caretDownSolid,
  check,
  checkCircle,
  circleSolid,
  code,
  fileRegular,
  helpCircle,
  italicSolid,
  java,
  javascript1,
  lock,
  logoGithub,
  markGithub,
  perl,
  php,
  plusSolid,
  refreshCw,
  rust,
  shieldOff,
  tag,
  timesSolid,
  underlineSolid,
  user,
  userCircleSolid,
  x
};
