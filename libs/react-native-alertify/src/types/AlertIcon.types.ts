import {AlertType} from './Alert.types';
import {AlertTheme} from './Theme.types';

export interface AlertIconProps {
  trigger: boolean;
  type: AlertType | 'success' | 'error' | 'warning' | 'info';
  theme: AlertTheme;
  forceWhite: boolean;
}
