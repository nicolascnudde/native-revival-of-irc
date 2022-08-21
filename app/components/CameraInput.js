import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Modal,
} from 'react-native';
import { Camera } from 'expo-camera';

import { AppButton, Screen } from './';

const CameraInput = ({ visible = true }) => {
  // Set the type of camera to use (front or back)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState();
  const [image, setImage] = useState();
  const [hideModal, setHideModal] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  // Request the device's camera permissions
  const requestPermission = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();

    if (!granted)
      alert('You need to enable the permission for the media library.');
  };

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      setImage(data.uri);
    }
  };

  return (
    <>
    <Modal visible={visible} dismiss={hideModal}>
      <Screen>
        {!image && (
          <>
            <View style={styles.cameraContainer}>
              <Camera
                ref={(ref) => setCamera(ref)}
                style={styles.camera}
                type={type}
              />
            </View>
          </>
        )}

        {image && (
          <>
            <Image source={{ uri: image }} style={styles.image} />
          </>
        )}

        <View style={styles.buttonContainer}>
          {image
            ? <AppButton title="Retake Picture" onPress={() => setImage(null)} style={styles.button} />
            : <AppButton title="Take Picture" onPress={() => takePicture()} style={styles.button} />
          }

          {image
            ? <AppButton title="Done" onPress={() => setHideModal(true)} style={styles.button} />

            : <AppButton
                title="Flip"
                onPress={() =>
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  )
                }
                style={styles.button}
              />
        }

        </View>
      </Screen>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    width: '49%',
  }
});

export default CameraInput;
