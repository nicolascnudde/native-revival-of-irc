/**
 * Auth navigator
 */
// Imports
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen, RegisterScreen, WelcomeScreen } from '../screens';

// Create the stack navigator
const Stack = createStackNavigator();

// Component
const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen name="Login" component={LoginScreen} />

    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

// Export
export default AuthNavigator;
