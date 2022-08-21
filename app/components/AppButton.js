/**
 * Button component
 */
// Imports
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../config/colors';

// Component
const AppButton = ({ color = 'primary', onPress, style, IconComponent, title }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: colors[color] }, style]}
    >
      {title && <Text style={styles.text}>{title}</Text>}

      {IconComponent}
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
    padding: 20,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

// Export
export default AppButton;
