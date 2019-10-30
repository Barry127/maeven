import { MaevenTheme } from '../../../../../src';

export const PACKS = {
  ant: 'Ant Design Icons',
  blueprint: 'Blueprint Icons',
  clarity: 'Clarity Icons',
  devicons: 'Devicons',
  feather: 'Feather Icons',
  fa: 'Font Awsome Free',
  game: 'Game Icons',
  octicons: 'GitHub Octicons',
  ionicons: 'Ionicons',
  material: 'Material Icons',
  remix: 'Remix Icons',
  simple: 'Simple Icons',
  typicons: 'Typicons',
  weather: 'Weather Icons'
};

export const COLORS = {
  none: undefined,
  ...Object.keys(MaevenTheme.colors.name).reduce(
    (map, colorName) => {
      map[colorName] = colorName;
      return map;
    },
    {} as any
  ),
  ...Object.keys(MaevenTheme.colors.semantic).reduce(
    (map, colorName) => {
      map[colorName] = colorName;
      return map;
    },
    {} as any
  )
};
