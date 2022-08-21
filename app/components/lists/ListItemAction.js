/**
 * List Item Action component
 */
// Imports
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../../config/colors';

// Component
const ListItemAction = ({ bgColor, icon, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, { backgroundColor: colors[bgColor] }]}>
        <MaterialCommunityIcons color={colors.white} size={25} name={icon} />
      </View>
    </TouchableWithoutFeedback>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Export
export default ListItemAction;
