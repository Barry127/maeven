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
  fileRegular,
  helpCircle,
  italicSolid,
  lock,
  logoGithub,
  markGithub,
  plusSolid,
  refreshCw,
  tag,
  timesSolid,
  underlineSolid,
  user,
  userCircleSolid,
  x
};
