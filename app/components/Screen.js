/**
 * Screen component
 */
// Imports
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

import colors from '../config/colors';

// Component
const Screen = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
        <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.bgColor,
  },
  view: {
    flex: 1,
  }
});

// Export
export default Screen;
