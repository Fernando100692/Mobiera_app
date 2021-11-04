import AsyncStorage from '@react-native-async-storage/async-storage';

async function storeItem(key, item) {
  try {
    var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
    return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
}

async function retrieveItem(key) {
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item === undefined ? null : item;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeItem(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error.message);
  }
}

const Storage = {
  getUserInfo: async () => {
    return await retrieveItem('session_user');
  },
  setUserInfo: async data => {
    return await storeItem('session_user', data);
  },
  removeSession: async () => {
    await removeItem('session_user');
  },
};

export default Storage;
