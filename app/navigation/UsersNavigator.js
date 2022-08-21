/**
 * Users navigator
 */
// Imports
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { UserDetailsScreen, UsersScreen } from '../screens';

// Create the stack navigator
const UsersStack = createStackNavigator();

// Component
const UsersNavigator = () => (
  <UsersStack.Navigator screenOptions={{ headerShown: false }}>
    <UsersStack.Screen name="Users" component={UsersScreen} />

    <UsersStack.Screen name="UserDetails" component={UserDetailsScreen} />
  </UsersStack.Navigator>
);

// Export
export default UsersNavigator;
