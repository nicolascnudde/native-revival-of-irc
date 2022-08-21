/**
 * The main application
 */
// Imports
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';

import { OfflineNotice } from './app/components/';
import {
  AppNavigator,
  AuthNavigator,
  navigationTheme,
  navigationRef,
} from './app/navigation';
import { AuthProvider, useAuth } from './app/firebase/auth';

/**
 * Ignore these warnings:
 * 1. The AsyncStorage warning is a bug, related to firebase/firestore. 
 *    The correct library is being loaded in the utility/cache.js file (@react-native-async-storage/async-storage).
 * 2. Nested screens are supposedly confusing, this is how we learned to do it and
 *   I don't find these confusing (having AccountNavigator and AccountScreen for example...)
 */
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  "Found screens with the same name nested inside one another.",
]);

// The content of the app
const AppContent = () => {
  const { user } = useAuth();

  return (
    <>
      <OfflineNotice />

      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  );
};

// The main App
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

// Export
export default App;
