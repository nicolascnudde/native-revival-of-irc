/**
 * New Channel Button
 */
// Imports
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';

// Component
const NewChannelButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus"
          // color={colors.bgColor}
          size={20}
        />
      </View>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderColor: colors.bgColor,
    borderRadius: 20,
    borderWidth: 10,
    top: 10,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
});

// Export
export default NewChannelButton;
