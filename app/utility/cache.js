/**
 * Caching with AsyncStorage
 */
// Imports
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

// Variables
const prefix = 'cache';
const expiryInMinutes = 5;

// Store the item in the cache
const store = async (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };

    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

// Check if item is expired
const isExpired = (item) => {
  const now = dayjs();
  const storedTime = dayjs(item.timestamp);
  return now.diff(storedTime, 'minute') > expiryInMinutes;
};

// Get the item from the cache
const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);

    // If there is no item
    if (!item) return null;

    // If item is expired
    if (isExpired(item)) {
      // Command Query Seperation (CQS)
      // => Don't want to store too much data in AsyncStorage
      await AsyncStorage.removeItem(prefix + key);

      return null;
    }

    return item.value;
  } catch (error) {
    console.log(error);
  }
};

export default {
  get,
  store,
};
