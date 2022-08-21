/**
 * Text component
 */
// Imports
import React from 'react';
import { Text } from 'react-native';

import defaultStyles from '../config/styles';

// Component
const AppText = ({ children, style }) => {
  return <Text style={[defaultStyles.text, style]}>{children}</Text>;
};

// Export
export default AppText;
