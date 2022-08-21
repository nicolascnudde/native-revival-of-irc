import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

const useNotifications = (notificationListener) => {
  useEffect(() => {
    registerForPushNotifications();

    if (notificationListener)
      Notifications.addNotificationResponseReceivedListener(
        notificationListener
      );
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permission = await Notifications.requestPermissionsAsync();
      if (!permission.granted) return;

      const { data } = await Notifications.getExpoPushTokenAsync();

      /**
       * This token is used to send push notifications to the user.
       * Can be tested on the following website:
       * https://expo.dev/notifications/
       *
       * Instructions: Copy the ExponentPushToken from the console in the 'To (Expo push token from your app) field.'
       *
       * Warning: ONLY WORKS ON PHYSICAL DEVICES
       */
      console.log('Expo push notifications token:', data);
    } catch (error) {
      console.log('Error getting a push token', error);
    }
  };
};

export default useNotifications;
