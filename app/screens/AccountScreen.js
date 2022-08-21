/**
 * Account screen
 */
// Imports
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { doc, query, onSnapshot } from 'firebase/firestore';

import colors from '../config/colors';
import routes from '../navigation/routes';
import { Icon, Screen } from '../components';
import { ListItem } from '../components/lists';
import { db } from '../firebase/firebase';
import { useAuth } from '../firebase/auth';
import TopBar from '../components/TopBar';

// Component
const AccountScreen = ({ navigation }) => {
  // Get the current user and logout function
  const { user, logout } = useAuth();

  // Set the profile to an empty object
  const [profile, setProfile] = useState({});

  /**
   * Firestore queries
   */
  // Get the current user's profile
  useEffect(() => {
    const q = query(doc(db, 'users', user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProfile(snapshot.data());
    });
    return () => unsubscribe();
  }, []);

  <Image
    source={{ uri: profile.image ? profile.image : profile.avatarImage }}
    style={styles.avatar}
  />
  return (
    <Screen style={styles.screen}>
      <TopBar avatar={profile.avatarImage} image={profile.image} title={`Hi there, ${profile.userName}!`} />

      <View style={styles.listContainer}>
        <ListItem
          title="Profile Information"
          IconComponent={<Icon name="cog" backgroundColor={colors.primary} />}
          onPress={() => navigation.navigate(routes.PROFILE_SETTINGS)}
          style={styles.listItem}
        />

        <ListItem
          title="Notifications"
          IconComponent={<Icon name="cellphone" backgroundColor={colors.primary} />}
          onPress={() => navigation.navigate(routes.NOTIFICATIONS_SETTINGS)}
          style={styles.listItem}
        />

        <ListItem
          title="Change Password"
          IconComponent={<Icon name="key" backgroundColor={colors.accent} />}
          onPress={() => navigation.navigate(routes.PASSWORD_SETTINGS)}
          style={styles.listItem}
        />

        <ListItem
          title="Logout"
          IconComponent={
            <Icon name="logout" backgroundColor={colors.secondary} />
          }
          onPress={() => logout()}
          style={styles.listItem}
        />
      </View>
    </Screen>
  );
};

// Styles
const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 15,
  },
  topContainer: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    marginLeft: 15,
    fontSize: 24,
    textAlign: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  listContainer: {
    flex: 1,
  },
});

// Export
export default AccountScreen;
