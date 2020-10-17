import color from 'color';
import { numberToPx } from '../numberToPx';
import {
  Theme,
  ThemeColors,
  ThemeTransition,
  ThemeTypography
} from '../../types';
import {
  animations as defaultAnimations,
  colors as defaultColors,
  typography as defaultTypography
} from './defaults';

export function extendFromBaseTheme(theme: Theme): CompleteTheme {
  const { animations, base, colors, name, typography } = theme;

  return {
    name,
    base: numberToPx(base || 10),
    colors: extendColors(colors),
    typography: extendTypography(typography),
    animations: { ...defaultAnimations, ...animations }
  };
}

function extendColors(colors?: ThemeColors): Complete<ThemeColors> {
  const baseColors = { ...defaultColors, ...colors };
  return {
    primary1: baseColors.blue1,
    primary2: baseColors.blue2,
    primary3: baseColors.blue3,
    primary4: baseColors.blue4,
    primary5: baseColors.blue5,
    success1: baseColors.green1,
    success2: baseColors.green2,
    success3: baseColors.green3,
    success4: baseColors.green4,
    success5: baseColors.green5,
    warning1: baseColors.orange1,
    warning2: baseColors.orange2,
    warning3: baseColors.orange3,
    warning4: baseColors.orange4,
    warning5: baseColors.orange5,
    danger1: baseColors.red1,
    danger2: baseColors.red2,
    danger3: baseColors.red3,
    danger4: baseColors.red4,
    danger5: baseColors.red5,
    background: baseColors.lightGrey1,
    backgroundText: baseColors.white,
    backgroundDark: baseColors.darkGrey3,
    backgroundTextDark: baseColors.darkGrey4,
    border: baseColors.lightGrey3,
    borderDark: baseColors.darkGrey2,
    text: baseColors.black,
    textHeading: colors?.text || baseColors.black,
    textLink: colors?.textPrimary || baseColors.blue4,
    textDark: baseColors.grey1,
    textHeadingDark: colors?.textDark || baseColors.grey1,
    textLinkDark: colors?.textPrimaryDark || baseColors.blue2,
    focus: colors?.primary3 || baseColors.blue3,
    focusDanger: colors?.danger3 || baseColors.red3,
    outline: color(colors?.focus || colors?.primary3 || baseColors.blue3)
      .alpha(0.5)
      .rgb()
      .string(),
    outlineDanger: color(
      colors?.focusDanger || colors?.danger3 || baseColors.red3
    )
      .alpha(0.5)
      .rgb()
      .string(),
    textSelection: color(colors?.primary3 || baseColors.blue3)
      .alpha(0.25)
      .rgb()
      .string(),
    darkGrey: baseColors.darkGrey3,
    grey: baseColors.grey3,
    lightGrey: baseColors.lightGrey3,
    red: baseColors.red3,
    orange: baseColors.orange3,
    yellow: baseColors.yellow3,
    green: baseColors.green3,
    teal: baseColors.teal3,
    blue: baseColors.blue3,
    indigo: baseColors.indigo3,
    pink: baseColors.pink3,
    primary: colors?.primary3 || baseColors.blue3,
    success: colors?.success3 || baseColors.green3,
    warning: colors?.warning3 || baseColors.orange3,
    danger: colors?.danger3 || baseColors.red3,

    textBlack: baseColors.black,
    textWhite: baseColors.white,
    textDarkGrey: baseColors.darkGrey3,
    textGrey: baseColors.grey2,
    textLightGrey: baseColors.lightGrey2,
    textRed: baseColors.red2,
    textOrange: baseColors.orange2,
    textYellow: baseColors.yellow2,
    textGreen: baseColors.green2,
    textTeal: baseColors.teal2,
    textBlue: baseColors.blue2,
    textIndigo: baseColors.indigo1,
    textPink: baseColors.pink2,
    textPrimary: colors?.primary2 || baseColors.blue2,
    textSuccess: colors?.success2 || baseColors.green2,
    textWarning: colors?.warning2 || baseColors.orange2,
    textDanger: colors?.danger2 || baseColors.red2,

    textBlackDark: baseColors.black,
    textWhiteDark: baseColors.white,
    textDarkGreyDark: baseColors.darkGrey3,
    textGreyDark: baseColors.grey4,
    textLightGreyDark: baseColors.lightGrey4,
    textRedDark: baseColors.red4,
    textOrangeDark: baseColors.orange4,
    textYellowDark: baseColors.yellow4,
    textGreenDark: baseColors.green4,
    textTealDark: baseColors.teal4,
    textBlueDark: baseColors.blue4,
    textIndigoDark: baseColors.indigo4,
    textPinkDark: baseColors.pink4,
    textPrimaryDark: colors?.primary4 || baseColors.blue4,
    textSuccessDark: colors?.success4 || baseColors.green4,
    textWarningDark: colors?.warning4 || baseColors.orange4,
    textDangerDark: colors?.danger4 || baseColors.red4,

    ...baseColors
  };
}

function extendTypography(
  typography?: ThemeTypography
): Complete<ThemeTypography> {
  const baseTypography = { ...defaultTypography, ...typography };
  return {
    fontFamilyHeading:
      typography?.fontFamilyHeading || baseTypography.fontFamily,
    ...baseTypography
  };
}

export interface CompleteTheme extends Complete<Theme> {
  base: string;
  colors: Complete<ThemeColors>;
  typography: Complete<ThemeTypography>;
  animations: Complete<ThemeTransition>;
}

type Complete<T> = {
  [K in keyof T]-?: T[K];
};
