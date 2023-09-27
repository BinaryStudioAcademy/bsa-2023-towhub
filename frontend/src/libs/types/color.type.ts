type DarkColor =
  | 'green'
  | 'black'
  | 'red'
  | 'red-dark'
  | 'blue'
  | 'blue-dark'
  | 'blue-light'
  | 'grey'
  | 'grey-dark';

type LightColor = 'white' | 'red-light' | 'grey-light' | 'grey-extra-light';

type Color = DarkColor | LightColor;

export { type Color, type DarkColor, type LightColor };
