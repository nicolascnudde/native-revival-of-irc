/**
 * Error Message component
 */
// Imports
import React from 'react';
import { StyleSheet } from 'react-native';

import { AppText } from '../';
import colors from '../../config/colors';

// Component
const ErrorMessage = ({ error, visible }) => {
  if (!visible || !error) return null;

  return <AppText style={styles.error}>{error}</AppText>;
};

// Styles
const styles = StyleSheet.create({
  error: {
    color: colors.danger,
  },
});

// Export
export default ErrorMessage;
