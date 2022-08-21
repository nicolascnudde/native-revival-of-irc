/**
 * Card component
 */
// Imports
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import Icon from '../components/Icon';
import AppText from '../components/AppText';
import colors from '../config/colors';

// Component
const Card = ({ avatar, image, isFavorite, isLoggedIn, onPress, renderRightActions, title }) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: image ? image : avatar }} />

          <View style={styles.container}>
            <AppText style={[styles.text, styles.title]}>{title}</AppText>
          </View>

          {isLoggedIn && (
            <View>
              <Icon iconColor={colors.accent} name="dot" />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
};

// Styles
const styles = StyleSheet.create({
  card: {
    borderColor: colors.primary,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  container: {
    padding: 10,
  },
});

// Export
export default Card;
