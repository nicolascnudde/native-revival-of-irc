/**
 * Creation screen
 * Modal overlay when creating a new channel
 */
// Imports
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';

import NewUserMessageForm from '../components/NewUserMessageForm';
import colors from '../config/colors';
import { AppText, Screen } from '../components';

// Component
const UserDetailsScreen = ({ route }) => {
  // Get the specific profile data from the route
  const profile = route.params;

  return (
    <>
      <Screen>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 100}
          style={{ flex: 1 }}
        >
          <View style={styles.container}>
            <AppText style={styles.username}>Hey there!</AppText>

            <Image style={styles.image} source={{ uri: profile.image ? profile.image : profile.avatarImage }} />

            <AppText style={styles.username}>I'm {profile.userName}.</AppText>
          </View>

          <View style={styles.newMessageContainer}>
            <NewUserMessageForm profile={profile} />
          </View>
        </KeyboardAvoidingView>
      </Screen>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: 30,
    fontWeight: '500',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginVertical: 20,
  },
  newMessageContainer: {
    borderColor: colors.primary,
    borderTopWidth: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
  },
});

// Export
export default UserDetailsScreen;
