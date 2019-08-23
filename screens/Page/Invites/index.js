import React from 'react'
import { Alert, View, TouchableOpacity, Text } from 'react-native'

export default function Invites({ navigation }) {
    return (
        <View>
            <TouchableOpacity onPress={ () => Alert.alert('Yeet') }>
                <Text>Invited</Text>
            </TouchableOpacity>
        </View>
        
    )
}
