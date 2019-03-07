import React from 'react';
import SimpleToast from './SimpleToast';

/*
 * npm install react-native-simple-toast
 * react-native link react-native-simple-toast
 */
export const ShowToast = (toastMessage) => {
    SimpleToast.show(toastMessage.toString());
}