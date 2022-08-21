/**
 * Image Input List component
 */
// Imports
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ImageInput from './ImageInput';

// Component
const ImageInputList = ({ imageUris = [], onAddImage, onRemoveImage }) => {
  // useRef to automatically scroll right when adding multiple images
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImageInput
                imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}
          <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    marginRight: 10,
  },
});

// Export
export default ImageInputList;
