const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const Colors = {
  primary: '#28104E', // Dark Purple
  secondary: '#6237A0', // Medium Purple
  lightPurple: '#9754CB', // Light Purple
  accent: '#DEACF5', // Light Background
  text: '#FFFFFF', // White text for contrast
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

export default Colors;
