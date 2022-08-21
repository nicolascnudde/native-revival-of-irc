/**
 * List Item component
 */
// Imports
import React from 'react';
import { StyleSheet, Image, View, TouchableHighlight } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AppText } from '../';
import colors from '../../config/colors';

// Component
const ListItem = ({
  avatar,
  IconComponent,
  onPress,
  renderRightActions,
  title,
}) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.primary} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}

          {avatar && <Image style={styles.avatar} source={avatar} />}

          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>

          <MaterialCommunityIcons
            color={colors.white}
            name="chevron-right"
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    marginLeft: 15,
    fontWeight: '500',
  },
});

// Export
export default ListItem;
