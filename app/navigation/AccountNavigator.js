/**
 * Account Navigator
 */
// Imports
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AccountScreen, NotificationsSettingsScreen, PasswordSettingsScreen, ProfileSettingsScreen } from '../screens';

// Create the Account stack navigator
const AccountStack = createStackNavigator();

// Navigator component
const AccountNavigator = () => (
  <AccountStack.Navigator screenOptions={{ headerShown: false }}>
    <AccountStack.Screen name="Account" component={AccountScreen} />

    <AccountStack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
    
    <AccountStack.Screen name="NotificationsSettings" component={NotificationsSettingsScreen} />

    <AccountStack.Screen name="PasswordSettings" component={PasswordSettingsScreen} />
  </AccountStack.Navigator>
);

// Export
export default AccountNavigator;
