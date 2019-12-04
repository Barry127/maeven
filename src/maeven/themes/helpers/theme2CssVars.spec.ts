import { theme2CssVars } from './theme2CssVars';
import { MaevenDefault } from '..';

describe('theme2CssVars', () => {
  it('Makes css vars for MaevenDefault colors', () => {
    const cssVars = theme2CssVars(MaevenDefault);
    expect(cssVars).toHaveProperty(
      '--maeven-color-black',
      MaevenDefault.colors.name.black
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-blue',
      MaevenDefault.colors.name.blue
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-cyan',
      MaevenDefault.colors.name.cyan
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-dark-grey',
      MaevenDefault.colors.name.darkGrey
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-green',
      MaevenDefault.colors.name.green
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-grey',
      MaevenDefault.colors.name.grey
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-indigo',
      MaevenDefault.colors.name.indigo
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-orange',
      MaevenDefault.colors.name.orange
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-pink',
      MaevenDefault.colors.name.pink
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-purple',
      MaevenDefault.colors.name.purple
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-red',
      MaevenDefault.colors.name.red
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-teal',
      MaevenDefault.colors.name.teal
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-white',
      MaevenDefault.colors.name.white
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-yellow',
      MaevenDefault.colors.name.yellow
    );

    expect(cssVars).toHaveProperty(
      '--maeven-color-danger',
      MaevenDefault.colors.semantic.danger
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-info',
      MaevenDefault.colors.semantic.info
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-primary',
      MaevenDefault.colors.semantic.primary
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-secondary',
      MaevenDefault.colors.semantic.secondary
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-success',
      MaevenDefault.colors.semantic.success
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-warning',
      MaevenDefault.colors.semantic.warning
    );

    expect(cssVars).toHaveProperty(
      '--maeven-color-background',
      MaevenDefault.colors.role.background
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-container-background',
      MaevenDefault.colors.role.containerBackground
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-heading',
      MaevenDefault.colors.role.heading
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-link',
      MaevenDefault.colors.role.link
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-link-hover',
      MaevenDefault.colors.role.linkHover
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-link-focus',
      MaevenDefault.colors.role.linkFocus
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-link-active',
      MaevenDefault.colors.role.linkActive
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-text',
      MaevenDefault.colors.role.text
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-text-selection',
      MaevenDefault.colors.role.textSelection
    );
    expect(cssVars).toHaveProperty(
      '--maeven-color-text-selection-background',
      MaevenDefault.colors.role.textSelectionBackground
    );
  });

  it('Makes css var for base from number', () => {
    const theme = {
      ...MaevenDefault,
      base: 20
    };
    const cssVars = theme2CssVars(theme);
    expect(cssVars).toHaveProperty('--maeven-base', '20px');
  });

  it('Makes css var for base from string', () => {
    const theme = {
      ...MaevenDefault,
      base: '1rem'
    };
    const cssVars = theme2CssVars(theme);
    expect(cssVars).toHaveProperty('--maeven-base', '1rem');
  });

  it('Makes css vars for MaevenDefault typography', () => {
    const cssVars = theme2CssVars(MaevenDefault);
    expect(cssVars).toHaveProperty(
      '--maeven-typography-font-family',
      MaevenDefault.typography.fontFamily
    );
    expect(cssVars).toHaveProperty(
      '--maeven-typography-font-family-monospace',
      MaevenDefault.typography.fontFamilyMonospace
    );
    expect(cssVars).toHaveProperty(
      '--maeven-typography-font-weight',
      MaevenDefault.typography.fontWeight
    );
    expect(cssVars).toHaveProperty(
      '--maeven-typography-line-height',
      MaevenDefault.typography.lineHeight
    );

    expect(cssVars).toHaveProperty(
      '--maeven-typography-heading-font-family',
      MaevenDefault.typography.heading.fontFamily
    );
    expect(cssVars).toHaveProperty(
      '--maeven-typography-heading-font-weight',
      MaevenDefault.typography.heading.fontWeight
    );
  });
});