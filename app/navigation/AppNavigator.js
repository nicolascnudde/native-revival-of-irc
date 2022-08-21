/**
 * App Navigator
 */
// Imports
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AccountNavigator from './AccountNavigator';
import ChannelsNavigator from './ChannelsNavigator';
import UsersNavigator from './UsersNavigator';
import ChatsNavigator from './ChatsNavigator';
import { ChannelEditScreen } from '../screens';
import useNotifications from '../hooks/useNotifications';
import colors from '../config/colors';

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

// Component
const AppNavigator = () => {
  // Notifications
  useNotifications();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderColor: colors.accent,
          borderTopWidth: 3,
          backgroundColor: colors.bgColor,
          paddingTop: 10,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Channels"
        component={ChannelsNavigator}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              color={colors.accent}
              name="home"
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Chats"
        component={ChatsNavigator}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              color={colors.accent}
              name="at"
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ChannelEdit"
        component={ChannelEditScreen}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              color={colors.accent}
              name="plus-circle"
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Users"
        component={UsersNavigator}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              color={colors.accent}
              name="account-group"
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              color={colors.accent}
              name="cog"
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Export
export default AppNavigator;
