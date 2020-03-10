import React, { Component } from 'react';
import { Text, View, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import Constants from 'expo-constants';



export default class LoginScreen extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor() {
        super()
        this.state = {
            account: [
                { id: 1, username: "user", password: "123456", role: "user" },
                { id: 2, username: "admin", password: "123456", role: "admin" }
            ]
        }
    }
    login() {
        var { navigate } = this.props.navigation;
        var detail = this.state.account.filter(val => val.username === this.username)[0];
        if (detail.password === this.password) {
            navigate("Home", { role: detail.role })
        }
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View style={styles.container}>
                    <Text style={styles.titled}>LUNCH APP</Text>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            keyboardType='email-address'
                            placeholder='Enter your username'
                            onChangeText={(username) => (this.username = username)}

                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Enter your password'
                            secureTextEntry={true}
                            onChangeText={(password) => (this.password = password)}
                        />
                    </View>
                    <Button
                        title='LOGIN'
                        style={styles.button}
                        onPress={
                            () => this.login()
                        }
                    />
                </View>
            </TouchableWithoutFeedback>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#1a8cff',
        padding: 8,
        justifyContent: 'center'
    },
    textInputContainer: {
        paddingHorizontal: 20,
        borderRadius: 6,
        marginTop: 20
    },
    titled: {
        fontSize: 30,
        color: '#ffffff',
        textAlign: 'center'
    },
    textInput: {
        padding: 10,
        backgroundColor: '#ffffff'
    },
    button: {
        width: 300,
        alignSelf: 'center',
        marginTop: 20
    }
});
