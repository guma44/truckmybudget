// Moved from @nibr-ux/style to decrease dependencies

const colorDefs = {
  blue: {
    dark: '#023761',
    default: '#0460A9',
    light: '#5291DD',
  },
  red: {
    default: '#D13A32',
  },
  gray: {
    placeholder: '#888888',
    default: '#9D9D9D',
    medium: '#C6C6C6',
    light: '#EDEDED',
    highlighter: '#E3E3E3',
  },
  black: {
    default: '#000000',
  },
  white: {
    default: '#FFFFFF',
  },
};

const extendedColors = {
  ...colorDefs,
  carmine: colorDefs.red,
};

export default extendedColors;
