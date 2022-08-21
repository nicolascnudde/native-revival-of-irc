/**
 * Channel Details screen
 */
// Imports
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';
import { collection, deleteDoc, doc, orderBy } from 'firebase/firestore';

import colors from '../config/colors';
import { ActivityIndicator, Screen } from '../components';
import NewChannelMessageForm from '../components/NewChannelMessageForm';
import { MessageListItem, ListItemAction } from '../components/lists';
import { db } from '../firebase/firebase';
import { useAuth } from '../firebase/auth';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import routes from '../navigation/routes';
import TopBar from '../components/TopBar';

// Component
const ChannelDetailsScreen = ({ navigation, route }) => {
  // Get the specific channel data from the route
  const channel = route.params;

  // Get the current user
  const { user } = useAuth();

  // Set the messages to an empty array
  const [messages, setMessages] = useState([]);

  /**
   * Firebase
   */
  // Get the messages from a specific channel and order them by createdAt (so the latest messages are at the bottom)
  const { loading, data } = useFirestoreQuery(
    collection(db, 'channels', channel.id, 'messages'),
    orderBy('createdAt', 'asc')
  );

  useEffect(() => {
    setMessages(
      data?.map((d) => ({ ...d }))
    );
  }, [data]);

  // Delete a document (channel) from the Firestore database
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'channels', channel.id, 'messages', id));
  };

  return (
    <>
      <ActivityIndicator visible={loading} />

      <Screen style={styles.screen}>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 100}
          style={{ flex: 1 }}
        >
          <TopBar image={channel.image} title={channel.title} />

          <View style={styles.messagesContainer}>
            <FlatList
              data={messages}
              keyExtractor={(message) => message.id.toString()}
              renderItem={({ item }) => (
                <MessageListItem
                  id={item.userId}
                  title={item.userName}
                  text={item.text}
                  avatar={user.photoURL}
                  image={item.image}
                  location={item.location}
                  recording={item.recording}
                  time={new Date(item.createdAt).toLocaleDateString('nl-BE', {
                    // Show the time in the CET timezone (HH:mm format)
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    month: '2-digit',
                    day: '2-digit',

                  })}
                  onPress={() => console.log('Message selected', item)}
                  // Go to a specific user profile after pressing his/her avatar
                  handleNavigation={() => navigation.navigate(routes.USER_DETAILS, item)}
                  renderRightActions={() =>
                    // Only show the delete icon if the user is the owner of the message
                    user.uid === item.userId && (
                      <ListItemAction
                        bgColor="secondary"
                        icon="trash-can"
                        onPress={() => handleDelete(item.id)}
                      />
                    )
                  }
                />
              )}
            />
          </View>

          <View style={styles.newMessageContainer}>
            <NewChannelMessageForm channel={channel} />
          </View>
        </KeyboardAvoidingView>
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
  newMessageContainer: {
    borderColor: colors.primary,
    borderTopWidth: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
  },
});

// Export
export default ChannelDetailsScreen;
