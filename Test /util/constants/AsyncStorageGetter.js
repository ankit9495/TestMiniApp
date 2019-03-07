import React from 'react';
import {getKeyValue} from "../AsyncStorageUtil";
import {ASYNC_STORAGE_CONSTANTS} from "./AsyncStorageConstants";

const AsyncStorageGetter = {

    getPortNumber: async function () {
        return getKeyValue(ASYNC_STORAGE_CONSTANTS.SETTINGS_PORT);
    },

    getServer: async function () {
        return getKeyValue(ASYNC_STORAGE_CONSTANTS.SETTINGS_SERVER);
    },

    getWakId: async function () {
        return getKeyValue(ASYNC_STORAGE_CONSTANTS.WAK_SESSION_ID);
    },

    getCompany: async function () {
        return getKeyValue(ASYNC_STORAGE_CONSTANTS.COMPANY);
    },

    getServerTimezoneOffset: async function () {
        return getKeyValue(ASYNC_STORAGE_CONSTANTS.SERVER_OFFSET);
    },


    getSelectedServerOption: async function () {
        return getKeyValue(ASYNC_STORAGE_CONSTANTS.SELECTED_SERVER_OPTION);
    },

    getSiteCode: async function () {
        return getKeyValue(ASYNC_STORAGE_CONSTANTS.SETTINGS_SITE_CODE);
    },

    getMobileScheduleId: async function(){
        return getKeyValue(ASYNC_STORAGE_CONSTANTS.Mobile_Schedule_ID);
    },

    getAppDomain: async function () {
        return getKeyValue(ASYNC_STORAGE_CONSTANTS.APP_DOMAIN);
    },


};

export default AsyncStorageGetter;