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
  userCircleSolid
};
