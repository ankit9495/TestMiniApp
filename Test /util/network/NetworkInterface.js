import React from 'react';
import {Alert, AsyncStorage} from 'react-native';
import ApolloClient from 'apollo-boost';
import {APOLLO_NETWORK_INTERFACE} from './URL';
import { NavigationActions } from 'react-navigation';
import AuthAction from './AuthAction';
import { deleteEntireDatabase } from '../../database/util/DbUtil';
import  AsyncStorageGetter  from '../constants/AsyncStorageGetter'
import constants from '../constants/index';

export function performLogout(navigationProp){
    if(navigationProp){
        Alert.alert(
            'Session Expired.',
            'You will now be logged out. Please login again to use the app.',
            [
                {
                    text: 'Logout', onPress: () => {
                        deleteEntireDatabase((dbResponse)=> {
                            if(dbResponse.success===true){
                                AsyncStorage.setItem('wSessionID', '', () => {
                                    if (window.serverTimezoneOffset) {
                                        AsyncStorage.setItem('serverTimezoneOffset', '_setDefault', () => {
                                        });
                                        // move to Login Screen, resetting the entire back-stack
                                        window.serverTimezoneOffset = 0;
                                    }

                                    window.company = null;
                                    window.appDomain = null;
                                    window.isLocalSetUp = null;

                                    if (window.window.apolloClient) {
                                        window.window.apolloClient.resetStore();
                                    }
                                    const resetAction = NavigationActions.reset({
                                        index: 0,
                                        actions: [
                                            NavigationActions.navigate({key: 'Login', routeName: 'Login'})
                                        ],
                                        key: null
                                    });
                                    navigationProp.dispatch(resetAction);
                                });
                            }
                        })
                }
                },
            ],
            {cancelable: false}
        );
    }
}

export async function getApolloClient(serverIp1, navigationProp) {
    let methodName = "getApolloClient";
    let setupOption = await AsyncStorageGetter.getSelectedServerOption();
    let routeName = navigationProp.state.routeName;
    let serverIp = await AsyncStorageGetter.getServer();
    //let serverIp = constants.defaultServerIP;
    let graphQLUrl = "https://" + serverIp + ":3010/graphql";
    this.uname = await AuthAction.getUserName();
    this.ssid = await AuthAction.getWakSessionID() + '_' + await AuthAction.getUISessionID();

    let argumentObject = {
        graphQLUrl: graphQLUrl,
        isLocalSetup: window.isLocalSetUp,
        serverIp: serverIp,
        SSID: this.ssid,
        company: window.company
    };

    const apolloClient = new ApolloClient({

        uri: 'http://' + serverIp + ':' + APOLLO_NETWORK_INTERFACE.GRAPHQL_PORT,
        request: async (operation) => {
            operation.setContext({
                headers: {
                    ssid: this.ssid,
                    uname: this.uname
                }
            });
        },

        onError: (({graphQLErrors, networkError}) => {
            if (networkError) {
                console.log("@NetworkInterface Error", JSON.stringify(networkError),networkError);
            }
        }),
    });
    return apolloClient;
}