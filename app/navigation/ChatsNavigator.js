/**
 * Private and group chat navigator
 */
// Imports
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ChatsScreen, ChatDetailsScreen } from '../screens';

// Create the stack navigator
const ChatsStack = createStackNavigator();

// Component
const UsersNavigator = () => (
  <ChatsStack.Navigator screenOptions={{ headerShown: false }}>
    <ChatsStack.Screen name="Chats" component={ChatsScreen} />

    <ChatsStack.Screen name="ChatDetails" component={ChatDetailsScreen} />
  </ChatsStack.Navigator>
);

// Export
export default UsersNavigator;
