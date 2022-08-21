/**
 * Notification Settings screen
 */
// Imports
import React, { useState } from 'react';
import { StyleSheet, Switch } from 'react-native';

import colors from '../config/colors';
import { AppText, Screen } from '../components';

// Component
const NotificationsSettingsScreen = () => {
  // Set the state of the switch to false
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <Screen style={styles.screen}>
      <AppText>Enable Push Notifications</AppText>

      <Switch
        trackColor={{ false: colors.secondary, true: colors.accent }}
        ios_backgroundColor={colors.primary}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </Screen>
  );
};

// Styles
const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 15,
  },
});

// Exports
export default NotificationsSettingsScreen;
