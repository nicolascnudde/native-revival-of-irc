/**
 * Navigation theme
 */
// Imports
import { DefaultTheme } from '@react-navigation/native';

import colors from '../config/colors';

// Export
export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme,
    primary: colors.bgColor,
    background: colors.accent,
    text: colors.bgColor,
    notification: colors.white,
  },
};
