import color from 'color';
import { Theme } from '../../types';

export function theme2css(theme: Theme): string {
  return `:root {
  --mvn-base: ${theme.base};

  --mvn-black: ${theme.colors.black};
  --mvn-white: ${theme.colors.white};

  --mvn-dark-grey1: ${theme.colors.darkGrey1};
  --mvn-dark-grey2: ${theme.colors.darkGrey2};
  --mvn-dark-grey3: ${theme.colors.darkGrey3};
  --mvn-dark-grey4: ${theme.colors.darkGrey4};
  --mvn-dark-grey5: ${theme.colors.darkGrey5};

  --mvn-grey1: ${theme.colors.grey1};
  --mvn-grey2: ${theme.colors.grey2};
  --mvn-grey3: ${theme.colors.grey3};
  --mvn-grey4: ${theme.colors.grey4};
  --mvn-grey5: ${theme.colors.grey5};

  --mvn-light-grey1: ${theme.colors.lightGrey1};
  --mvn-light-grey2: ${theme.colors.lightGrey2};
  --mvn-light-grey3: ${theme.colors.lightGrey3};
  --mvn-light-grey4: ${theme.colors.lightGrey4};
  --mvn-light-grey5: ${theme.colors.lightGrey5};

  --mvn-red1: ${theme.colors.red1};
  --mvn-red2: ${theme.colors.red2};
  --mvn-red3: ${theme.colors.red3};
  --mvn-red4: ${theme.colors.red4};
  --mvn-red5: ${theme.colors.red5};

  --mvn-orange1: ${theme.colors.orange1};
  --mvn-orange2: ${theme.colors.orange2};
  --mvn-orange3: ${theme.colors.orange3};
  --mvn-orange4: ${theme.colors.orange4};
  --mvn-orange5: ${theme.colors.orange5};

  --mvn-yellow1: ${theme.colors.yellow1};
  --mvn-yellow2: ${theme.colors.yellow2};
  --mvn-yellow3: ${theme.colors.yellow3};
  --mvn-yellow4: ${theme.colors.yellow4};
  --mvn-yellow5: ${theme.colors.yellow5};

  --mvn-green1: ${theme.colors.green1};
  --mvn-green2: ${theme.colors.green2};
  --mvn-green3: ${theme.colors.green3};
  --mvn-green4: ${theme.colors.green4};
  --mvn-green5: ${theme.colors.green5};

  --mvn-teal1: ${theme.colors.teal1};
  --mvn-teal2: ${theme.colors.teal2};
  --mvn-teal3: ${theme.colors.teal3};
  --mvn-teal4: ${theme.colors.teal4};
  --mvn-teal5: ${theme.colors.teal5};

  --mvn-blue1: ${theme.colors.blue1};
  --mvn-blue2: ${theme.colors.blue2};
  --mvn-blue3: ${theme.colors.blue3};
  --mvn-blue4: ${theme.colors.blue4};
  --mvn-blue5: ${theme.colors.blue5};

  --mvn-indigo1: ${theme.colors.indigo1};
  --mvn-indigo2: ${theme.colors.indigo2};
  --mvn-indigo3: ${theme.colors.indigo3};
  --mvn-indigo4: ${theme.colors.indigo4};
  --mvn-indigo5: ${theme.colors.indigo5};

  --mvn-pink1: ${theme.colors.pink1};
  --mvn-pink2: ${theme.colors.pink2};
  --mvn-pink3: ${theme.colors.pink3};
  --mvn-pink4: ${theme.colors.pink4};
  --mvn-pink5: ${theme.colors.pink5};

  --mvn-primary1: ${theme.colors.primary1};
  --mvn-primary2: ${theme.colors.primary2};
  --mvn-primary3: ${theme.colors.primary3};
  --mvn-primary4: ${theme.colors.primary4};
  --mvn-primary5: ${theme.colors.primary5};

  --mvn-success1: ${theme.colors.success1};
  --mvn-success2: ${theme.colors.success2};
  --mvn-success3: ${theme.colors.success3};
  --mvn-success4: ${theme.colors.success4};
  --mvn-success5: ${theme.colors.success5};

  --mvn-warning1: ${theme.colors.warning1};
  --mvn-warning2: ${theme.colors.warning2};
  --mvn-warning3: ${theme.colors.warning3};
  --mvn-warning4: ${theme.colors.warning4};
  --mvn-warning5: ${theme.colors.warning5};

  --mvn-danger1: ${theme.colors.danger1};
  --mvn-danger2: ${theme.colors.danger2};
  --mvn-danger3: ${theme.colors.danger3};
  --mvn-danger4: ${theme.colors.danger4};
  --mvn-danger5: ${theme.colors.danger5};

  --mvn-primary1-d5: ${color(theme.colors.primary1).darken(0.05).toString()};
  --mvn-primary1-l5: ${color(theme.colors.primary1).lighten(0.05).toString()};
  --mvn-primary2-d5: ${color(theme.colors.primary2).darken(0.05).toString()};
  --mvn-primary2-l5: ${color(theme.colors.primary2).lighten(0.05).toString()};
  --mvn-primary3-d5: ${color(theme.colors.primary3).darken(0.05).toString()};
  --mvn-primary3-l5: ${color(theme.colors.primary3).lighten(0.05).toString()};
  --mvn-primary4-d5: ${color(theme.colors.primary4).darken(0.05).toString()};
  --mvn-primary4-l5: ${color(theme.colors.primary4).lighten(0.05).toString()};
  --mvn-primary5-d5: ${color(theme.colors.primary5).darken(0.05).toString()};
  --mvn-primary5-l5: ${color(theme.colors.primary5).lighten(0.05).toString()};

  --mvn-success1-d5: ${color(theme.colors.success1).darken(0.05).toString()};
  --mvn-success1-l5: ${color(theme.colors.success1).lighten(0.05).toString()};
  --mvn-success2-d5: ${color(theme.colors.success2).darken(0.05).toString()};
  --mvn-success2-l5: ${color(theme.colors.success2).lighten(0.05).toString()};
  --mvn-success3-d5: ${color(theme.colors.success3).darken(0.05).toString()};
  --mvn-success3-l5: ${color(theme.colors.success3).lighten(0.05).toString()};
  --mvn-success4-d5: ${color(theme.colors.success4).darken(0.05).toString()};
  --mvn-success4-l5: ${color(theme.colors.success4).lighten(0.05).toString()};
  --mvn-success5-d5: ${color(theme.colors.success5).darken(0.05).toString()};
  --mvn-success5-l5: ${color(theme.colors.success5).lighten(0.05).toString()};

  --mvn-warning1-d5: ${color(theme.colors.warning1).darken(0.05).toString()};
  --mvn-warning1-l5: ${color(theme.colors.warning1).lighten(0.05).toString()};
  --mvn-warning2-d5: ${color(theme.colors.warning2).darken(0.05).toString()};
  --mvn-warning2-l5: ${color(theme.colors.warning2).lighten(0.05).toString()};
  --mvn-warning3-d5: ${color(theme.colors.warning3).darken(0.05).toString()};
  --mvn-warning3-l5: ${color(theme.colors.warning3).lighten(0.05).toString()};
  --mvn-warning4-d5: ${color(theme.colors.warning4).darken(0.05).toString()};
  --mvn-warning4-l5: ${color(theme.colors.warning4).lighten(0.05).toString()};
  --mvn-warning5-d5: ${color(theme.colors.warning5).darken(0.05).toString()};
  --mvn-warning5-l5: ${color(theme.colors.warning5).lighten(0.05).toString()};

  --mvn-danger1-d5: ${color(theme.colors.danger1).darken(0.05).toString()};
  --mvn-danger1-l5: ${color(theme.colors.danger1).lighten(0.05).toString()};
  --mvn-danger2-d5: ${color(theme.colors.danger2).darken(0.05).toString()};
  --mvn-danger2-l5: ${color(theme.colors.danger2).lighten(0.05).toString()};
  --mvn-danger3-d5: ${color(theme.colors.danger3).darken(0.05).toString()};
  --mvn-danger3-l5: ${color(theme.colors.danger3).lighten(0.05).toString()};
  --mvn-danger4-d5: ${color(theme.colors.danger4).darken(0.05).toString()};
  --mvn-danger4-l5: ${color(theme.colors.danger4).lighten(0.05).toString()};
  --mvn-danger5-d5: ${color(theme.colors.danger5).darken(0.05).toString()};
  --mvn-danger5-l5: ${color(theme.colors.danger5).lighten(0.05).toString()};

  --mvn-color-background: ${theme.colors.background};
  --mvn-color-background-text: ${theme.colors.backgroundText};
  --mvn-color-background-dark: ${theme.colors.backgroundDark};
  --mvn-color-background-text-dark: ${theme.colors.backgroundTextDark};

  --mvn-color-background-text-a60: ${color(theme.colors.backgroundText)
    .alpha(0.6)
    .toString()};
  --mvn-color-background-text-a80: ${color(theme.colors.backgroundText)
    .alpha(0.8)
    .toString()};
  --mvn-color-background-text-dark-a80: ${color(theme.colors.backgroundTextDark)
    .alpha(0.8)
    .toString()};
    --mvn-color-background-text-dark-a60: ${color(
      theme.colors.backgroundTextDark
    )
      .alpha(0.6)
      .toString()};

  --mvn-color-border: ${theme.colors.border};
  --mvn-color-border-dark: ${theme.colors.borderDark};

  --mvn-color-text: ${theme.colors.text};
  --mvn-color-text-heading: ${theme.colors.textHeading};
  --mvn-color-text-link: ${theme.colors.textLink};
  --mvn-color-text-link-hover: ${theme.colors.textLinkHover};
  --mvn-color-text-dark: ${theme.colors.textDark};
  --mvn-color-text-heading-dark: ${theme.colors.textHeadingDark};
  --mvn-color-text-link-dark: ${theme.colors.textLinkDark};
  --mvn-color-text-link-hover-dark: ${theme.colors.textLinkHoverDark};

  --mvn-color-focus: ${theme.colors.focus};
  --mvn-color-focus-danger: ${theme.colors.focusDanger};
  --mvn-color-outline: ${theme.colors.outline};
  --mvn-color-outline-danger: ${theme.colors.outlineDanger};
  --mvn-color-text-selection: ${theme.colors.textSelection};

  --mvn-dark-grey: ${theme.colors.darkGrey};
  --mvn-grey: ${theme.colors.grey};
  --mvn-light-grey: ${theme.colors.lightGrey};
  --mvn-red: ${theme.colors.red};
  --mvn-orange: ${theme.colors.orange};
  --mvn-yellow: ${theme.colors.yellow};
  --mvn-green: ${theme.colors.green};
  --mvn-teal: ${theme.colors.teal};
  --mvn-blue: ${theme.colors.blue};
  --mvn-indigo: ${theme.colors.indigo};
  --mvn-pink: ${theme.colors.pink};
  --mvn-primary: ${theme.colors.primary};
  --mvn-success: ${theme.colors.success};
  --mvn-warning: ${theme.colors.warning};
  --mvn-danger: ${theme.colors.danger};

  --mvn-light-grey-l30: ${color(theme.colors.lightGrey)
    .lighten(0.3)
    .toString()};
  --mvn-primary-l30: ${color(theme.colors.primary).lighten(0.3).toString()};
  --mvn-success-l30: ${color(theme.colors.success).lighten(0.3).toString()};
  --mvn-warning-l30: ${color(theme.colors.warning).lighten(0.3).toString()};
  --mvn-danger-l30: ${color(theme.colors.danger).lighten(0.3).toString()};

  --mvn-black-background-text: ${theme.colors.blackBackgroundText};
  --mvn-white-background-text: ${theme.colors.whiteBackgroundText};
  --mvn-dark-grey-background-text: ${theme.colors.darkGreyBackgroundText};
  --mvn-grey-background-text: ${theme.colors.greyBackgroundText};
  --mvn-light-grey-background-text: ${theme.colors.lightGreyBackgroundText};
  --mvn-red-background-text: ${theme.colors.redBackgroundText};
  --mvn-orange-background-text: ${theme.colors.orangeBackgroundText};
  --mvn-yellow-background-text: ${theme.colors.yellowBackgroundText};
  --mvn-green-background-text: ${theme.colors.greenBackgroundText};
  --mvn-teal-background-text: ${theme.colors.tealBackgroundText};
  --mvn-blue-background-text: ${theme.colors.blueBackgroundText};
  --mvn-indigo-background-text: ${theme.colors.indigoBackgroundText};
  --mvn-pink-background-text: ${theme.colors.pinkBackgroundText};
  --mvn-primary-background-text: ${theme.colors.primaryBackgroundText};
  --mvn-success-background-text: ${theme.colors.successBackgroundText};
  --mvn-warning-background-text: ${theme.colors.warningBackgroundText};
  --mvn-danger-background-text: ${theme.colors.dangerBackgroundText};

  --mvn-color-text-black: ${theme.colors.textBlack};
  --mvn-color-text-white: ${theme.colors.textWhite};
  --mvn-color-text-dark-grey: ${theme.colors.textDarkGrey};
  --mvn-color-text-grey: ${theme.colors.textGrey};
  --mvn-color-text-light-grey: ${theme.colors.textLightGrey};
  --mvn-color-text-red: ${theme.colors.textRed};
  --mvn-color-text-orange: ${theme.colors.textOrange};
  --mvn-color-text-yellow: ${theme.colors.textYellow};
  --mvn-color-text-green: ${theme.colors.textGreen};
  --mvn-color-text-teal: ${theme.colors.textTeal};
  --mvn-color-text-blue: ${theme.colors.textBlue};
  --mvn-color-text-indigo: ${theme.colors.textIndigo};
  --mvn-color-text-pink: ${theme.colors.textPink};
  --mvn-color-text-primary: ${theme.colors.textPrimary};
  --mvn-color-text-success: ${theme.colors.textSuccess};
  --mvn-color-text-warning: ${theme.colors.textWarning};
  --mvn-color-text-danger: ${theme.colors.textDanger};

  --mvn-color-text-black-d10: ${color(theme.colors.textBlack)
    .darken(0.1)
    .toString()};
  --mvn-color-text-white-d10: ${color(theme.colors.textWhite)
    .darken(0.1)
    .toString()};
  --mvn-color-text-dark-grey-d10: ${color(theme.colors.textDarkGrey)
    .darken(0.1)
    .toString()};
  --mvn-color-text-grey-d10: ${color(theme.colors.textGrey)
    .darken(0.1)
    .toString()};
  --mvn-color-text-light-grey-d10: ${color(theme.colors.textLightGrey)
    .darken(0.1)
    .toString()};
  --mvn-color-text-red-d10: ${color(theme.colors.textRed)
    .darken(0.1)
    .toString()};
  --mvn-color-text-orange-d10: ${color(theme.colors.textOrange)
    .darken(0.1)
    .toString()};
  --mvn-color-text-yellow-d10: ${color(theme.colors.textYellow)
    .darken(0.1)
    .toString()};
  --mvn-color-text-green-d10: ${color(theme.colors.textGreen)
    .darken(0.1)
    .toString()};
  --mvn-color-text-teal-d10: ${color(theme.colors.textTeal)
    .darken(0.1)
    .toString()};
  --mvn-color-text-blue-d10: ${color(theme.colors.textBlue)
    .darken(0.1)
    .toString()};
  --mvn-color-text-indigo-d10: ${color(theme.colors.textIndigo)
    .darken(0.1)
    .toString()};
  --mvn-color-text-pink-d10: ${color(theme.colors.textPink)
    .darken(0.1)
    .toString()};
  --mvn-color-text-primary-d10: ${color(theme.colors.textPrimary)
    .darken(0.1)
    .toString()};
  --mvn-color-text-success-d10: ${color(theme.colors.textSuccess)
    .darken(0.1)
    .toString()};
  --mvn-color-text-warning-d10: ${color(theme.colors.textWarning)
    .darken(0.1)
    .toString()};
  --mvn-color-text-danger-d10: ${color(theme.colors.textDanger)
    .darken(0.1)
    .toString()};
  

  --mvn-color-text-black-dark: ${theme.colors.textBlackDark};
  --mvn-color-text-white-dark: ${theme.colors.textWhiteDark};
  --mvn-color-text-dark-grey-dark: ${theme.colors.textDarkGreyDark};
  --mvn-color-text-grey-dark: ${theme.colors.textGreyDark};
  --mvn-color-text-light-grey-dark: ${theme.colors.textLightGreyDark};
  --mvn-color-text-red-dark: ${theme.colors.textRedDark};
  --mvn-color-text-orange-dark: ${theme.colors.textOrangeDark};
  --mvn-color-text-yellow-dark: ${theme.colors.textYellowDark};
  --mvn-color-text-green-dark: ${theme.colors.textGreenDark};
  --mvn-color-text-teal-dark: ${theme.colors.textTealDark};
  --mvn-color-text-blue-dark: ${theme.colors.textBlueDark};
  --mvn-color-text-indigo-dark: ${theme.colors.textIndigoDark};
  --mvn-color-text-pink-dark: ${theme.colors.textPinkDark};
  --mvn-color-text-primary-dark: ${theme.colors.textPrimaryDark};
  --mvn-color-text-success-dark: ${theme.colors.textSuccessDark};
  --mvn-color-text-warning-dark: ${theme.colors.textWarningDark};
  --mvn-color-text-danger-dark: ${theme.colors.textDangerDark};

  --mvn-color-text-black-dark-l10: ${color(theme.colors.textBlackDark)
    .lighten(0.1)
    .toString()};
  --mvn-color-text-white-dark-l10: ${color(theme.colors.textWhiteDark)
    .lighten(0.1)
    .toString()};
  --mvn-color-text-dark-grey-dark-l10: ${color(theme.colors.textDarkGreyDark)
    .lighten(0.1)
    .toString()};
  --mvn-color-text-grey-dark-l10: ${color(theme.colors.textGreyDark)
    .lighten(0.1)
    .toString()};
  --mvn-color-text-light-grey-dark-l10: ${color(theme.colors.textLightGreyDark)
    .lighten(0.1)
    .toString()};
  --mvn-color-text-red-dark-l10: ${color(theme.colors.textRedDark)
    .lighten(0.1)
    .toString()};
  --mvn-color-text-orange-dark-l10: ${color(theme.colors.textOrangeDark)
    .lighten(0.1)
    .toString()};
  --mvn-color-text-yellow-dark-l10: ${color(theme.colors.textYellowDark)
    .lighten(0.1)
    .toString()};
  --mvn-color-text-green-dark-l10: ${color(theme.colors.textGreenDark)
    .lighten(0.1)
    .toString()};
  --mvn-color-text-teal-dark-l10: ${color(theme.colors.textTealDark)
    .lighten(0.1)
    .toString()};
  --mvn-color-text-blue-dark-l10: ${color(theme.colors.textBlueDark)
    .lighten(0.1)
    .toString()};
  --mvn-color-text-indigo-dark-l10: ${color(theme.colors.textIndigoDark)
    .lighten(0.1)
    .toString()};
  --mvn-color-text-pink-dark-l10: ${color(theme.colors.textPinkDark)
    .lighten(0.1)
    .toString()};
  --mvn-color-text-primary-dark-l10: ${color(theme.colors.textPrimaryDark)
    .lighten(0.1)
    .toString()};
  --mvn-color-text-success-dark-l10: ${color(theme.colors.textSuccessDark)
    .lighten(0.1)
    .toString()};
  --mvn-color-text-warning-dark-l10: ${color(theme.colors.textWarningDark)
    .lighten(0.1)
    .toString()};
  --mvn-color-text-danger-dark-l10: ${color(theme.colors.textDangerDark)
    .lighten(0.1)
    .toString()};

  --mvn-border-radius: ${theme.sizes.borderRadius};
  --mvn-border-radius-large: ${theme.sizes.borderRadiusLarge};
  --mvn-size-outline: ${theme.sizes.outline};

  --mvn-transition-duration: ${theme.animations.duration};
  --mvn-transition-timing-function: ${theme.animations.timingFunction};

  --mvn-typography-font-family: ${theme.typography.fontFamily};
  --mvn-typography-font-family-monospace: ${
    theme.typography.fontFamilyMonospace
  };
  --mvn-typography-font-family-heading: ${theme.typography.fontFamilyHeading};
  --mvn-typography-line-height: ${theme.typography.lineHeight};
  --mvn-typography-line-height-heading: ${theme.typography.lineHeightHeading}; 
}`;
}
