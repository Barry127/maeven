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
  checkCircle,
  refreshCw
} from 'icon-packs/feather';
import { markGithub, logoGithub } from 'icon-packs/octicons';
import * as maeven from 'maeven';
import { useEffect, useState } from 'react';
import theme from 'src/themes/maeven';

export const scope = {
  ...maeven,
  maeven: theme,

  /** React */
  useEffect,
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
  checkCircle,
  circleSolid,
  fileRegular,
  italicSolid,
  logoGithub,
  markGithub,
  plusSolid,
  refreshCw,
  timesSolid,
  underlineSolid,
  userCircleSolid
};
