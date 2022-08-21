/**
 * Icon component
 */
// Imports
import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';

// Component
const Icon = ({
  name,
  size = 40,
  backgroundColor = colors.bgColor,
  iconColor = colors.white,
}) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MaterialCommunityIcons
        size={size * 0.5}
        name={name}
        color={iconColor}
        backgroundColor={backgroundColor}
      />
    </View>
  );
};

// Export
export default Icon;
