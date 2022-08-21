/**
 * Channels Screen
 */
// Imports
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { collection, doc, query, onSnapshot, where } from 'firebase/firestore';
import uuid from 'uuid/v4';

import { Screen } from '../components';
import { MessageListItem, ListItemAction } from '../components/lists';
import routes from '../navigation/routes';
import { db } from '../firebase/firebase';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { useAuth } from '../firebase/auth';
import colors from '../config/colors';

// Component
const ChatsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [sentMessages, setSentMessages] = useState([]);

  /**
   * Firebase
   */
  // Do a firestore query and set snapshot
  const { data } = useFirestoreQuery(
    collection(db, 'messages'), 
    where('toUser', '==', user.uid)
  );

  useEffect(() => {
    setSentMessages(data?.map((d) => ({ ...d })));
  }, [data]);

  return (
    <>
      <Screen>
        <View style={styles.messagesContainer}>
          <FlatList
            data={sentMessages}
            keyExtractor={() => uuid.v4()}
            renderItem={({ item }) => (
              <MessageListItem
                title={item.fromUser}
                text={item.text}
                time={new Date(item.createdAt).toLocaleTimeString('nl-BE', {
                  // Show the time in the CET timezone (HH:mm format)
                  hour12: false,
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                onPress={() => navigation.navigate(routes.CHAT_DETAILS, item)}
              />
            )}
          />
        </View>
      </Screen>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  messagesContainer: {
    paddingTop: 20,
    backgroundColor: colors.bgColor,
    flex: 1,
    paddingHorizontal: 15,
  },
});

// Export
export default ChatsScreen;
