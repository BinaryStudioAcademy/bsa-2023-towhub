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

type LightColor =
  | 'white'
  | 'red-light'
  | 'red-extra-light'
  | 'grey-light'
  | 'grey-extra-light'
  | 'green-extra-light'
  | 'blue-extra-light';

type PaleColor = 'red-extra-light' | 'green-extra-light' | 'blue-extra-light';

type Color = DarkColor | LightColor | PaleColor;

export { type Color, type DarkColor, type LightColor, type PaleColor };
