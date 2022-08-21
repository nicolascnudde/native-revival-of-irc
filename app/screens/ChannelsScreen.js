/**
 * Channels Screen
 */
// Imports
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { collection, deleteDoc, doc, orderBy } from 'firebase/firestore';

import colors from '../config/colors';
import { ActivityIndicator, AppText, Card, Screen } from '../components';
import { ListItemAction } from '../components/lists';
import routes from '../navigation/routes';
import { db } from '../firebase/firebase';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { useAuth } from '../firebase/auth';
import TopBar from '../components/TopBar';

// Component
const ChannelsScreen = ({ navigation }) => {
  // Set the channels to an empty array
  const [channels, setChannels] = useState([]);

  // Used for refreshing the channel list
  const [refreshing, setRefreshing] = useState(false);

  // Used for setting the channel as a favorite
  const [isFavorite, setIsFavorite] = useState(false);

  // Get the current user
  const { user } = useAuth();

  // Handle setting a favorite channel
  const handleFavorite = (item) => {
    console.log(item);
  };

  /**
   * Firestore
   */
  // Get the channels with a firestore query (with orderBy)
  const { loading, data } = useFirestoreQuery(collection(db, 'channels'), orderBy('createdAt', 'desc'));

  useEffect(() => {
    setChannels(data?.map((d) => ({ ...d })));
  }, [data]);

  // Delete a channel
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'channels', id));
  };

  return (
    <>
      <ActivityIndicator visible={loading} />

      <Screen style={styles.screen}>
        <TopBar title="Channels" />

        <FlatList
          data={channels}
          keyExtractor={(channel) => channel.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              isFavorite={false}
              // image="../assets/frog.png"
              image={item.image}
              // thumbnailUrl={item.image}
              onPress={() => navigation.navigate(routes.CHANNEL_DETAILS, item)}
              renderRightActions={() => (
                <>
                  {user.uid === item.userId && (
                    <ListItemAction
                      bgColor="secondary"
                      icon="trash-can"
                      onPress={() => handleDelete(item.id)}
                    />
                  )}

                  <ListItemAction
                    bgColor="accent"
                    icon="star"
                    onPress={() => handleFavorite(item)}
                  />
                </>
              )}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => {
            setChannels(data);
          }}
        />
      </Screen>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 15,
  },
});

// Export
export default ChannelsScreen;
