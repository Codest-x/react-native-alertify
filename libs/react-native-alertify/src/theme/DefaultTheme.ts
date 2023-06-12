import {AlertTheme, AlertThemeMode} from '../types';
import {DarkTheme} from './DarkTheme';
import {LightTheme} from './LightTheme';

export const DefaultTheme: AlertTheme = {
  mode: AlertThemeMode.LIGHT,
  colors: {
    light: LightTheme,
    dark: DarkTheme,
  },
  fontSizes: {
    fontSizeTitle: 16,
    fontSizeMessage: 14,
    fontFamily: 'Roboto',
  },
};
