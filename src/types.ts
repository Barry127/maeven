export interface Theme {
  name: string;
  base?: string | number;
  colors?: ThemeColors;
  typography?: ThemeTypography;
  animations?: ThemeTransition;
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
  textDark?: string;
  textHeadingDark?: string;
  textLinkDark?: string;

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
