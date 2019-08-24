import React, { useState } from 'react'
import { Alert, View, TouchableOpacity, Text, TextInput } from 'react-native'
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('a@ol.com');
    const [password, setPassword] = useState('tester');
    const [error, setError] = useState('')

    async function emailLogin() {
        try {
            await auth().signInWithEmailAndPassword(email, password);
        } catch (e) {
            handleError(e)
        }
    }

    async function facebookLogin() {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
        if (result.isCancelled) {
            setError('Login cancelled')
        }

        if (error) {
            handleError(e)
        } else if (result.isCancelled) {
            setError('Cancelled')
        } else {
            const token = await AccessToken.getCurrentAccessToken()
            const credential = auth.FacebookAuthProvider.credential(token.accessToken)
            auth().signInWithCredential(credential)
            Alert.alert('ok')
        }
    }

    function handleError(e) {
        setError(e.message)
    }

    return (
        <View style={ {flex: 1, justifyContent: 'center', alignContent: 'center'} }>
            <TextInput placeholder='Email' onChangeText={ text => setEmail(text) }></TextInput>
            <TextInput placeholder='Password' onChangeText={ text => setPassword(text) }></TextInput>
            <Text>{error}</Text>
            <TouchableOpacity onPress={ emailLogin }>
                <Text>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={ facebookLogin }>
                <Text>Facebook Login</Text>
            </TouchableOpacity>

            {/* <LoginButton onLoginFinished={ facebookLogin } /> */}

            {/* <TouchableOpacity onPress={ register }>
                <Text>Login</Text>
            </TouchableOpacity> */}
        </View>
    )
}
