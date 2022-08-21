/**
 * List Item component
 */
// Imports
import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import { AppText } from '../';
import colors from '../../config/colors';
import AudioPlayback from '../AudioPlayback';

// Component
const MessageListItem = ({
  avatar,
  image,
  location,
  onPress,
  recording,
  renderRightActions,
  text,
  time,
  title,
  handleNavigation,
}) => (
  <Swipeable renderRightActions={renderRightActions}>
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <TouchableHighlight onPress={handleNavigation}>
          <Image style={styles.avatar} source={{ uri: avatar }} />
        </TouchableHighlight>

        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <AppText style={{ fontWeight: '600' }}>{title}</AppText>

            {time && <AppText style={styles.title}>{time}</AppText>}
          </View>

          <AppText>{text}</AppText>

          {image && <Image style={styles.image} source={{ uri: avatar }} />}

          {location && (
            <AppText style={styles.location}>
              My location is {location.latitude}, {location.longitude}
            </AppText>
          )}

          {recording && (
            <AudioPlayback recordingUri={recording} />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Swipeable>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 5,
  },
  contentContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    width: '90%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  title: {
    color: colors.primary,
    fontSize: 16,
    marginLeft: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 15,
  },
  location: {
    color: colors.secondary,
    fontSize: 16,
  },
  button: {
    width: '97%',
    height: 50,
    padding: 0,
    marginBottom: 0,
  },
});

// Export
export default MessageListItem;
