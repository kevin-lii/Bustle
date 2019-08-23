import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

export default function Login({ navigation }) {
    return (
        <View>
            <TouchableOpacity onPress={ () => navigation.navigate('Main') }>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}
