/**
 * Text Input component
 */
// Imports
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles';

// Component
const AppTextInput = ({ icon, ...otherProps }) => {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}

      <TextInput
        placeholderTextColor={defaultStyles.colors.white}
        style={defaultStyles.text}
        {...otherProps}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    // backgroundColor: defaultStyles.colors.bgColor,
    borderWidth: 1,
    borderColor: defaultStyles.colors.white,
    borderRadius: 15,
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
});

// Export
export default AppTextInput;
