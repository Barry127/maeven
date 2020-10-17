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
export type SemanticColorName = 'primary' | 'success' | 'warning' | 'danger';
export type Color = ColorName | SemanticColorName;
export type BackgroundColor = Color | 'background' | 'textBackground';
