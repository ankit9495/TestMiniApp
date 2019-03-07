import {AsyncStorage} from 'react-native';

// Convenience wrapper around AsyncStorage methods

const getKeyValue = async function (key) {
    let value = null;
    await AsyncStorage.getItem(key, (err, result) => {
        value = result;
    });
    return value;
};

const setKeyValue = async function (key, value) {
    await AsyncStorage.setItem(key, value + '');
};

const saveValueThenProceed = async function (key, value, func) {
    await AsyncStorage.setItem(key, value + '').then(func);
}


export {
    getKeyValue,
    setKeyValue,
    saveValueThenProceed
}

