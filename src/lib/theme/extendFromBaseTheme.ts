import color from 'color';
import { numberToPx } from './numberToPx';
import {
  Complete,
  PartialTheme,
  Theme,
  ThemeColors,
  ThemeSizes,
  ThemeTypography
} from '../../types';
import {
  animations as defaultAnimations,
  colors as defaultColors,
  typography as defaultTypography
} from './defaults';

export function extendFromBaseTheme(
  theme: PartialTheme
): Omit<Theme, 'isDark'> {
  const {
    animations,
    base,
    colors,
    iconOverrides,
    name,
    sizes,
    typography
  } = theme;

  return {
    name,
    base: numberToPx(base || 10),
    colors: extendColors(colors),
    sizes: extendSizes(sizes),
    typography: extendTypography(typography),
    animations: { ...defaultAnimations, ...animations },
    iconOverrides: iconOverrides || {}
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
    text: colors?.text || baseColors.black,
    textHeading: colors?.text || baseColors.black,
    textLink: colors?.textPrimary || baseColors.blue4,
    textLinkHover:
      colors?.textLinkHover ||
      color(colors?.textPrimary || baseColors.blue4)
        .darken(0.1)
        .toString(),
    textDark: colors?.textDark || baseColors.grey1,
    textHeadingDark: colors?.textDark || baseColors.grey1,
    textLinkDark: colors?.textPrimaryDark || baseColors.blue2,
    textLinkHoverDark:
      colors?.textLinkHoverDark ||
      color(colors?.textPrimaryDark || baseColors.blue2)
        .lighten(0.1)
        .toString(),
    focus: colors?.focus || colors?.primary3 || baseColors.blue3,
    focusDanger: colors?.focusDanger || colors?.danger3 || baseColors.red3,
    outline:
      colors?.outline ||
      color(colors?.focus || colors?.primary3 || baseColors.blue3)
        .alpha(0.5)
        .rgb()
        .string(),
    outlineDanger:
      colors?.outlineDanger ||
      color(colors?.focusDanger || colors?.danger3 || baseColors.red3)
        .alpha(0.5)
        .rgb()
        .string(),
    textSelection:
      colors?.textSelection ||
      color(colors?.primary3 || baseColors.blue3)
        .alpha(0.25)
        .rgb()
        .string(),

    darkGrey: colors?.darkGrey || baseColors.darkGrey3,
    grey: colors?.grey || baseColors.grey3,
    lightGrey: colors?.lightGrey || baseColors.lightGrey3,
    red: colors?.red || baseColors.red3,
    orange: colors?.orange || baseColors.orange3,
    yellow: colors?.yellow || baseColors.yellow3,
    green: colors?.green || baseColors.green3,
    teal: colors?.teal || baseColors.teal3,
    blue: colors?.blue || baseColors.blue3,
    indigo: colors?.indigo || baseColors.indigo3,
    pink: colors?.pink || baseColors.pink3,
    primary: colors?.primary || colors?.primary3 || baseColors.blue3,
    success: colors?.success || colors?.success3 || baseColors.green3,
    warning: colors?.warning || colors?.warning3 || baseColors.orange3,
    danger: colors?.danger || colors?.danger3 || baseColors.red3,

    blackBackgroundText:
      colors?.blackBackgroundText ||
      bestContrast(
        baseColors.black,
        colors?.text || baseColors.black,
        colors?.textDark || baseColors.white
      ),
    whiteBackgroundText:
      colors?.whiteBackgroundText ||
      bestContrast(
        baseColors.white,
        colors?.text || baseColors.black,
        colors?.textDark || baseColors.white
      ),
    darkGreyBackgroundText:
      colors?.darkGreyBackgroundText ||
      bestContrast(
        colors?.darkGrey || baseColors.darkGrey3,
        colors?.text || baseColors.black,
        colors?.textDark || baseColors.white
      ),
    greyBackgroundText:
      colors?.greyBackgroundText ||
      bestContrast(
        colors?.grey || baseColors.grey3,
        colors?.text || baseColors.black,
        colors?.textDark || baseColors.white
      ),
    lightGreyBackgroundText:
      colors?.lightGreyBackgroundText ||
      bestContrast(
        colors?.lightGrey || baseColors.lightGrey3,
        colors?.text || baseColors.black,
        colors?.textDark || baseColors.white
      ),
    redBackgroundText:
      colors?.redBackgroundText ||
      bestContrast(
        colors?.red || baseColors.red3,
        colors?.text || baseColors.black,
        colors?.textDark || baseColors.white
      ),
    orangeBackgroundText:
      colors?.orangeBackgroundText ||
      bestContrast(
        colors?.orange || baseColors.orange3,
        colors?.text || baseColors.black,
        colors?.textDark || baseColors.white
      ),
    yellowBackgroundText:
      colors?.yellowBackgroundText ||
      bestContrast(
        colors?.yellow || baseColors.yellow3,
        colors?.text || baseColors.black,
        colors?.textDark || baseColors.white
      ),
    greenBackgroundText:
      colors?.greenBackgroundText ||
      bestContrast(
        colors?.green || baseColors.green3,
        colors?.text || baseColors.black,
        colors?.textDark || baseColors.white
      ),
    tealBackgroundText:
      colors?.tealBackgroundText ||
      bestContrast(
        colors?.teal || baseColors.teal3,
        colors?.text || baseColors.black,
        colors?.textDark || baseColors.white
      ),
    blueBackgroundText:
      colors?.blueBackgroundText ||
      bestContrast(
        colors?.blue || baseColors.blue3,
        colors?.text || baseColors.black,
        colors?.textDark || baseColors.white
      ),
    indigoBackgroundText:
      colors?.indigoBackgroundText ||
      bestContrast(
        colors?.indigo || baseColors.indigo3,
        colors?.text || baseColors.black,
        colors?.textDark || baseColors.white
      ),
    pinkBackgroundText:
      colors?.pinkBackgroundText ||
      bestContrast(
        colors?.pink || baseColors.pink3,
        colors?.text || baseColors.black,
        colors?.textDark || baseColors.white
      ),
    primaryBackgroundText:
      colors?.primaryBackgroundText ||
      bestContrast(
        colors?.primary || colors?.primary3 || baseColors.blue3,
        colors?.text || baseColors.black,
        colors?.textDark || baseColors.white
      ),
    successBackgroundText:
      colors?.successBackgroundText ||
      bestContrast(
        colors?.success || colors?.success3 || baseColors.green3,
        colors?.text || baseColors.black,
        colors?.textDark || baseColors.white
      ),
    warningBackgroundText:
      colors?.warningBackgroundText ||
      bestContrast(
        colors?.warning || colors?.warning3 || baseColors.orange3,
        colors?.text || baseColors.black,
        colors?.textDark || baseColors.white
      ),
    dangerBackgroundText:
      colors?.dangerBackgroundText ||
      bestContrast(
        colors?.danger || colors?.danger3 || baseColors.red3,
        colors?.text || baseColors.black,
        colors?.textDark || baseColors.white
      ),

    textBlack: colors?.textBlack || baseColors.black,
    textWhite: colors?.textWhite || baseColors.white,
    textDarkGrey: colors?.textDarkGrey || baseColors.darkGrey3,
    textGrey: colors?.textGrey || baseColors.grey4,
    textLightGrey: colors?.textLightGrey || baseColors.lightGrey4,
    textRed: colors?.textRed || baseColors.red4,
    textOrange: colors?.textOrange || baseColors.orange4,
    textYellow: colors?.textYellow || baseColors.yellow4,
    textGreen: colors?.textGreen || baseColors.green4,
    textTeal: colors?.textTeal || baseColors.teal4,
    textBlue: colors?.textBlue || baseColors.blue4,
    textIndigo: colors?.textIndigo || baseColors.indigo4,
    textPink: colors?.textPink || baseColors.pink4,
    textPrimary: colors?.textPrimary || colors?.primary4 || baseColors.blue4,
    textSuccess: colors?.textSuccess || colors?.success4 || baseColors.green4,
    textWarning: colors?.textWarning || colors?.warning4 || baseColors.orange4,
    textDanger: colors?.textDanger || colors?.danger4 || baseColors.red4,

    textBlackDark: colors?.textBlackDark || baseColors.black,
    textWhiteDark: colors?.textWhiteDark || baseColors.white,
    textDarkGreyDark: colors?.textDarkGreyDark || baseColors.darkGrey3,
    textGreyDark: colors?.textGreyDark || baseColors.grey2,
    textLightGreyDark: colors?.textLightGreyDark || baseColors.lightGrey2,
    textRedDark: colors?.textRedDark || baseColors.red2,
    textOrangeDark: colors?.textOrangeDark || baseColors.orange2,
    textYellowDark: colors?.textYellowDark || baseColors.yellow2,
    textGreenDark: colors?.textGreenDark || baseColors.green2,
    textTealDark: colors?.textTealDark || baseColors.teal2,
    textBlueDark: colors?.textBlueDark || baseColors.blue2,
    textIndigoDark: colors?.textIndigoDark || baseColors.indigo1,
    textPinkDark: colors?.textPinkDark || baseColors.pink2,
    textPrimaryDark:
      colors?.textPrimaryDark || colors?.primary2 || baseColors.blue2,
    textSuccessDark:
      colors?.textSuccessDark || colors?.success2 || baseColors.green2,
    textWarningDark:
      colors?.textWarningDark || colors?.warning2 || baseColors.orange2,
    textDangerDark:
      colors?.textDangerDark || colors?.danger2 || baseColors.red2,

    ...baseColors
  };
}

function extendSizes(sizes?: ThemeSizes): Complete<ThemeSizes> {
  return {
    borderRadius: '0.4rem',
    borderRadiusLarge: '0.8rem',
    outline: '0.3rem',
    ...sizes
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

function bestContrast(background: string, text: string, textDark: string) {
  const colorBackground = color(background);
  const colorText = color(text);
  const colorTextDark = color(textDark);

  return colorBackground.contrast(colorText) >
    colorBackground.contrast(colorTextDark)
    ? text
    : textDark;
}
