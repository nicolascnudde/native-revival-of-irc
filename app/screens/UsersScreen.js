/**
 * Channels Screen
 */
// Imports
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { collection } from 'firebase/firestore';

import { ActivityIndicator, Card, Screen } from '../components';
import routes from '../navigation/routes';
import { db } from '../firebase/firebase';
import { useAuth } from '../firebase/auth';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import TopBar from '../components/TopBar';

// Component
const UsersScreen = ({ navigation }) => {
  // Set the users to an empty array
  const [users, setUsers] = useState([]);

  // Get the current user
  const { user } = useAuth();

  /**
   * Firebase
   */
  // Do a firestore query and set the returned data
  const { loading, data } = useFirestoreQuery(collection(db, 'users'));

  useEffect(() => {
    setUsers(data?.map((d) => ({ ...d })));
  }, [data]);

  return (
    <>
      <ActivityIndicator visible={loading} />

      <Screen>
        <TopBar title="Users" />

        <FlatList
          data={users}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.userName}
              image={item.image}
              avatar={item.avatarImage}
              onPress={() => navigation.navigate(routes.USER_DETAILS, item)}
            />
          )}
        />
      </Screen>
    </>
  );
};

// Styles
const styles = StyleSheet.create({});

// Export
export default UsersScreen;
