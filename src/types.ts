import { AllHTMLAttributes, SVGProps } from 'react';

export interface MaevenIcon {
  tag: keyof JSX.IntrinsicElements;
  attrs: AllHTMLAttributes<any> & SVGProps<any>;
  children?: this[] | string;
}

export type ColorName =
  | 'black'
  | 'white'
  | 'darkGrey'
  | 'grey'
  | 'lightGrey'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'indigo'
  | 'pink';
export type SemanticColor = 'primary' | 'success' | 'warning' | 'danger';
export type Color = ColorName | SemanticColor;
export type BackgroundColor = Color | 'background' | 'textBackground';

export interface PartialTheme {
  name: string;
  base?: string | number;
  colors?: ThemeColors;
  sizes?: ThemeSizes;
  typography?: ThemeTypography;
  animations?: ThemeTransition;
}

export interface Theme extends Complete<PartialTheme> {
  base: string;
  colors: Complete<ThemeColors>;
  sizes: Complete<ThemeSizes>;
  typography: Complete<ThemeTypography>;
  animations: Complete<ThemeTransition>;
  isDark: boolean;
}

export interface ThemeColors {
  black?: string;
  white?: string;

  darkGrey1?: string;
  darkGrey2?: string;
  darkGrey3?: string;
  darkGrey4?: string;
  darkGrey5?: string;

  grey1?: string;
  grey2?: string;
  grey3?: string;
  grey4?: string;
  grey5?: string;

  lightGrey1?: string;
  lightGrey2?: string;
  lightGrey3?: string;
  lightGrey4?: string;
  lightGrey5?: string;

  red1?: string;
  red2?: string;
  red3?: string;
  red4?: string;
  red5?: string;

  orange1?: string;
  orange2?: string;
  orange3?: string;
  orange4?: string;
  orange5?: string;

  yellow1?: string;
  yellow2?: string;
  yellow3?: string;
  yellow4?: string;
  yellow5?: string;

  green1?: string;
  green2?: string;
  green3?: string;
  green4?: string;
  green5?: string;

  teal1?: string;
  teal2?: string;
  teal3?: string;
  teal4?: string;
  teal5?: string;

  blue1?: string;
  blue2?: string;
  blue3?: string;
  blue4?: string;
  blue5?: string;

  indigo1?: string;
  indigo2?: string;
  indigo3?: string;
  indigo4?: string;
  indigo5?: string;

  pink1?: string;
  pink2?: string;
  pink3?: string;
  pink4?: string;
  pink5?: string;

  primary1?: string;
  primary2?: string;
  primary3?: string;
  primary4?: string;
  primary5?: string;

  success1?: string;
  success2?: string;
  success3?: string;
  success4?: string;
  success5?: string;

  warning1?: string;
  warning2?: string;
  warning3?: string;
  warning4?: string;
  warning5?: string;

  danger1?: string;
  danger2?: string;
  danger3?: string;
  danger4?: string;
  danger5?: string;

  background?: string;
  backgroundText?: string;
  backgroundDark?: string;
  backgroundTextDark?: string;

  border?: string;
  borderDark?: string;

  text?: string;
  textHeading?: string;
  textLink?: string;
  textLinkHover?: string;
  textDark?: string;
  textHeadingDark?: string;
  textLinkDark?: string;
  textLinkHoverDark?: string;

  focus?: string;
  focusDanger?: string;
  outline?: string;
  outlineDanger?: string;
  textSelection?: string;

  darkGrey?: string;
  grey?: string;
  lightGrey?: string;
  red?: string;
  orange?: string;
  yellow?: string;
  green?: string;
  teal?: string;
  blue?: string;
  indigo?: string;
  pink?: string;
  primary?: string;
  success?: string;
  warning?: string;
  danger?: string;

  blackBackgroundText?: string;
  whiteBackgroundText?: string;
  darkGreyBackgroundText?: string;
  greyBackgroundText?: string;
  lightGreyBackgroundText?: string;
  redBackgroundText?: string;
  orangeBackgroundText?: string;
  yellowBackgroundText?: string;
  greenBackgroundText?: string;
  tealBackgroundText?: string;
  blueBackgroundText?: string;
  indigoBackgroundText?: string;
  pinkBackgroundText?: string;
  primaryBackgroundText?: string;
  successBackgroundText?: string;
  warningBackgroundText?: string;
  dangerBackgroundText?: string;

  textBlack?: string;
  textWhite?: string;
  textDarkGrey?: string;
  textGrey?: string;
  textLightGrey?: string;
  textRed?: string;
  textOrange?: string;
  textYellow?: string;
  textGreen?: string;
  textTeal?: string;
  textBlue?: string;
  textIndigo?: string;
  textPink?: string;
  textPrimary?: string;
  textSuccess?: string;
  textWarning?: string;
  textDanger?: string;
  textBlackDark?: string;
  textWhiteDark?: string;
  textDarkGreyDark?: string;
  textGreyDark?: string;
  textLightGreyDark?: string;
  textRedDark?: string;
  textOrangeDark?: string;
  textYellowDark?: string;
  textGreenDark?: string;
  textTealDark?: string;
  textBlueDark?: string;
  textIndigoDark?: string;
  textPinkDark?: string;
  textPrimaryDark?: string;
  textSuccessDark?: string;
  textWarningDark?: string;
  textDangerDark?: string;
}

export interface ThemeSizes {
  borderRadius: string | number;
  borderRadiusLarge: string | number;
  outline: string | number;
}

export interface ThemeTransition {
  duration?: string;
  timingFunction?: string;
}

export interface ThemeTypography {
  fontFamily?: string;
  fontFamilyMonospace?: string;
  fontFamilyHeading?: string;
  lineHeight?: number | string;
  lineHeightHeading?: number | string;
}

export type Complete<T> = {
  [K in keyof T]-?: T[K];
};
