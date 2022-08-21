/**
 * Channels navigator
 */
// Imports
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ChannelDetailsScreen, ChannelsScreen } from '../screens';

// Create the stack navigator
const ChannelsStack = createStackNavigator();

// Component
const ChannelsNavigator = () => (
  <ChannelsStack.Navigator screenOptions={{ headerShown: false }}>
    <ChannelsStack.Screen name="Channels" component={ChannelsScreen} />

    <ChannelsStack.Screen name="ChannelDetails" component={ChannelDetailsScreen} />
  </ChannelsStack.Navigator>
);

// Export
export default ChannelsNavigator;
