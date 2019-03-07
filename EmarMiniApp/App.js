/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {NativeModules} from 'react-native';


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            text: 'Bye Bye World'
        }
    }


    buttonClick = async () => {
        console.log("Navtive Module : ", NativeModules);
        let newString =  await NativeModules.GetData.getThing("hello...");
        console.log("Text change : ", newString);
        this.setState({text: newString})
    };

    render() {
        return (
            <View style={styles.container}>
              <TouchableOpacity>
                <View>
                  <Text onPress={() => { this.buttonClick()}}>Change Text.</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.welcome}>{this.state.text}</Text>
              <Text style={styles.welcome}>Welcome to React Native!</Text>
              <Text style={styles.instructions}>To get started, edit App.js</Text>
              <Text style={styles.instructions}>{instructions}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
